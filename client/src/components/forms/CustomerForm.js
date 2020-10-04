import React, {useState} from 'react';

const CustomerForm = () =>{

    const [firstName, setFirstName] = useState('John');
    const [middleName, setMiddleName] = useState('Paul');
    const [lastname, setLastName] = useState('Doe');
    const [birthday, setBirthday] = useState('1995-10-24');

    // const customerDetails = {
    //     firstName: "John",
    //     middleName: "Paul",
    //     lastName: "Doe",
    //     birthday: "1995-10-24",
    //     customerSince: "1995-10-24",
    //     sex: "M",
    //     contact: {
    //       phone: "+639181008888",
    //       email: "merchant@merchantsite.com"
    //     },
    //     shippingAddress: {
    //       firstName: "John",
    //       middleName: "Paul",
    //       lastName: "Doe",
    //       phone: "+639181008888",
    //       email: "merchant@merchantsite.com",
    //       line1: "6F Launchpad",
    //       line2: "Reliance Street",
    //       city: "Mandaluyong City",
    //       state: "Metro Manila",
    //       zipCode: "1552",
    //       countryCode: "PH",
    //       shippingType: "ST" // ST - for standard, SD - for same day
    //     },
    //     billingAddress: {
    //       line1: "6F Launchpad",
    //       line2: "Reliance Street",
    //       city: "Mandaluyong City",
    //       state: "Metro Manila",
    //       zipCode: "1552",
    //       countryCode: "PH"
    //     }
    //   };

    return (
        <>
            <label>
                Customer details:
                <br/>
                <input type='text' onChange={(e)=> setFirstName(e.target.value)} value={firstName} placeholder='first name'/>
                <input type='text' onChange={(e)=> setMiddleName(e.target.value)} value={middleName} placeholder='middle name'/>
                <input type='text' onChange={(e)=> setLastName(e.target.value)} value={lastname} placeholder='last name'/>
                <br/>
                <input type='text' onChange={(e)=> setBirthday(e.target.value)} value={birthday} placeholder='birthday: YYYY-MM-DD'/>
            </label>
        </>
    )
}

export default CustomerForm;