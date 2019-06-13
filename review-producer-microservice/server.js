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

//validate request
let reviewMiddleware = require('./review-middleware');
app.use(reviewMiddleware({}));

app.post('/review', (req, res) => {
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

    producer.on('error', function(err){
        console.log("not sent");
    });

    res.send("OK");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);