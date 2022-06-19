
const fn = function (time: any) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

const randomStatus = () => {
  return Math.ceil(Math.random() * 3)
}

const createRandomId = () => {
  return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
}

// const getCoinPrice = async () => {

// }

const generateData = () => {
  const obj = {
    "id": createRandomId(),
    "blockNumber": 12297450,
    "transactionIndex": 6,
    "sources": [
      0, 1, 2, 3
    ],
    "symbol": "eth",
    "slug": "ethereum",
    "leaseEnd": 12499050,
    "subscriptionId": 7,
    "networkId": 0,
    "aggregationStrategy": 1,
    "reportingStrategy": 0,
    "status": randomStatus(),
    "client": {
      "clientType": 0,
      "connectionInfo": {
        // => coin name
        // => estimate expiry date = ${createdTimestamp} + 3s * (${leaseEnd} - ${blockNumber})
        "contractAddress": "0x0F9dfd6043965B02e74D01188c13936fBE71D688",
        "networkId": 0
      }
    },
    "createdTimestamp": new Date(),
    "updatedTimestamp": new Date(),
    "display": true
  }

  return obj
}

export const getCardList = async () => {
  await fn(2000)

  const arr = []

  for (let index = 0; index < 8; index++) {
    arr.push(generateData())
  }

  return arr
}