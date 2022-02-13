export const removeIndex = (array, index) => [
  ...array.slice(0, index),
  ...array.slice(index + 1, array.length)
]

export const findAndUpdate = (arr = [], item) => {
  let result = [...arr]

  const index = result.findIndex(({ id }) => item.id === id)

  result[index] = { ...result[index], ...item }

  return result
}

export const findAndDelete = (arr = [], id) => {
  let result = [...arr]

  const index = result.findIndex((item) => item.id === id)

  return [...result.slice(0, index), ...result.slice(index + 1, result.length)]
}
