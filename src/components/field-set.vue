<template>
<fieldset class="field-set">
  <legend class="field-set__legend" v-if="hasSlot('legend')">
    <slot name="legend"></slot>
  </legend>

  <div class="field-set__body" v-if="hasSlot()">
    <slot></slot>
  </div>
</fieldset>
</template>

<script>
export default {
  methods: {
    hasSlot(name = 'default') {
      return !!this?.$slots?.[name] || !!this?.$scopedSlots?.[name];
    }
  }
}
</script>

<style lang="scss">
@use '/settings/type.scss';
@use '/settings/breakpoints.scss';

.field-set {
  margin: 0;
  padding: 0;
  border: none;
  font-size: type.$font-s;
  line-height: type.$line-height-s;

  @media (min-width: breakpoints.$large) {
    font-size: type.$font-m;
    line-height: type.$line-height-m;
  }

  &__legend {
    margin-bottom: 8px;
    padding: 0;
  }

  &__body  {
    font-size: type.$font-m;
    line-height: type.$line-height-m;

    @media (min-width: breakpoints.$large) {
      font-size: type.$font-xl;
      line-height: type.$line-height-xl;
    }
  }
}
</style>