import axios from 'axios';

export const createPaymentToken = async (publicKey, cardDetails) =>{
    const options = {
        method: 'post',
        url: 'https://pg-sandbox.paymaya.com/payments/v1/payment-tokens',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : `Basic ${btoa(`${publicKey}:`)}`
        },
        data: JSON.stringify({card: cardDetails})
    }
    try {
        const result = await axios(options);
        return result.data;
    } catch (error) {
        console.log(error.response.data)
        return {error: error.response.data};
    }
};

export const createCustomer = async (secretKey, customerDetails) => {
    const options = {
        method: 'post',
        url: 'https://pg-sandbox.paymaya.com/payments/v1/customers',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${secretKey}:`)}`
        },
        data: JSON.stringify(customerDetails)
    }
    try {
        const result = await axios(options);
        console.log(result.data)
        return result.data.id;
    } catch (error) {
        console.log(error.response.data);
    }
}

export const createOneTimePayment = async (publicKey, secretKey, transactionDetails, cardDetails) => {
    const cardToken = await createPaymentToken(publicKey, cardDetails);
    if(cardToken.error) return;
    const options = {
        method: 'post',
        url: ' https://pg-sandbox.paymaya.com/payments/v1/payments',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Basic ${btoa(`${secretKey}:`)}`
        },
        data: JSON.stringify({...transactionDetails, paymentTokenId: cardToken.paymentTokenId})
    }
    try {
        const result = await axios(options);
        console.log(result.data);
        return result.data;
    } catch (error) {
        return error;
    }
}

export const linkCustomerCard = async (secretkey, customerId, cardToken, RRN) => {
    const options = {
        method:'post',
        url:`https://pg-sandbox.paymaya.com/payments/v1/customers/${customerId}/cards`,
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' :  `Basic ${btoa(`${secretkey}:`)}`
        },
        data: JSON.stringify({
            paymentTokenId: `${cardToken}`,
            isDefault: true,
            redirectUrl: {
            success: `https://www.merchantsite.com/success_onetimepay`,
            failure: `https://www.merchantsite.com/failure`,
            cancel: `https://www.merchantsite.com/cancel`
            },
            requestReferenceNumber: RRN
        })
    };
    try {
        const result = await axios(options);
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.log(error.response.data);
    }
}