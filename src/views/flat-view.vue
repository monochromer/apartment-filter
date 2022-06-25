<template>
  <container>
    <div class="flat-view" :class="rootClasses">
      <main class="flat-view__main">
        <header class="flat-view__header">
          <h1 class="flat-view__title">
            Квартиры
          </h1>
        </header>

        <div class="flat-view__data">
          <flat-grid
            v-if="pagedFlats && pagedFlats.length > 0"
            :items="pagedFlats"
            @sort="onSort"
            :sortParam="sort.name"
            :sortType="sort.type"
          >
            <template v-slot:filter>
              <button class="flat-view__filter-button" @click="toggleFilter" type="button">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                Фильтр
              </button>
            </template>
          </flat-grid>

          <div v-else>
            Задайте параметры в фильтре для поиска нужной квартиры
          </div>
        </div>

        <footer class="flat-view__footer" v-if="isMoreButtonShown">
          <action-button @click="increasePage">
            Загрузить еще
          </action-button>
        </footer>
      </main>
      <aside class="flat-view__filter">
        <form-filter @reset.prevent="resetFilter">
          <field-set>
            <toggle-group>
              <toggle type="radio" name="rooms" value="1" :checked="filter.rooms == 1" @change="onFilterRoomsChanged">
                1к
              </toggle>
              <toggle type="radio" name="rooms" value="2" :checked="filter.rooms == 2" @change="onFilterRoomsChanged">
                2к
              </toggle>
              <toggle type="radio" name="rooms" value="3" :checked="filter.rooms == 3" @change="onFilterRoomsChanged">
                3к
              </toggle>
              <toggle type="radio" name="rooms" value="4" :checked="filter.rooms == 4" @change="onFilterRoomsChanged">
                4к
              </toggle>
            </toggle-group>
          </field-set>

          <field-set>
            <template v-slot:legend>
              Стомость квартиры, ₽
            </template>
            <multiple-range
              fromName="price[min]"
              toName="price[max]"
              :min="2000000"
              :max="10000000"
              :value="[filter['price[min]'], filter['price[max]']]"
              @rangeChange="onPriceChange"
            />
          </field-set>

          <field-set>
            <template v-slot:legend>
              Площадь, м²
            </template>
             <multiple-range
              fromName="area[min]"
              toName="area[max]"
              :min="20"
              :max="200"
              :value="[filter['area[min]'], filter['area[max]']]"
              @rangeChange="onAreaChange"
            />
          </field-set>

          <form-filter-reset>
            Сбросить параметры
          </form-filter-reset>
        </form-filter>
      </aside>
    </div>
  </container>
</template>

<script>
import { debounce, isNil } from 'lodash-es'
import { toRaw } from 'vue'

import { getFlatsData } from '/api/flats.js'

import Container from '/components/container.vue'
import Toggle from '/components/toggle.vue'
import ToggleGroup from '/components/toggle-group.vue'
import FormFilter from '/components/form-filter/form-filter.vue'
import FormFilterReset from '/components/form-filter/form-filter-reset.vue'
import FieldSet from '/components/field-set.vue'
import MultipleRange from '/components/multiple-range.vue'
import FlatGrid from '/components/flat-grid/flat-grid.vue'
import ActionButton from '/components/action-button.vue'

const SORT_TYPES = {
  ASC: 'ascending',
  DESC: 'descending'
}

const DEBOUNCE_TIMEOUT = 100

const PAGE_SIZE = 10

