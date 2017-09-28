const divisions = {
  front: -1,
  body: 0,
  back: 1,
}

module.exports = (a, b) => {
  if (a.division === b.division) {
    return a.index - b.index
  }

  return divisions[a.division] - divisions[b.division]
}
