import React,{useState} from 'react';
import PaymentGatewayCheckout from './components/PaymentGatewayCheckout';
import PaymentVault from './components/PaymentVault';

function App() {
  const [publicKey, setPublicKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const onSKChange = (e) => setSecretKey(e.target.value);
  const onPKChange = (e) => setPublicKey(e.target.value);

  return (
      <div>
        <h1>Paymaya SDK Playground</h1>
        <input type="text" placeholder="Public Key" onChange={onPKChange} value={publicKey}></input>
        <br/>
        <input type="text" placeholder="Secret Key" onChange={onSKChange} value={secretKey}></input>
        <div>
          <PaymentGatewayCheckout publicKey={publicKey} secretKey={secretKey}/>
          <PaymentVault publicKey={publicKey} secretKey={secretKey}/>
        </div>
      </div>
  );
};


export default App;
