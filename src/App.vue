<template>
  <flat-view></flat-view>
  <scroll-to-top-button />
</template>

<script>
import ScrollToTopButton from '/components/scroll-to-top-button.vue'
import FlatView from '/views/flat-view.vue'

export default {
  components: {
    FlatView,
    ScrollToTopButton
  }
}
</script>

<style lang="scss">
@use '/settings/colors.scss';
@use '/settings/fonts.scss';
@use '/settings/type.scss';
@import '/assets/fonts/pr-root-ui/styles.css';

:root {
  font-size: type.$font-m;
  line-height: type.$line-height-m;
  font-family:fonts.$main;
  color: colors.$main;
  scroll-behavior: smooth;
  text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  overflow-y: scroll;
}
</style>
