import { isNil } from 'lodash-es'
import config from '../config.js'

const url = config.baseURL + 'flats.json'

function createFilterHandlers(filterSettings) {
  const filterHandlers = []

  if (!isNil(filterSettings.rooms)) {
    filterHandlers.push((flat) => flat.rooms === filterSettings.rooms)
  }

  if (!isNil(filterSettings['price[min]'])) {
    filterHandlers.push((flat) => flat.price >= filterSettings['price[min]'])
  }

  if (!isNil(filterSettings['price[max]'])) {
    filterHandlers.push((flat) => flat.price <= filterSettings['price[max]'])
  }

  if (!isNil(filterSettings['area[min]'])) {
    filterHandlers.push((flat) => flat.area >= filterSettings['area[min]'])
  }

  if (!isNil(filterSettings['area[max]'])) {
    filterHandlers.push((flat) => flat.area <= filterSettings['area[max]'])
  }

  return filterHandlers
}

async function getFlats(filterSettings, signal) {
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw response
  }

  const data = await response.json()

  const filters = createFilterHandlers(filterSettings)
  const filteredData = data.filter((dataItem) =>
    filters.every((handler) => handler(dataItem))
  )

  return filteredData
}

function wrappedGetFlats() {
  let controller = null

  return function(filterSettings) {
    if (controller) {
      controller.abort()
    }

    controller = new AbortController()

    return getFlats(filterSettings, controller.signal)
      .finally(() => {
        controller = null
      })
  }
}

const getFlatsData = wrappedGetFlats()

export {
  getFlatsData
}