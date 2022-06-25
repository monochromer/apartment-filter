<template>
  <button class="scroll-to-top-button" :class="classes" type="button" @click="onClick">
    <svg class="scroll-to-top-button__icon" width="10" height="16" fill="none" viewBox="0 0 10 16">
      <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 14V2m0 0 4 4M5 2 1 6"/>
    </svg>
    <VisuallyHidden class="scroll-to-top-button__text">Прокрутить наверх</VisuallyHidden>
  </button>
</template>

<script>
import throttle from 'lodash-es/throttle'
import VisuallyHidden from '/components/visually-hidden.vue'

const SCROLL_THRESHOLD = 100
const THROTTLE_TIMEOUT = 200

export default {
  components: {
    VisuallyHidden
  },

  data() {
    return {
      isOnTop: true
    }
  },

  computed: {
    classes() {
      return {
        'scroll-to-top-button_is-hidden': this.isOnTop
      }
    }
  },

  mounted() {
    this.throttledScrollHandler = throttle(this.onScroll, THROTTLE_TIMEOUT)
    window.addEventListener('scroll', this.throttledScrollHandler)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.throttledScrollHandler)
  },

  methods: {
    onClick() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },

    onScroll() {
      this.isOnTop = window.scrollY <= SCROLL_THRESHOLD
    }
  }
}
</script>

<style lang="scss">
@use '/settings/colors.scss';

.scroll-to-top-button {
  position: fixed;
  right: 32px;
  bottom: 32px;
  margin: 0;
  appearance: none;
  padding: 0;
  border: 0;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: colors.$canvas;
  background-color: colors.$accent-2;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;

  &__icon {
    display: inline-block;
    vertical-align: middle;
  }

  &:hover {
    background-color: colors.$accent;
  }

  &_is-hidden {
    opacity: 0;
    visibility: hidden;
  }
}
</style>