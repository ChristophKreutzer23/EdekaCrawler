const units = ['l', 'ml', 'g', 'kg', 'wl']
const regex = new RegExp(
  `(\\d+[ -]x[ -])?(\\d*,?\\d+)[ -](${units.join('|')})`,
  'gi'
)

/**
 * Returns the factor as number
 * @param {String} factor
 * @returns {Number}
 */
function cleanFactor(factor) {
  let fact = ''
  for (const char of factor) {
    if (char >= '0' && char <= 9) {
      fact += char
    } else if (char == ',') {
      fact += '.'
    }
  }
  return parseFloat(fact)
}

/**
 * Extracts quantity from description (basePrice removed)
 * @param {String} description
 */
function getQuantityFromDescription(description) {
  const matches = description.matchAll(regex)
  const res = []
  for (const match of matches) {
    const factor = match[1] ? cleanFactor(match[1]) : undefined
    const amount = parseFloat(match[2].replace(',', '.'))
    const totalAmount = factor ? amount * factor : amount
    const unit = match[3].toLowerCase()
    res.push({
      totalAmount: totalAmount ? totalAmount.toFixed(2) : totalAmount,
      amount: factor ? factor.toString() + ' x ' + amount : amount,
      unit,
    })
  }
  if (res.length == 0) {
    res.push({ totalAmount: 1, amount: 1, unit: 'piece' })
  }
  return res
}

module.exports = { getQuantityFromDescription }
