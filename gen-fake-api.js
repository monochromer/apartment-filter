const fs = require('node:fs')
const path = require('node:path')

const image = '/flat-plan.svg'
const minFloors = 3
const maxFloors = 17
const minRooms = 1
const maxRooms = 4
const minPrice = 2_000_000
const maxPrice = 10_000_000
const minArea = 20
const maxArea = 200

const roomsMap = {
  1: {
    area: [20, 40],
    price: [2_000_000, 3_000_000]
  },
  2: {
    area: [40, 80],
    price: [3_000_000, 5_000_000]
  },
  3: {
    area: [40, 120],
    price: [5_000_000, 8_000_000]
  },
  4: {
    area: [80, 200],
    price: [8_000_000, 10_000_000]
  }
}

function getTitle(id, rooms) {
  return `${rooms}-комнатная №${id}`
}

function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function random(min, max) {
  return Math.random() * (max - min) + min
}

const result = []

for (let id = 1; id <= 200; id++) {
  const flat = {}

  flat.id = id
  flat.floor = randomInt(minFloors, maxFloors)
  flat.rooms = randomInt(minRooms, maxRooms)
  flat.title = getTitle(id, flat.rooms)
  flat.image = image
  flat.maxFloors = maxFloors
  flat.area = parseFloat(random.apply(null, roomsMap[flat.rooms].area).toFixed(1))
  flat.price = parseFloat(random.apply(null, roomsMap[flat.rooms].price).toFixed(0))

  result.push(flat)
}

const filePath = path.join(process.cwd(), 'src', 'public', 'flats.json')

fs.writeFileSync(filePath, JSON.stringify(result, null, 2))