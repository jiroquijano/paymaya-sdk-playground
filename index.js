const express = require('express');
const app = express();

app.listen(80, ()=>{
    console.log('listening on port 3000');
});

app.get('/api/hello', (req, res)=>{
    res.send('hello');
});

app.post('/api/success',(req,res)=>{
    console.log('hook!')
    res.status(200).send();
})