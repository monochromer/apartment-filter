<template>
  <button class="sort-button" :class="buttonClass" type="button">
    <span class="sort-button__content">
      <slot></slot>
    </span>
    <div class="sort-button__arrows">
      <svg class="sort-button__icon sort-button__icon_type_ascending" width="7" height="4" viewBox="0 0 7 4">
        <path d="M4.03.25a.85.85 0 0 0-1.2 0L.16 3.01a.58.58 0 0 0 0 .82c.22.23.58.23.8 0l2.46-2.55 2.45 2.55c.23.23.59.23.81 0a.58.58 0 0 0 0-.82L4.03.25Z"/>
      </svg>
      <svg class="sort-button__icon sort-button__icon_type_descending" width="7" height="4" viewBox="0 0 7 4">
        <path d="M4.03.25a.85.85 0 0 0-1.2 0L.16 3.01a.58.58 0 0 0 0 .82c.22.23.58.23.8 0l2.46-2.55 2.45 2.55c.23.23.59.23.81 0a.58.58 0 0 0 0-.82L4.03.25Z"/>
      </svg>
    </div>
  </button>
</template>

<script>
export default {
 props: {
  isActive: {
    type: Boolean,
    default: false
  },
  sort: String
 },

 computed: {
  buttonClass() {
    return {
      'sort-button_is-active': this.isActive,
      [`sort-button_sort_${this.sort}`]: this.isActive && this.sort
    }
  }
 }
}
</script>

<style lang="scss">
.sort-button {
  $self: &;

  margin: 0;
  appearance: none;
  display: inline-flex;
  align-items: center;
  padding: 0;
  border: 0;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;

  &__content {}

  &__icon {
    opacity: 0.4;
    display: block;
    fill: currentColor;

    & + & {
      margin-top: 2px;
    }

    &_type {
      &_ascending {}

      &_descending {
        transform: scaleY(-1);
      }
    }

    &_is-active {
      opacity: 1;
      color:  hsl(151deg 49% 48%);
    }
  }

  &__arrows {
    margin-left: 8px;
  }

  &:hover,
  &_is-active {
    #{$self}__content {
      color: hsl(151deg 49% 48%);
    }
  }

  &_is-active {
    #{$self}__content {
      font-weight: 500;
    }
  }

  &_sort_ascending &__icon_type_ascending,
  &_sort_descending &__icon_type_descending {
    opacity: 1;
    color: hsl(151deg 49% 48%);
  }
}
</style>