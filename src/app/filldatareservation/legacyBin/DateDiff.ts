export function DateDiff(firstDate: Date, lastDate: Date) {
  if (new Date(1901, 0, 1, 0, 0, 0, 0) >= firstDate || new Date(1901, 0, 1, 0, 0, 0, 0) >= lastDate)
    return 0
  if (firstDate && lastDate) {
    firstDate = new Date(
      firstDate.getUTCFullYear(),
      firstDate.getUTCMonth(),
      firstDate.getUTCDate(),
      0,
      0,
      0
    )
    lastDate = new Date(
      lastDate.getUTCFullYear(),
      lastDate.getUTCMonth(),
      lastDate.getUTCDate(),
      12,
      0,
      0
    )
    var dias = Math.floor((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24))
    return (dias = isNaN(dias) ? 0 : dias)
  } else {
    return null
  }
}
