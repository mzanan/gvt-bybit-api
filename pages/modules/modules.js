import crypto from "crypto"
import axios from "axios"

const url         = "https://api.bybit.com"
const apiKey      = process.env.NEXT_PUBLIC_APIKEY
const secret      = process.env.NEXT_PUBLIC_SECRET
const recvWindow  = 5000
const timestamp   = Date.now().toString() - 2000

function getSignature(parameters, secret) {
  return crypto
    .createHmac("sha256", secret)
    .update(timestamp + apiKey + recvWindow + parameters)
    .digest("hex")
}

async function http_request(endpoint, method, data, Info) {
  const sign = getSignature(data, secret)
  let fullendpoint = ""
  if (method == "POST") {
    fullendpoint = url + endpoint
  } else {
    fullendpoint = url + endpoint + "?" + data
    data = ""
  }

  const config = {
    method: method,
    url: fullendpoint,
    headers: {
      "X-BAPI-SIGN-TYPE": "2",
      "X-BAPI-SIGN": sign,
      "X-BAPI-API-KEY": apiKey,
      "X-BAPI-TIMESTAMP": timestamp,
      "X-BAPI-RECV-WINDOW": "5000",
      "Content-Type": "application/json charset=utf-8",
    },
    data: data
  }

  console.log(Info + " Calling....")
  return await axios(config)
    .then(res => res.data)
    .catch(err => console.log(err))
}

export async function getWalletInverseBTC() {
  const orderLinkId = crypto.randomBytes(16).toString("hex")
  const endpoint    = "/v2/private/wallet/balance" 
  const data        = "symbol=BTCUSD&category=linear&orderStatus=New&orderLinkId=" + orderLinkId
  
  return await http_request(endpoint, "GET", data, "Wallet Balance Inverse Perpetual (V2)")
}

export async function getTradesHistory() {
  const orderLinkId = crypto.randomBytes(16).toString("hex")
  const endpoint    = "/v2/private/execution/list"
  const data        = "symbol=BTCUSD&category=linear&orderStatus=New&orderLinkId=" + orderLinkId
  
  return await http_request(endpoint, "GET", data, "Wallet Balance Inverse Perpetual (V2)")
}
