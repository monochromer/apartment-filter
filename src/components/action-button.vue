<template>
  <button class="action-button" type="button">
    <slot></slot>
  </button>
</template>

<style lang="scss">
@use '/settings/type.scss';
@use '/settings/colors.scss';
@use '/settings/breakpoints.scss';

.action-button {
  position: relative;
  z-index: 0;
  appearance: none;
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px;
  border: none;
  text-align: center;
  font-size: type.$font-l;
  line-height: type.$line-height-l;
  font-family: inherit;
  font-weight: 500;
  color: inherit;
  background-color: colors.$canvas;
  border-radius: 2em;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.2;
    border: 1px solid;
    border-radius: inherit;
    transition: 0.2s;
  }

  &:hover {
    &::before {
      background-color: colors.$accent;
      border-color: colors.$accent;
    }
  }

  @media (min-width: breakpoints.$large) {
    font-size: type.$font-xl;
    line-height: type.$line-height-xl;
  }
}
</style>