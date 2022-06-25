<template>
  <table class="flat-grid">
    <thead class="flat-grid__head">
      <tr class="flat-grid__row flat-grid__row_head">
        <th class="flat-grid__cell flat-grid__cell_head flat-grid__cell_type_image">
          Планировка
        </th>
        <th class="flat-grid__cell flat-grid__cell_head flat-grid__cell_type_title">
          Квартира
        </th>
        <th class="flat-grid__cell flat-grid__cell_head">
          <sort-button :isActive="sortParam === 'area'" :sort="sortType" @click="this.$emit('sort', 'area')">
            S, м²
          </sort-button>
        </th>
        <th class="flat-grid__cell flat-grid__cell_head">
          <sort-button :isActive="sortParam === 'floor'" :sort="sortType" @click="this.$emit('sort', 'floor')">
            Этаж
          </sort-button>
        </th>
        <th class="flat-grid__cell flat-grid__cell_head">
          <sort-button :isActive="sortParam === 'price'" :sort="sortType" @click="this.$emit('sort', 'price')">
            Цена, ₽
          </sort-button>
        </th>

        <slot name="filter"></slot>
      </tr>
    </thead>
    <tbody class="flat-grid__body">
      <tr class="flat-grid__row" v-for="dataItem in items" :key="dataItem.id">
        <td class="flat-grid__cell flat-grid__cell_type_image">
          <img class="flat-grid__image" :src="dataItem.image" width="80" height="80" :alt="`План квартиры ${dataItem.title}`">
        </td>
        <td class="flat-grid__cell flat-grid__cell_type_title">
          <b class="flat-grid__title">
            {{ dataItem.title }}
          </b>
        </td>
        <td class="flat-grid__cell">
          {{ dataItem.area }} <span class="flat-grid__body-unit">м²</span>
        </td>
        <td class="flat-grid__cell">
          {{ dataItem.floor }} <span class="flat-grid__meta">из {{ dataItem.maxFloors }} <span class="flat-grid__body-unit">этаж</span></span>
        </td>
        <td class="flat-grid__cell">
          {{ formatNumber(dataItem.price) }} <span class="flat-grid__body-unit">₽</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { formatNumber} from '/libs/format-number.js'
import SortButton from '/components/sort-button.vue'

export default {
  props: {
    items: {
      type: Array
    },

    sortParam: String,

    sortType: String
  },

  emits: ['sort'],

  components: {
    SortButton
  },

  methods: {
    formatNumber
  }
}
</script>

<style lang="scss">
@use '/settings/type.scss';

.flat-grid {
  $self: &;

  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  &__cell {
    width: 120px;
    padding-top: 16px;
    padding-bottom: 24px;
    border-bottom: 1px solid hsl(0deg 0% 0% / 0.1);
    vertical-align: top;
    text-align: left;
    font-weight: normal;
    white-space: nowrap;

    &:not(:last-child) {
      padding-right: 20px;
    }

    &_type {
      &_image {
        width: 80px;
      }

      &_title {
        white-space: normal;
        width: auto;
      }
    }

    &_head {
      padding-bottom: 16px;
    }
  }

  &__row {}

  &__head {
    position: sticky;
    z-index: 1;
    top: 0;
    background-color: hsl(0deg 0% 100% / 0.92);
    backdrop-filter: blur(4px);
  }

  &__body {}

  &__meta {
    opacity: 0.5;
    font-weight: normal;
  }

  &__image {
    display: block;
    width: 80px;
    height: 80px;
    object-fit: contain;
  }

  &__title {
    font-weight: 500;
  }

  @media (min-width: 1440px) {
    &__body {
      font-size: type.$font-xl;
      line-height: type.$line-height-xl;
    }

    &__body-unit {
      display: none;
    }
  }

  @media not all and (min-width: 1440px) {
    & {
      display: block;
    }

    &__cell {
      padding-bottom: 8px;
      padding-top: 8px;
      display: inline-block;
      width: auto;
      border: none;
    }

    &__row {
      &_head {
        display: flex;
        align-items: center;
        border: 0;

        #{$self}__cell_type_image,
        #{$self}__cell_type_title {
          display: none;
        }
      }
    }

    &__head,
    &__body {
      display: block;
    }

    &__body {
      #{$self}__row {
        margin-top: 4px;
        overflow: hidden;
        display: block;
        padding: 8px 24px;
        border: 1px solid hsl(0deg 0% 0% / 0.1);
        border-radius: 8px;
      }

      #{$self}__cell {
        display: inline-block;
        font-weight: 500;

        &_type_image {
          float: right;
          padding-right: 0;
          padding-left: 20px;
        }

        &_type_title {
          display: block;
        }
      }
    }
  }
}
</style>