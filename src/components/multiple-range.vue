<template>
  <div class="mutliple-range" :style="styles">
    <div class="mutliple-range__head">
      <div class="mutliple-range__part">
        <label class="mutliple-range__label" :for="fromId">от</label>
        <span class="mutliple-range__value">
          {{ formattedFromValue }}
        </span>
      </div>
      <div class="mutliple-range__part">
        <label class="mutliple-range__label" :for="toId">до</label>
        <span class="mutliple-range__value">
          {{ formattedToValue }}
        </span>
      </div>
    </div>
    <div class="mutliple-range__body">
      <input class="mutliple-range__input" type="range" :name="fromName" :min="min" :max="max" :value="value[0]" :id="fromId" @input="onFromChange">
      <input class="mutliple-range__input" type="range" :name="toName" :min="min" :max="max" :value="value[1]" :id="toId" @input="onToChange">
    </div>
  </div>
</template>

<script>
import { generateId } from '/libs/generate-id.js'
import { formatNumber } from '/libs/format-number.js'
import { clamp } from '/libs/clamp.js'

export default {
  props: {
    fromId: {
      type: String,
      default: generateId()
    },
    toId: {
      type: String,
      default: generateId()
    },
    fromName: String,
    toName: String,
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    value: {
      type: Array,
      required: true,
      validator(value) {
        return value.length === 2 && value[0] <= value[1]
      }
    }
  },

  emits: ['rangeChange'],

  computed: {
    styles() {
      const diff = this.max - this.min
      const [from, to] = this.value
      return {
        '--from-value': (from - this.min) / diff,
        '--to-value': (to - this.min) / diff,
      }
    },

    formattedFromValue() {
      return formatNumber(this.value[0])
    },

    formattedToValue() {
      return formatNumber(this.value[1])
    }
  },

  methods: {
    onFromChange(event) {
      const { valueAsNumber } = event.target
      const { min, max, value } = this
      const toValue = value[1]
      const from = clamp(min, valueAsNumber, max)
      const to = from >= toValue ? from : toValue
      this.$emit('rangeChange', [from, to])
    },

    onToChange(event) {
      const { valueAsNumber } = event.target
      const { min, max, value } = this
      const fromValue = value[0]
      const to = clamp(min, valueAsNumber, max)
      const from = to <= fromValue ? to : fromValue
      this.$emit('rangeChange', [from, to])
    }
  }
}
</script>

<style lang="scss">
@mixin range-track() {
  &::-webkit-slider-runnable-track {
   @content;
 }

 &::-moz-range-track {
   @content;
 }

 &::-ms-track {
    border: none;
    color: transparent;
    background-color: transparent;
    @content;
 }
}

@mixin range-fill() {
  &::-ms-fill-lower {
    @content;
  }

  &::-moz-range-progress {
    @content;
  }
}

@mixin range-thumb() {
  &::-webkit-slider-thumb {
    @content;
  }

  &::-moz-range-thumb {
    @content;
  }

  &::-ms-thumb {
    @content;
  }
}

.mutliple-range {
  &__head {
    margin-bottom: 6px;
    display: flex;
    align-items: baseline;
  }

  &__part {
    flex: 1 1 50%;
    min-width: 0;
  }

  &__label {
    margin-right: 8px;
    opacity: 0.5;
  }

  &__value {
    font-weight: 500;
  }

  &__body {
    position: relative;
    height: 14px;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      height: 3px;
      border-radius: 3px;
    }

    &::before {
      left: 0;
      right: 0;
      background-color: hsl(224deg 68% 13% / 0.1);
    }

    &::after {
      left: calc(var(--from-value) * 100%);
      right: calc((1 - var(--to-value)) * 100%);
      background-color: hsl(151deg 49% 48%);
    }
  }

  &__input {
    $inputRef: &;

    appearance: none;
    pointer-events: none;
    margin: 0;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    background-color: transparent;

    @include range-track() {
      appearance: none;
      border: none;
      color: transparent;
      background-color: transparent;
    };

    @include range-fill() {
      appearance: none;
      background-color: transparent;
    }

    @include range-thumb() {
      appearance: none;
      pointer-events: auto;
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      padding: 0;
      border: none;
      border-radius: 50%;
      background-color: hsl(151deg 49% 48%);
      cursor: pointer;
    }

    &:focus {
      outline: 0;

      @include range-thumb() {
        box-shadow:
          0 0 0 2px hsl(0deg 0% 100%),
          0 0 0 4px hsl(151deg 49% 48%);
      }
    }
  }
}
</style>