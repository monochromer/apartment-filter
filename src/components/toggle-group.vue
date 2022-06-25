<script>
import { h } from 'vue'

export default {
  render() {
    return h('div', { class: 'toggle-group' },
      h('div', { class: 'toggle-group__inner'},
        this.$slots.default().map((child) => {
          child.props.class = 'toggle-group__item'
          return child
        })
      )
    )
  }
}
</script>


<style lang="scss">
.toggle-group {
  --gap: 16px;
  display: inline-block;

  &__inner {
    margin: 0 calc(var(--gap) / -2) calc(-1 * var(--gap));
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &__item {
    flex: 0 0 auto;
    margin: 0 calc(var(--gap) / 2) var(--gap);
  }
}
</style>