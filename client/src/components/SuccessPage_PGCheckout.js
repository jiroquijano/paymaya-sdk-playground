import React, {useState} from 'react';
import {paymentGatewayCheckOut} from '../paymaya_sdk/payment-gateway-checkout';

const SuccessPage_PGCheckout = () => {
    const [SK, setSK] = useState(localStorage.getItem('secretkey'));
    const onSKChange = (e)=> setSK(e.target.value);
    const [refundId, setRefundID] = useState('');
    const [refundAmt, setRefundAmt] = useState('');
    const rrnIndex = window.location.pathname.lastIndexOf('/');
    const RRN = window.location.pathname.slice(rrnIndex+1);

    const onCheckViaRRN = async()=>{
        const {response, error} = await paymentGatewayCheckOut('GET_VIA_RRN',{secret:SK},{RRN});
        if (!error) console.log(response);
    };

    const onRefund = async() => {
        const body = {
            totalAmount: {
                amount: refundAmt,
                currency: "PHP"
            },
            reason:"wrong color"
        };
        const {response} = await paymentGatewayCheckOut('REFUND_PAYMENT', {secret:SK},{paymentId:refundId,body});
        console.log(response);
    }

    const onGetRefundList = async() => {
        const {response} = await paymentGatewayCheckOut('GET_REFUNDS_LIST',{secret:SK},{paymentId:refundId})
        console.log("==refunds list==");
        console.log(response);
    }

    const onPaymentIDChange = (e) =>{
        setRefundID(e.target.value);
    };

    const onRefundAmtChange = (e) => setRefundAmt(e.target.value);

    return (
        <div>
            <h1>success</h1>
            <input type="text" value={SK} placeholder="Secret Key" onChange={onSKChange}/>
            <br/>
            <button onClick={onCheckViaRRN}>{`check transactions for RRN: ${RRN}`}</button>
            <br/>
            <input type='text' placeholder='refund amount' value={refundAmt} onChange={onRefundAmtChange}/>
            <input type='text' placeholder='payment to refund' value={refundId} onChange={onPaymentIDChange}/>
            <button onClick={onRefund}>refund</button>
            <button onClick={onGetRefundList}>get refunded list</button>
        </div>
    );
}

export default SuccessPage_PGCheckout;