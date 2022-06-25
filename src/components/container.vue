<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use '/settings/breakpoints.scss';

.container {
  --container-padding: 20px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  max-width: breakpoints.$large;
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);

  @media (min-width: breakpoints.$medium) {
    --container-padding: 54px;
  }

  @media (min-width: breakpoints.$large) {
    --container-padding: 80px;
  }
}
</style>