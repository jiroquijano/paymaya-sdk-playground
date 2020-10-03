import React, {useState} from 'react';

const PaymentVault = () => {
    // "card": {
    //     "number": "5123456789012346",
    //     "expMonth": "12",
    //     "expYear": "2025",
    //     "cvc": "111"
    //   }
    const [cardNumber, setCardNumber] = useState('5123456789012346');
    const [expMonth, setExpMonth] = useState('12');
    const [expYear, setExpYear] = useState('2025');
    const [cvc, setCVC] = useState('111');

    return (
        <>
            <h3>Payment Vault</h3>
            <p>card details</p>
            <input onChange={(e)=>setCardNumber(e.target.value)} type='text' placeholder='card number' value={cardNumber}/>
            <input onChange={(e)=>setExpMonth(e.target.value)} type='number' min={1} max={12} value={expMonth}/>
            <input onChange={(e)=>setExpYear(e.target.value)} type='number' value={expYear}/>
            <input onChange={(e)=>setCVC(e.target.value)} type='number' value={cvc}/>
            <br/>
            <button>One time payment</button>
        </>
    )
}

export default PaymentVault;
