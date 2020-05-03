const moment = require('moment')

async function getBasePrice(offer) {
  if (!offer.basicPrice) {
    return {
      amount: offer.preis * 100,
      unit: 'piece',
    }
  }
  // TODO: add error handling
  let [quantity, price] = offer.basicPrice.split(' = ')
  let [amount, unit] = quantity.split(' ')
  amount = amount.replace(',', '.')
  factor = 1.0 / amount
  price = price.split(' ')[1]
  price = parseFloat(price.replace(',', '.'))
  return {
    amount: price * 100,
    unit: unit.toLowerCase(),
  }
}

async function extractInfoFromOffer(offer, marketId) {
  const validUntil = moment(offer.gueltig_bis)
  return {
    name: offer.titel,
    price: offer.preis * 100,
    marketId: 'Edeka' + marketId,
    valid: {
      from: validUntil.subtract(7, 'days').unix(),
      to: validUntil.unix(),
    },
    basePrice: await getBasePrice(offer),
    description: offer.beschreibung,
    quantity: getQuantity(offer),
    category: offer.warengruppe,
    image: offer.bild_web130,
  }
}

async function extractInfo(offers) {
  const result = []
  for (const marketId in offers) {
    if (!offers.hasOwnProperty(marketId)) {
      continue
    }
    for (const offer of offers[marketId]) {
      result.push(await extractInfoFromOffer(offer, marketId))
    }
  }
  return result
}

module.exports = { extractInfo }
