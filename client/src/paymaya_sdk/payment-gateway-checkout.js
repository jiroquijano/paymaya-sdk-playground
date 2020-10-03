import axios from 'axios';

const createCheckOutOptions = (publicKey) =>{
    return {
        method: 'post',
        url: 'https://pg-sandbox.paymaya.com/checkout/v1/checkouts',
        headers: {
            'Content-type' : 'application/json',
            'Authorization' : `Basic ${btoa(`${publicKey}:`)}`
        }
    };
}

const createGetPaymentViaRRNOptions = (secretKey, RRN) =>{
    return {
        method: 'get',
        url: `https://pg-sandbox.paymaya.com/payments/v1/payment-rrns/${RRN}`,
        headers: {
          'Content-type' : 'application/json',
          'Authorization' : `Basic ${btoa(`${secretKey}:`)}`
        }
    };
}

const createRefundPaymentOptions = (secretKey, paymentId) => {
    return {
        method: 'post',
        url: `https://pg-sandbox.paymaya.com/payments/v1/payments/${paymentId}/refunds`,
        headers: {
          'Content-type' : 'application/json',
          'Authorization' : `Basic ${btoa(`${secretKey}:`)}`
        }
    };
}

const createGetRefundsListOptions = (secretKey, paymentId) => {
    return {
        method: 'get',
        url: `https://pg-sandbox.paymaya.com/payments/v1/payments/${paymentId}/refunds`,
        headers: {
          'Content-type' : 'application/json',
          'Authorization' : `Basic ${btoa(`${secretKey}:`)}`
        }
    };
}

const callAxios = async(options) =>{
    try {
        const result = await axios(options);
        return {response: result.data, error:undefined}
    } catch (error) {
        alert(error.response.data.message);
        return {response:undefined, error: error.response.data.message}
    }
}

export const paymentGatewayCheckOut = async (api, key, data) => {
    let options = {};

    switch (api){
        case 'CREATE_CHECKOUT':
            options = {
                ...createCheckOutOptions(key.public),
                data : JSON.stringify(data)
            };
            return await callAxios(options);
        case 'GET_VIA_RRN':
            return await callAxios(createGetPaymentViaRRNOptions(key.secret, data.RRN));
        case 'REFUND_PAYMENT':
            options = {
                ...createRefundPaymentOptions(key.secret, data.paymentId),
                data: JSON.stringify(data.body)
            }
            return await callAxios(options)
        case 'GET_REFUNDS_LIST':
            return await callAxios(createGetRefundsListOptions(key.secret, data.paymentId))
        default:
            break;
    }
}
