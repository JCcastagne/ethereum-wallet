import './App.css'

const { ethers } = require('ethers')

// API endpoints
let uniswap_endpoint = `https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3`
let etherscan_endpoint = `https://api.etherscan.io`
let etherscan_apikey = `2PWEYJG9GT1YIMSGCBXYIGFSS7MCKW2PSB`

const walletAddress = `0x3D0768da09CE77d25e2d998E6a7b6eD4b9116c2D`

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
}

// getWalletTransactions(walletAddress)

function App () {
  return (
    <div className='App'>
      <header>Transaction history</header>

      <div className='table'>
        <div className='titles row'>
          <h1 className='date title'>Date Time(UTC)</h1>
          <h2 className='description title'>Description</h2>
          <h3 className='addressFrom title'>From</h3>
          <h4 className='addressTo title'>To</h4>
          <h5 className='value title'>Value</h5>
          <h6 className='fee title'>Fee</h6>
        </div>
        <DataRow />
        <DataRow />
        <DataRow />
        <DataRow />
        <DataRow />
        <DataRow />
        <DataRow />
        <DataRow />
      </div>
    </div>
  )
}

function DataRow (date, description, addressFrom, addressTo, values, fee) {
  return (
    <div className='values row'>
      <p className='date dataValue'>1,000,000.00</p>
      <p className='description dataValue'>2,000,000.00</p>
      <p className='addressFrom dataValue'>3,000,000.00</p>
      <p className='addressTo dataValue'>4,000,000.00</p>
      <p className='value dataValue'>5,000,000.00</p>
      <p className='fee dataValue'>6,000,000.00</p>
    </div>
  )
}

export default App
