export function formatNumber(number) {
  const data = String(number)
  const length = data.length
  let index = length - 1
  let result = ''

  while (index >= 0) {
    const reverseIndex = length - index
    if (reverseIndex % 3 === 0) {
      result =  ' ' + data[index] + result
    } else {
      result = data[index] + result
    }
    index--
  }

  return result.trim()
}