export default {
  components: {
    Container,
    Toggle,
    ToggleGroup,
    FormFilter,
    FormFilterReset,
    FieldSet,
    MultipleRange,
    FlatGrid,
    ActionButton
  },

  created() {
    this.debouncedFilterChange = debounce(this.onFilterChange, DEBOUNCE_TIMEOUT)
    this.debouncedGetFlats = debounce(this.getFlats, DEBOUNCE_TIMEOUT)
  },

  mounted() {
    this.initializeDataFromURL()
    this.debouncedGetFlats()
  },

  data() {
    return {
      filter: this.getDefaultFilter(),

      sort: {
        name: null,
        type: null
      },

      isFilterHidden: true,

      flats: [],

      page: 0,
    }
  },

  computed: {
    rootClasses() {
      return {
        'flat-view_is-filter-hidden': this.isFilterHidden
      }
    },

    sortedFlats() {
      const { sort, flats } = this

      if (isNil(sort.name) || isNil(sort.type)) {
        return flats
      }

      const items = flats.slice()
      const sign = sort.type === SORT_TYPES.ASC ? 1 : -1
      const createSortFunction = (paramName) => (a, b) => sign * (a[paramName] - b[paramName])
      items.sort(createSortFunction(sort.name))

      return items
    },

    pagedFlats() {
      return this.sortedFlats.slice(0, (this.page + 1) * PAGE_SIZE)
    },

    isMoreButtonShown() {
      return this.pagedFlats.length < this.flats.length
    }
  },

  methods: {
    getDefaultFilter() {
      return {
        rooms: null,
        'price[min]': 2000000,
        'price[max]': 10000000,
        'area[min]': 20,
        'area[max]': 200,
      }
    },

    resetFilter() {
      this.filter = this.getDefaultFilter()
    },

    onFilterRoomsChanged(event) {
      this.filter.rooms = parseInt(event.target.value)
    },

    onPriceChange(event) {
      const [from, to] = event
      this.filter['price[min]'] = from
      this.filter['price[max]'] = to
    },

    onAreaChange(event) {
      const [from, to] = event
      this.filter['area[min]'] = from
      this.filter['area[max]'] = to
    },

    onSort(paramName) {
      if (paramName === this.sort.name) {
        this.sort.type = this.sort.type === SORT_TYPES.DESC
          ? SORT_TYPES.ASC
          : SORT_TYPES.DESC
      } else {
        this.sort.name = paramName
        this.sort.type = SORT_TYPES.ASC
      }
    },

    toggleFilter() {
      this.isFilterHidden = !this.isFilterHidden
    },

    onFilterChange() {
      const { filter, sort } = this

      const filterEntries = Object.entries(filter)
        .filter(([key, value]) => !isNil(value))

      if (!isNil(sort.name) && !isNil(sort.type)) {
        filterEntries.push(['sort[name]', sort.name])
        filterEntries.push(['sort[type]', sort.type])
      }

      const searchParams = new URLSearchParams(filterEntries)
      history.replaceState(null, null, '/?' + searchParams)
    },

    initializeDataFromURL() {
      const url = new URL(location)
      for (const [key, value] of url.searchParams) {
        switch (key) {
          case ('sort[name]'):
          case ('sort[type]'): {
            this.sort[key] = value;
            break
          }
          default: {
            this.filter[key] = parseFloat(value)
          }
        }
      }
    },

    increasePage() {
      this.page++
    },

    getFlats() {
      getFlatsData(toRaw(this.filter))
        .then((data) => {
          this.flats = data
        })
        .catch((error) => {
          if (error.name === 'AbortError') {
            console.log('aborted request: ', error)
          } else {
            console.log('error: ', error)
          }
        })
    }
  },

  watch: {
    filter: {
      deep: true,
      handler() {
        this.debouncedFilterChange()
        this.debouncedGetFlats()
      }
    },

    sort: {
      deep: true,
      handler() {
        this.onFilterChange()
      }
    }
  }
}
</script>

<style lang="scss">
@use '/settings/breakpoints.scss';
@use '/settings/colors.scss';
@use '/settings/type.scss';

.flat-view {
  $self: &;

  --padding-y: 48px;
  display: flex;
  align-items: flex-start;
  padding-top: var(--padding-y);
  padding-bottom: var(--padding-y);

  @media (min-width: breakpoints.$large) {
    --padding-y: 96px;
  }

  &__main {
    flex: 1 1 0%;

    @media (min-width: breakpoints.$medium) {
      margin-right: 28px;
    }

    @media (min-width: breakpoints.$large) {
      margin-right: 80px;
    }
  }

  &__header {
    margin-bottom: 24px;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    align-items: end;
    justify-content: space-between;

    @media (min-width: breakpoints.$large) {
      margin-bottom: 32px;
    }
  }

  &__title {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 54px;
    line-height: 55px;
  }

  &__filter-button {
    margin: 0;
    margin-left: auto;
    appearance: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border: none;
    font-family: inherit;
    font-size: type.$font-s;
    line-height: type.$line-height-s;
    color: inherit;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      color: colors.$accent;
    }

    @media (min-width: breakpoints.$medium) {
      display: none;
    }
  }

  &__data {
    margin-bottom: 24px;

    @media (min-width: breakpoints.$large) {
      margin-bottom: 48px;
    }
  }

  &__footer {}

  &__filter {
    position: sticky;
    top: 16px;
    flex: 0 0 318px;

    @media not all and (min-width: breakpoints.$medium) {
      position: fixed;
      z-index: 2;
      top: auto;
      bottom: 8px;
      left: 16px;
      right: 16px;
      background-color: colors.$canvas;
      transition: 0.4s cubic-bezier(0.47, 0.45, 0.1, 0.9);

      #{$self}_is-filter-hidden & {
        transform: translateY(100%);
        opacity: 0;
        visibility: hidden;
      }
    }

    @media (min-width: breakpoints.$large) {
      flex-basis: 400px;
    }
  }
}
</style>
