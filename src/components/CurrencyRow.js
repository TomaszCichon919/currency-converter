import React from 'react'
import styles from './CurrencyRow.module.scss';

export default function CurrencyRow(props) {
    const 
    {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
    } = props
    console.log("selected", selectedCurrency)
  return (
    <div>
        <input type='number' className={styles.input} value={amount} onChange={onChangeAmount}></input>
        <select value={selectedCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map(option => ( <option key={option} value ={option}>{option}</option>)
)}
           
        
        </select>
    </div>
  )
}
