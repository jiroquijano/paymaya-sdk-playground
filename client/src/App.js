import React,{useState} from 'react';
import PaymentGatewayCheckout from './components/PaymentGatewayCheckout';
import PaymentVault from './components/PaymentVault';

function App() {
  const [RRN, setRRN] = useState('12062014');
  const onRRNChange = (e) => setRRN(e.target.value);
  const [publicKey, setPublicKey] = useState(localStorage.getItem('publickey'));
  const [secretKey, setSecretKey] = useState(localStorage.getItem('secretkey'));
  const onSKChange = (e) => setSecretKey(e.target.value);
  const onPKChange = (e) => setPublicKey(e.target.value);

  return (
      <div>
        <h1>Paymaya SDK Playground</h1>
        <input type="text" placeholder="Public Key" onChange={onPKChange} value={publicKey}></input>
        <br/>
        <input type="text" placeholder="Secret Key" onChange={onSKChange} value={secretKey}></input>
        <br/>
        <label>RRN:
          <input type='text' onChange={onRRNChange} placeholder='RRN' value={RRN}/>
          <br/>
        </label>
        <div>
          <PaymentGatewayCheckout RRN={RRN} publicKey={publicKey} secretKey={secretKey}/>
          <PaymentVault RRN={RRN} publicKey={publicKey} secretKey={secretKey}/>
        </div>
      </div>
  );
};


export default App;
