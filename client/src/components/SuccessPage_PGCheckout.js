import React, {useState} from 'react';
import axios from 'axios';

const SuccessPage_PGCheckout = () => {
    const [SK, setSK] = useState('');
    const onSKChange = (e)=> setSK(e.target.value);
    const [refund, setRefundID] = useState('');
    const rrnIndex = window.location.pathname.lastIndexOf('/');
    const RRN = window.location.pathname.slice(rrnIndex+1);

    const onCheckTransaction = async()=>{
        const options = {
            method: 'get',
            url: `https://pg-sandbox.paymaya.com/payments/v1/payment-rrns/${RRN}`,
            headers: {
              'Content-type' : 'application/json',
              'Authorization' : `Basic ${btoa(`${SK}:`)}`
            }
          };

          const result = await axios(options);
          console.log(result.data)
    };

    const onRefund = async() => {
        const options = {
            method: 'post',
            url: `https://pg-sandbox.paymaya.com/payments/v1/payments/${refund}/refunds`,
            headers: {
              'Content-type' : 'application/json',
              'Authorization' : `Basic ${btoa(`${SK}:`)}`
            },
            data: JSON.stringify({
                totalAmount: {
                    amount: 100,
                    currency: "PHP"
                },
                reason:"wrong color"
            })
          };
          try{
              const result = await axios(options);
              console.log('==refund==');
              console.log(result.data)
          }catch(error){
              console.log(error.response.data);
          }
    }

    const onGetRefundList = async() => {
        const options = {
            method: 'get',
            url: `https://pg-sandbox.paymaya.com/payments/v1/payments/${refund}/voids`,
            headers: {
              'Content-type' : 'application/json',
              'Authorization' : `Basic ${btoa(`${SK}:`)}`
            }
          };
          try{
            const result = await axios(options);
            console.log('==refund list==');
            console.log(result.data)
          }catch(error){
              console.log(error.response.data);
          }
    }

    const onPaymentIDChange = (e) =>{
        setRefundID(e.target.value);
    };

    return (
        <div>
            <h1>success</h1>
            <input type="text" value={SK} placeholder="Secret Key" onChange={onSKChange}/>
            <br/>
            <button onClick={onCheckTransaction}>{`check transactions for RRN: ${RRN}`}</button>
            <br/>
            <input type='text' placeholder='payment to refund' value={refund} onChange={onPaymentIDChange}/>
            <button onClick={onRefund}>refund</button>
            <button onClick={onGetRefundList}>get refunded list</button>
        </div>
    );
}

export default SuccessPage_PGCheckout;