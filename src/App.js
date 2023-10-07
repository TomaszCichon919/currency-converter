import CurrencyRow from './components/CurrencyRow';
import styles from './App.module.scss';
import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormControl } from 'react-bootstrap';
import DatePicker from "react-datepicker";




const BASE_URL= 'http://api.nbp.pl/api/exchangerates/tables/a/';



function App() {

  
  const [currencyOptions, setCurrencyOptions] = useState([])
  //console.log('currency options', currencyOptions);
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1);
  const [hamount, setHamount] = useState('');
  const [amountInFromCurrency, setAmountInFromCurrency] = useState (true);
  const [currencyData, setCurrencyData] = useState ('')
  const [publishedDate, setPublishedDate] = useState('2023-09-25');
  const [fromCurrencyInPLN, setfromCurrencyInPLN] = useState ('')
  const [toCurrencyInPLN, setToCurrencyInPLN] = useState ('')
  console.log('ff', currencyData[toCurrency]);
  console.log('tocurrency', toCurrency);
  console.log('forcurrency', fromCurrency);
  console.log('amount', amount);

  const FROMCURRENCY_URL = 'http://api.nbp.pl/api/exchangerates/rates/a/'+{fromCurrency}+'/'+{publishedDate}+'/'
  const TOCURRENCY_URL = 'http://api.nbp.pl/api/exchangerates/rates/a/'+{toCurrency}+'/'+{publishedDate}+'/'
const getPath =(value) => 'http://api.nbp.pl/api/exchangerates/rates/a/'+{value}+'/'+{publishedDate}+'/'
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

  useEffect(()=> {
    fetch(FROMCURRENCY_URL )
    .then(res=> res.json())
    .then(data => 
      {

        setfromCurrencyInPLN(data)
        console.log(fromCurrencyInPLN)
        console.log(fromCurrency)
   })
  }, [fromCurrency])

  useEffect(()=> {
    fetch(TOCURRENCY_URL )
    .then(res=> res.json())
    .then(data => 
      {

        setToCurrencyInPLN(data)
        console.log(toCurrencyInPLN)
        console.log(fromCurrency)
   })
  }, [toCurrency])
  console.log('to', toCurrency);
  console.log('form', fromCurrency);

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
  const handleDateChange = (date) => {
    setPublishedDate(date);
  }
    const handleSubmit = e => {
      e.preventDefault();
  
      
      };

    
  
  
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
   <h1>History data</h1>
   <Form onSubmit={handleSubmit}>
           

      <Form.Group className="mb-3" controlId="published">
        <Form.Label className="pb-2">Published</Form.Label>
        <div>
        <DatePicker selected={publishedDate}  dateFormat="yyyy-mm-dd" onChange={handleDateChange} />
       
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="author">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" placeholder="Author" value={amount} onChange={e => setHamount(e.target.value)} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="category">
        <Form.Label>From:</Form.Label>
        <Form.Select value={fromCurrency} onChange={handleFromCurrencyChange}>
        <option>Open this select menu</option>
        {currencyOptions.map(option => ( <option key={option} value ={option}>{option}</option>
      ))}
    </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="category">
        <Form.Label>To:</Form.Label>
        <Form.Select value={toCurrency} onChange={handleToCurrencyChange}>
        <option>Open this select menu</option>
        {currencyOptions.map(option => ( <option key={option} value ={option}>{option}</option>
      ))}
    </Form.Select>
      </Form.Group>
    

      <Button variant="primary" type="submit">
     Submit
      </Button>
    </Form>

   </div>
  );
}
// e =>setToCurrency(e.target.value)
export default App;
