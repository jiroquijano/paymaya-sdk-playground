import React, {useState} from 'react';
import {paymentGatewayCheckOut} from '../paymaya_sdk/payment-gateway-checkout';

const SuccessPage_PGCheckout = () => {
    const [SK, setSK] = useState('');
    const onSKChange = (e)=> setSK(e.target.value);
    const [refund, setRefundID] = useState('');
    const rrnIndex = window.location.pathname.lastIndexOf('/');
    const RRN = window.location.pathname.slice(rrnIndex+1);

    const onCheckViaRRN = async()=>{
        const {response, error} = await paymentGatewayCheckOut('GET_VIA_RRN',{secret:SK},{RRN});
        if (!error) console.log(response);
    };

    const onRefund = async() => {
        const body = {
            totalAmount: {
                amount: 100,
                currency: "PHP"
            },
            reason:"wrong color"
        };
        const {response} = paymentGatewayCheckOut('REFUND_PAYMENT', {secret:SK},{paymentId:refund,body});
        console.log(response);
    }

    const onGetRefundList = async() => {
        const {response} = paymentGatewayCheckOut('GET_REFUNDS_LIST',{secret:SK},{paymentId:refund})
        console.log("==refunds list==");
        console.log(response);
    }

    const onPaymentIDChange = (e) =>{
        setRefundID(e.target.value);
    };

    return (
        <div>
            <h1>success</h1>
            <input type="text" value={SK} placeholder="Secret Key" onChange={onSKChange}/>
            <br/>
            <button onClick={onCheckViaRRN}>{`check transactions for RRN: ${RRN}`}</button>
            <br/>
            <input type='text' placeholder='payment to refund' value={refund} onChange={onPaymentIDChange}/>
            <button onClick={onRefund}>refund</button>
            <button onClick={onGetRefundList}>get refunded list</button>
        </div>
    );
}

export default SuccessPage_PGCheckout;