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

export const paymentGatewayCheckOut = async (api, key, body) => {
    let options = {};

    switch (api){
        case 'CREATE_CHECKOUT':
            console.log('checkout');
            options = {
                ...createCheckOutOptions(key.public),
                data : JSON.stringify(body)
            };
            try {
                const result = await axios(options);
                return {response: result.data, error:undefined}
            } catch (error) {
                return {response:undefined, error: error.response.data}
            }
        default:
            break;
    }
}
