import React from 'react';
import {Link} from 'react-router-dom';

const SuccessPage_OneTimePay = ()=>{
    return(
        <div>
            <h1>Payment Vault One time Pay</h1>
            <h3>Success!</h3>
            <Link to='/'>Go back to homepage</Link>
        </div>
    )
}

export default SuccessPage_OneTimePay;