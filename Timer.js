const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3002;

app.use(express.static(__dirname));

app.get('/start', async(req, res) => {

    try{

        const response = await axios.get('http://localhost:3000/start');
        res.json(response.data);

    }catch(error){

        console.error("Error sending request", error.message);
        res.status(500).json({error: "Failed to start timer!"});

    }
});


app.get('/stop', async (req, res) => {

    try{
        const response = await axios.get('http://localhost:3000/stop');
        res.json(response.data);

    }catch(error){

        console.error("Error sending request: ", error.message);
        res.status(500).json({error: 'Failed to stop timer!'});
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');

});

app.listen(PORT, () => {
    console.log(`Sender microservice listening on port ${PORT}`)
})