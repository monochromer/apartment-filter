<template>
  <button class="form-filter-reset" type="reset">
    <span class="form-filter-reset__text" v-if="hasSlot('default')">
      <slot></slot>
    </span>
    <svg class="form-filter-reset__icon" width="8" height="8" fill="currentColor" viewBox="0 0 8 8">
      <path d="M4 5.22 1.38 7.84c-.26.26-.74.2-1.08-.14-.33-.34-.4-.82-.14-1.08L2.78 4 .16 1.38C-.1 1.12-.04.64.3.3c.34-.33.82-.4 1.08-.14L4 2.78 6.62.15c.26-.25.74-.18 1.08.15.33.34.4.82.15 1.08L5.22 4l2.62 2.62c.26.26.2.74-.14 1.08-.34.33-.82.4-1.08.15L4 5.22Z"/>
      <path d="M4 5.22 1.38 7.84c-.26.26-.74.2-1.08-.14-.33-.34-.4-.82-.14-1.08L2.78 4 .16 1.38C-.1 1.12-.04.64.3.3c.34-.33.82-.4 1.08-.14L4 2.78 6.62.15c.26-.25.74-.18 1.08.15.33.34.4.82.15 1.08L5.22 4l2.62 2.62c.26.26.2.74-.14 1.08-.34.33-.82.4-1.08.15L4 5.22Z"/>
    </svg>
  </button>
</template>

<script>
export default {
  methods: {
    hasSlot(name) {
      return !!this.$slots[name]
    }
  }
}
</script>

<style lang="scss">
@use '/settings/colors.scss';
@use '/settings/type.scss';
@use '/settings/breakpoints.scss';

.form-filter-reset {
  appearance: none;
  margin: 0;
  position: relative;
  z-index: 0;
  display: flex;
  align-items: center;
  padding: 6px 16px;
  border: 0;
  font-family: inherit;
  font-size: type.$font-s;
  line-height: type.$line-height-s;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  transition: 0.2s;

  @media (min-width: breakpoints.$large) {
    font-size: type.$font-m;
    line-height: type.$line-height-m;
  }

  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    opacity: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: currentColor;
    border-radius: 4px;
    transition: 0.2s;
  }

  &__text + &__icon {
    margin-left: 8px;
  }

  &:hover {
    &::before {
      opacity: 0.1;
    }
  }
}
</style>