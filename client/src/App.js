import React,{useState} from 'react';
import axios from 'axios';

function App() {
  const [publicKey, setPublicKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const onPKChange = (e) => setPublicKey(e.target.value);
  const onSKChange = (e)=> setSecretKey(e.target.value);

  const transactionDetails = {
    totalAmount: {
      value: 100,
      currency: "PHP",
      details: {
        discount: 0,
        serviceCharge: 0,
        shippingFee: 0,
        tax: 0,
        subtotal: 100
      }
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
    items: [
      {
        name: "Canvas Slip Ons",
        quantity: 1,
        code: "CVG-096732",
        description: "Shoes",
        amount: {
          value: 100,
          details: {
            discount: 0,
            serviceCharge: 0,
            shippingFee: 0,
            tax: 0,
            subtotal: 100
          }
        },
        totalAmount: {
          value: 100,
          details: {
            discount: 0,
            serviceCharge: 0,
            shippingFee: 0,
            tax: 0,
            subtotal: 100
          }
        }
      }
    ],
    redirectUrl: {
      success: "http://localhost:3000/success",
      failure: "http://localhost:3000/failure",
      cancel: "http://localhost:3000/cancel"
    },
    requestReferenceNumber: "1551191039",
    metadata: {}
  };

  const onPGCheckOut = async(e) => {
    const options = {
      method: 'post',
      url: 'https://pg-sandbox.paymaya.com/checkout/v1/checkouts',
      headers: {
        'Content-type' : 'application/json',
        'Authorization' : `Basic ${btoa(`${publicKey}:`)}`
      },
      data : JSON.stringify(transactionDetails)
    };
    const result = await axios(options);
    if(result.data.redirectUrl)  window.location = result.data.redirectUrl;
  };

  return (
      <div>
        <h1>Paymaya SDK Playground</h1>
        <input type="text" placeholder="Public Key" onChange={onPKChange} value={publicKey}></input>
        <br/>
        <input type="text" placeholder="Secret Key" onChange={onSKChange} value={secretKey}></input>
        <br/>
        <button onClick={onPGCheckOut}>PG_Checkout</button>
      </div>
  );
};

export default App;
