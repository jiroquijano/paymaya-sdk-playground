import React, {useState} from 'react';

const CustomerForm = ({onCustomerFormSubmit, customerId}) =>{

    const [firstName, setFirstName] = useState('John');
    const [middleName, setMiddleName] = useState('Paul');
    const [lastname, setLastName] = useState('Doe');
    const [birthday, setBirthday] = useState('1995-10-24');
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (e) =>{
        e.preventDefault();
        onCustomerFormSubmit(e);
        setSubmitted(true);
    }

    const onChange = (e) =>{
        setSubmitted(false);
    }

    return (
        <form onSubmit={onSubmit} onChange={onChange}>
            <label>
                Customer details: {submitted?'(submitted)' : '(not submitted yet)'}
                <br/>
                <input name='first-name' type='text' onChange={(e)=> setFirstName(e.target.value)} value={firstName} placeholder='first name'/>
                <input name='middle-name' type='text' onChange={(e)=> setMiddleName(e.target.value)} value={middleName} placeholder='middle name'/>
                <input name='last-name' type='text' onChange={(e)=> setLastName(e.target.value)} value={lastname} placeholder='last name'/>
                <br/>
                <input name='birthday' type='text' onChange={(e)=> setBirthday(e.target.value)} value={birthday} placeholder='birthday: YYYY-MM-DD'/>
            </label>
            <button>submit</button>
        </form>
    )
}

export default CustomerForm;