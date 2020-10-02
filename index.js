const express = require('express');
const app = express();

app.listen(5000, ()=>{
    console.log('listening on port 3000');
});

app.get('/api/hello', (req, res)=>{
    res.send('hello');
});