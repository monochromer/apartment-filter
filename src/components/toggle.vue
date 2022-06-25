<template>
  <label class="toggle">
    <input class="toggle__input" :type="type" :name="name" :value="value" :checked="checked" :disabled="disabled">
    <span class="toggle__label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  props: ['type', 'name', 'value', 'disabled', 'checked']
}
</script>

<style lang="scss">
@use '/settings/colors.scss';
@use '/settings/type.scss';

.toggle {
  $self: &;
  position: relative;
  display: inline-block;
  font-size: type.$font-xl;
  line-height: type.$line-height-xl;

  &__label {
    position: relative;
    z-index: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 10px 12px;
    min-width: 44px;
    min-height: 44px;
    text-align: center;
    border-radius: 2em;
    background-color: colors.$canvas;
    transition: 0.2s;
  }

  &__input {
    opacity: 0;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  &__input:not(:disabled):hover + &__label {
    box-shadow: 0px 6px 20px hsl(0deg 0% 0% / 0.12);
  }

  &__input:checked + &__label {
    color: colors.$canvas;
    background-color: colors.$accent;
    box-shadow: 0px 6px 20px colors.$accent-2;
  }

  &__input:focus + &__label {
    box-shadow:
      0 0 0 2px colors.$canvas,
      0 0 0 4px colors.$accent;
  }

  &__input:disabled + &__label {
    &::after {
      content: '';
      opacity: 0.8;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: inherit;
    }
  }
}
</style>