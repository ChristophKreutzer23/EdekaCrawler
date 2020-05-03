const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()

const fs = require('fs')

const units = ['l', 'ml', 'g', 'kg', 'wl']
const regex = new RegExp(
  `(\\d+[ -]x[ -])?(\\d*,?\\d+)[ -](${units.join('|')})`,
  'gmi'
)

/**
 * Extracts quantity from description (basePrice removed)
 * @param {String} description
 */
function getQuantityFromDescription(description) {
  description = entities.decode(description)
  const l = regex.exec(description)
  return l
}

const x = JSON.parse(fs.readFileSync('offers.json'))
for (let i in x) {
  market = x[i]
  for (const offer of market) {
    let res = getQuantityFromDescription(
      offer.beschreibung.replace(offer.basicPrice, '')
    )
    console.log(res)
  }
}
