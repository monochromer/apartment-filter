<template>
  <span class="visually-hidden">
    <slot></slot>
  </span>
</template>

<style>
.visually-hidden {
  position: fixed;
  transform: scale(0);
}
</style>