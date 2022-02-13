export const removeIndex = (array, index) => [
  ...array.slice(0, index),
  ...array.slice(index + 1, array.length)
]
