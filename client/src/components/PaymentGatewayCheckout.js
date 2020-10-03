import React from 'react';
import {paymentGatewayCheckOut} from '../paymaya_sdk/payment-gateway-checkout';
import {setupWebhook} from '../paymaya_sdk/paymaya-webhook';

const PaymentGatewayCheckout = ({publicKey, secretKey}) => {
    const RRN = '12062014';
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
      requestReferenceNumber: RRN,
      metadata: {}
    };

    const onPGCheckOut = async (e) => {
        const API_code = 'CREATE_CHECKOUT';
        const reqBody = {
          ...transactionDetails,
          redirectUrl: {
            success: `http://localhost:3000/success_pg_checkout/${RRN}`,
            failure: `http://localhost:3000/failure_pg_checkout/${RRN}`,
            cancel: `http://localhost:3000/cancel_pg_checkout/${RRN}`
          }
        };
        const {response,error} = await paymentGatewayCheckOut(API_code, {public:publicKey}, reqBody);
        if(!error) window.location = response.redirectUrl;
      };
    
    const onWebhookSetupClick = async(e) => {
    setupWebhook(secretKey, 'CHECKOUT_SUCCESS', 'http://localhost:80/api/success');
    }

    return (
        <>
            <h3>Payment Gateway Checkout</h3>
            <button onClick={onPGCheckOut}>PG_Checkout</button>
            <button onClick={onWebhookSetupClick}>Webhook Setup</button>
        </>
    )
}

export default PaymentGatewayCheckout;