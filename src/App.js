import { formatEther, parseEther } from 'ethers/lib/utils'
import { useState } from 'react'
import './App.css'

const { ethers } = require('ethers')

// API endpoints
let uniswap_endpoint = `https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3`
let etherscan_endpoint = `https://api.etherscan.io`
let etherscan_apikey = `2PWEYJG9GT1YIMSGCBXYIGFSS7MCKW2PSB`

const walletAddress = `0x3D0768da09CE77d25e2d998E6a7b6eD4b9116c2D`

function BigNumberToEthString (wei) {
  return formatEther(wei).toString()
}

function toUTCDateTimeString (timestamp) {
  let date = new Date(timestamp * 1000)
  let utc_time = date
    .toISOString()
    .replace('T', ' ')
    .substr(0, 16)
  return utc_time
}

function App () {
  const [fetchedTransactions, setFetchedTransactions] = useState(null)

  async function getWalletTransactions (address) {
    let etherscanProvider = new ethers.providers.EtherscanProvider()

    const transactions = await etherscanProvider
      .getHistory(address)
      .then(data => {
        return data
      })
      .catch(error => {
        return error
      })
    console.log(transactions)
    setFetchedTransactions(transactions)
  }

  return (
    <div className='App'>
      <header>Transaction history</header>

      <div className='actionBar'>
        <button
          onClick={e => {
            e.preventDefault()
            getWalletTransactions(walletAddress)
          }}
        >
          Get transactions
        </button>
      </div>

      <div className='table'>
        <div className='titles row'>
          <h1 className='date title'>Date Time(UTC)</h1>
          <h2 className='description title'>Description</h2>
          <h3 className='addressFrom title'>From</h3>
          <h4 className='addressTo title'>To</h4>
          <h5 className='value title'>Value</h5>
          <h6 className='fee title'>Fee</h6>
        </div>

        {fetchedTransactions &&
          fetchedTransactions.map((item, index) => {
            return (
              <DataRow
                date={item.timestamp}
                description={
                  item.from === walletAddress ? 'Withdrawal' : 'Deposit'
                }
                addressFrom={item.from}
                addressTo={item.to}
                value={item.value['_hex']}
                fee={item.gasPrice['_hex']}
                key={`${index}`}
              />
            )
          })}
      </div>
    </div>
  )
}

function DataRow (props) {
  return (
    <div className='values row'>
      <p className='date dataValue'>{toUTCDateTimeString(props.date)}</p>
      <p className='description dataValue'>{props.description}</p>
      <p className='addressFrom dataValue'>{props.addressFrom}</p>
      <p className='addressTo dataValue'>{props.addressTo}</p>
      <p className='value dataValue'>{`${BigNumberToEthString(
        props.value
      )} Ξ`}</p>
      <p className='fee dataValue'>{`${BigNumberToEthString(
        props.fee.toString()
      )} Ξ`}</p>
    </div>
  )
}

export default App
