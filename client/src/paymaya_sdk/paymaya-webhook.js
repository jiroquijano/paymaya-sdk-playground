import axios from 'axios';

export const setupWebhook = async(secretKey, hookname, callbackUrl)=>{
    let webhookList = await getWebhooksList(secretKey);
    let isWebHookSet = false;
    if(webhookList){
        isWebHookSet = webhookList.some((hook)=>{
            return hook.name === hookname;
        });
    }

    if(isWebHookSet) {
        console.log('webhook already set');
        return;
    } else{
        const options = {
            method: 'post',
            url: 'https://pg-sandbox.paymaya.com/checkout/v1/webhooks',
            headers:{
                'Content-type': 'application/json',
                'Authorization': `Basic ${btoa(`${secretKey}:`)}`
            },
            data: JSON.stringify({
                name: hookname,
                callbackUrl
            })
        }
        try {
            const result = await axios(options);
            console.log(result.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

};

export const deleteWebhook = async (secretKey,webhookId) => {
    const options = {
        method: 'delete',
        url: `https://pg-sandbox.paymaya.com/checkout/v1/webhooks/${webhookId}`,
        headers:{
            'Authorization': `Basic ${btoa(`${secretKey}:`)}`
        }
    }
    try {
        const result = await axios(options);
        console.log(result.data);
    } catch (error) {
        console.log(error.response.data);
    }
}

const getWebhooksList = async (secretKey) =>{
    const options = {
        method: 'get',
        url: 'https://pg-sandbox.paymaya.com/checkout/v1/webhooks',
        headers: {
            'Authorization': `Basic ${btoa(`${secretKey}:`)}`
        }
    };
    const result = await axios(options);
    console.log(result.data);
    return result.data;
}