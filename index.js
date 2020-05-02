const axios = require('axios')
const config = require('config')

async function getOffers(marketIds) {
  const offers = {}
  for (const id of marketIds) {
    const res = await axios.get(
      `https://www.edeka.de/eh/service/eh/offers?marketId=${id}&limit=1000000`
    )
    if (res && res.data && res.data.docs) {
      offers[id] = res.data.docs
    }
  }
  return offers
}

async function main() {
  const ids = config.get('marketIds')

  const results = await getOffers(ids)
}

main()
  .then(console.log('done'))
  .catch((e) => console.error(e))
