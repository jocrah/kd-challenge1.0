'use strict';

const express = require('express');
const kafka = require('kafka-node');
const bodyParser = require('body-parser');

//Constants 
const PORT = 8080;
const HOST = '0.0.0.0';

//App
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/review', (req, res) => {
    // validation next - middleware
    // generate mock data
    console.log("Params : ");
    console.log(req.body);
    const Producer = kafka.Producer;
    const client = new kafka.KafkaClient();
    let producer = new Producer(client);
    let payloads = [
        {topic: 'kb-new-review-topic', messages: 'Hi'}
    ];

    producer.on('ready', function() {
        producer.send(payloads, function (err, data){
            console.log(data);
        });
    });

    producer.on('error', function(err){})

    res.send("OK");
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);