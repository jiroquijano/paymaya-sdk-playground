import React, {useState} from 'react';
import {createOneTimePayment} from '../paymaya_sdk/payment-vault';

const PaymentVault = ({publicKey, secretKey}) => {
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
    const RRN = '12062014';

    const transactionDetails = {
        totalAmount: {
          amount: 100,
          currency: "PHP",
        },
        buyer: {
          firstName: "John",
          middleName: "Paul",
          lastName: "Doe",
          birthday: "1995-10-24",
          customerSince: "1995-10-24",
          sex: "M",
          contact: {
            phone: "+639181008888",
            email: "merchant@merchantsite.com"
          },
          shippingAddress: {
            firstName: "John",
            middleName: "Paul",
            lastName: "Doe",
            phone: "+639181008888",
            email: "merchant@merchantsite.com",
            line1: "6F Launchpad",
            line2: "Reliance Street",
            city: "Mandaluyong City",
            state: "Metro Manila",
            zipCode: "1552",
            countryCode: "PH",
            shippingType: "ST" // ST - for standard, SD - for same day
          },
          billingAddress: {
            line1: "6F Launchpad",
            line2: "Reliance Street",
            city: "Mandaluyong City",
            state: "Metro Manila",
            zipCode: "1552",
            countryCode: "PH"
          }
        },
        redirectUrl: {
          success: `http://localhost:3000/success_onetimepay/${RRN}`,
          failure: "http://localhost:3000/failure",
          cancel: "http://localhost:3000/cancel"
        },
        requestReferenceNumber: RRN,
        metadata: {}
    };

    const onOneTimePayment = async (e) =>{
        const cardDetails = {
            number: cardNumber,
            expMonth,
            expYear,
            cvc
        };
        const result = await createOneTimePayment(publicKey, secretKey, transactionDetails, cardDetails)
        console.log(result);
        window.location = result.verificationUrl;
    };

    return (
        <>
            <h3>Payment Vault</h3>
            <label>Card Number:</label>
            <input onChange={(e)=>setCardNumber(e.target.value)} type='text' placeholder='card number' value={cardNumber}/>
            <br/>
            <label>exp month:</label>
            <input onChange={(e)=>setExpMonth(e.target.value)} type='number' min={1} max={12} value={expMonth}/>
            <label>exp year:</label>
            <input onChange={(e)=>setExpYear(e.target.value)} type='number' value={expYear}/>
            <label>CVC:</label>
            <input onChange={(e)=>setCVC(e.target.value)} type='number' value={cvc}/>
            <br/>
            <button onClick={onOneTimePayment}>One time payment</button>
        </>
    )
}

export default PaymentVault;
