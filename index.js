const axios = require('axios')
const config = require('config')
const fs = require('fs')

const extractor = require('./extractor')

/**
 * Returns the weekly offers in the following form
 * {marketId: [
 *   {offer}
 * ]}
 */
async function getOffers(marketIds) {
  // const offers = {}
  // for (const id of marketIds) {
  //   const res = await axios.get(
  //     `https://www.edeka.de/eh/service/eh/offers?marketId=${id}&limit=1000000`
  //   )
  //   if (res && res.data && res.data.docs) {
  //     offers[id] = res.data.docs
  //   }
  // }
  // return offers
  return JSON.parse(fs.readFileSync('offers.json'))
}

async function main() {
  const ids = config.get('marketIds')

  const results = await getOffers(ids)

  const extracted = await extractor.extractInfo(results)

  // TODO: send to kafka
}

main()
  .then(console.log('done'))
  .catch((e) => console.error(e))
