<template>
  <form class="form-filter">
    <slot></slot>
  </form>
</template>

<style lang="scss">
@use 'sass:map';
@use '/settings/colors.scss';
@use '/settings/breakpoints.scss';

.form-filter {
  --filter-padding: 20px;
  padding:var(--filter-padding);
  display: grid;
  gap: 24px;
  background-image:
    linear-gradient(
      135deg,
      map.get(colors.$accent-gradient, 'start') 0%,
      map.get(colors.$accent-gradient, 'end') 100%
    );
  border-radius: 10px;

  @media (min-width: breakpoints.$large) {
    --filter-padding: 40px;
  }
}
</style>