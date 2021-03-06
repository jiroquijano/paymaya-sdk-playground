import React, {useState} from 'react';
import {
  createOneTimePayment,
  createCustomer,
  createPaymentToken,
  linkCustomerCard
} from '../paymaya_sdk/payment-vault';
import CustomerForm from './forms/CustomerForm';
import CreditCardForm from './forms/CreditCardForm';

const PaymentVault = ({publicKey, secretKey, RRN}) => {

    const [cardDetails, setCardDetails] = useState();
    const [customerId, setCustomerId] = useState('');
    const [token, setToken] = useState('');
    const [customerPersonalDetails, setCustomerPersonalDetails] = useState({
      firstName: "John",
      middleName: "Paul",
      lastName: "Doe",
      birthday: "1995-10-24",
    });

    const customerDetails = {
      ...customerPersonalDetails,
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
    };

    const transactionDetails = {
        totalAmount: {
          amount: 100,
          currency: "PHP",
        },
        buyer: {
          ...customerDetails
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
        // const cardDetails = {
        //     number: cardNumber,
        //     expMonth,
        //     expYear,
        //     cvc
        // };
        if(!cardDetails) {
          return alert('Click save on credit card form');
        };
        console.log(cardDetails);
        const result = await createOneTimePayment(publicKey, secretKey, transactionDetails, cardDetails)
        console.log(result);
        window.location = result.verificationUrl;
    };

    const onCardSubmit = (e) =>{
      setCardDetails({
        number: e.target['cardnumber'].value,
        expMonth: e.target['expmonth'].value,
        expYear: e.target['expyear'].value,
        cvc: e.target['cvc'].value
      });
    }

    const onCustomerFormSubmit = (e) =>{
      setCustomerPersonalDetails({
        firstName: e.target['first-name'].value,
        middleName: e.target['middle-name'].value,
        lastName: e.target['last-name'].value,
        birthday: e.target['birthday'].value,
      })
    }
    
    const onCreateCustomer = async (e) =>{
      const customerId = await createCustomer(secretKey,customerDetails);
      if(customerId) setCustomerId(customerId);
    }

    const onCardTokenization = async (e) =>{
      const tokenizedCard = await createPaymentToken(publicKey, cardDetails);
      setToken(tokenizedCard.paymentTokenId);
    }

    const onVaultHandler = async(e)=>{
      const response = await linkCustomerCard(secretKey, customerId, token, RRN);
      window.location = response.verificationUrl;
    }

    return (
        <>
            <h3>Payment Vault</h3>
            <CreditCardForm onCardSubmit={onCardSubmit} customerId={customerId}/>
            <button onClick={onCardTokenization}>tokenize</button>
            <br/>
            {
              token ? 
              <label>
                Payment token:
                <br/>
                <textarea readOnly value={`${token}`}/> 
              </label>
              : undefined 
            }
            <br/>
            <CustomerForm onCustomerFormSubmit={onCustomerFormSubmit}/>
            {
              customerId ? 
              <label>
                CustomerId:
                <br/>
                <textarea readOnly value={`${customerId}`}/> 
                <br/>
              </label>
              : undefined 
            }
            <button onClick={onCreateCustomer}>Create Customer</button>
            {
              (customerId && token) && <button onClick={onVaultHandler}>Vault Card</button>
            }
            <br/>
            <button onClick={onOneTimePayment}>One time payment</button>
        </>
    )
}

export default PaymentVault;
