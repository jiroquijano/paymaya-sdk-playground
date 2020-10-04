import React, {useState,useRef} from 'react';

const CreditCardForm = ({onCardSubmit}) => {
    const [cardNumber, setCardNumber] = useState('5123456789012346');
    const [expMonth, setExpMonth] = useState('12');
    const [expYear, setExpYear] = useState('2025');
    const [cvc, setCVC] = useState('111');
    const [clicked, setClicked] = useState(false);

    const onSubmit = (e) =>{
        e.preventDefault();
        setClicked(true);
        onCardSubmit(e);
    }
    
    return (
        <form onSubmit={onSubmit}>
            <label>
                Card Number:
                <input name='cardnumber' onChange={(e)=>setCardNumber(e.target.value)} type='text' placeholder='card number' value={cardNumber}/>
            </label>
            <br/>
            <label>
                exp month:
                <input name='expmonth' onChange={(e)=>setExpMonth(e.target.value)} type='number' min={1} max={12} value={expMonth}/>
            </label>
            <label>
                exp year:
                <input name='expyear' onChange={(e)=>setExpYear(e.target.value)} type='number' value={expYear}/>
            </label>
            <label>
                CVC:
                <input name='cvc' onChange={(e)=>setCVC(e.target.value)} type='number' value={cvc}/>
            </label>
            <br/>
            <button>{clicked?'saved':'save'}</button>
        </form>
    )
}

export default CreditCardForm;