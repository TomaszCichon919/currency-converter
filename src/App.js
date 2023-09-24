import CurrencyRow from './components/CurrencyRow';
import styles from './App.module.scss';
import React, {useEffect, useState} from 'react';

const BASE_URL= 'http://api.nbp.pl/api/exchangerates/tables/a/';
//const API_KEY ='cd7d7cd0338884a126f823a389ba071c';
//const READY_URL = BASE_URL?API_KEY;

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  //console.log('currency options', currencyOptions);
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState (true);
  const [currencyData, setCurrencyData] = useState ('')
  console.log('ff', currencyData[toCurrency]);
  console.log('tocurrency', toCurrency);
  console.log('forcurrency', fromCurrency);
  console.log('amount', amount);

  useEffect(()=> {
    fetch(BASE_URL)
    .then(res=> res.json())
    .then(data => 
      {
      const code = "code";
const currencyCodes = data[0].rates.map(function(rate) {
  return rate[code]
});
const cur = "mid";
const currencyRates = data[0].rates.map(function(rate) {
  return rate[cur]
});
const EUR = {
  code: currencyCodes[7], 
  rate:currencyRates[7]
}
//console.log('currency codes', currencyCodes)
currencyCodes.push('PLN');
currencyRates.push(1);
//console.log('all', currencyCodes);

const rawCurrencyData = {};

for (let i = 0; i < currencyCodes.length && i < currencyRates.length; i++) {
  rawCurrencyData[currencyCodes[i]] = currencyRates[i];
}
setCurrencyData(rawCurrencyData)
     setCurrencyOptions(currencyCodes);
     setFromCurrency('PLN')
     setToCurrency(EUR.code)
    //  console.log('hello', data)
     setExchangeRate(EUR.rate)

   })
  }, [])
  // console.log('to', toCurrency);
  // console.log('form', fromCurrency);

 function handleFromAmountChange (e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
 }

    function handleToAmountChange (e) {
      setAmount(e.target.value)
      setAmountInFromCurrency(false)
  }
  function handleToCurrencyChange (e) {
    setToCurrency(e.target.value)
    //setExchangeRate(currencyData.toCurrency)
  }
  function handleFromCurrencyChange (e) {
    setFromCurrency(e.target.value)
    //setExchangeRate(currencyData.fromCurrency)

  }
  //console.log('money', exchangeRate)
  console.log("dla for", currencyData[fromCurrency])
  let toAmount, fromAmount
  if(amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * currencyData[fromCurrency]/currencyData[toCurrency]
  } else {
    toAmount = amount
    fromAmount = amount * currencyData[toCurrency]/currencyData[fromCurrency]
  }
  return (
    <div>
   <h1>Converter</h1>
   <CurrencyRow 
   currencyOptions ={currencyOptions}
   selectedCurrency = {fromCurrency}
   onChangeCurrency={handleFromCurrencyChange}
   onChangeAmount = {handleFromAmountChange}
   amount={fromAmount}
   />
   <div className={styles.equals}>=</div>
   <CurrencyRow 
   currencyOptions ={currencyOptions}
   selectedCurrency = {toCurrency}
   onChangeCurrency={handleToCurrencyChange}
   onChangeAmount = {handleToAmountChange}
   amount={toAmount}
   />
   </div>
  );
}
// e =>setToCurrency(e.target.value)
export default App;
