
const express = require('express');
const kafka = require('kafka-node');
const {KafkaStreams} = require('kafka-streams');

//Constants 
const PORT = 8000;
const HOST = '0.0.0.0';

//App
const app = express();


app.get('/reviews', (req, res) => {
    // receive data here
    let config = {
        "noptions": {
            "metadata.broker.list": "localhost:9092",
            "group.id": "kafka-streams-test-native",
            "client.id": "kafka-streams-test-name-native",
            "event_cb": true,
            "compression.codec": "snappy",
            "api.version.request": true,
            "socket.keepalive.enable": true,
            "socket.blocking.max.ms": 100,
            "enable.auto.commit": false,
            "auto.commit.interval.ms": 100,
            "heartbeat.interval.ms": 250,
            "retry.backoff.ms": 250,
            "fetch.min.bytes": 100,
            "fetch.message.max.bytes": 2 * 1024 * 1024,
            "queued.min.messages": 100,
            "fetch.error.backoff.ms": 100,
            "queued.max.messages.kbytes": 50,
            "fetch.wait.max.ms": 1000,
            "queue.buffering.max.ms": 1000,
            "batch.num.messages": 10000
        },
        "tconf": {
            "auto.offset.reset": "earliest",
            "request.required.acks": 1
        },
        "batchOptions": {
            "batchSize": 5,
            "commitEveryNBatch": 1,
            "concurrency": 1,
            "commitSync": false,
            "noBatchCommits": false
        }
    };

    const kafkaStreams = new KafkaStreams(config);
    kafkaStreams.on("error",(error) => console.error(error));

    const kafkaTopicName = "kb-new-review-topic";
    const stream  = kafkaStreams.getKStream(kafkaTopicName);
    const data = (message) => {
        return JSON.parse(message.value.toString());
    };

    // 50 product reviews and 20 site reviews.  
    // 20 of these product reviews are coming from amazon, 
    // 30 of them came directly from the widget(A kudobuzz review) 
    // and the 20 site reviews came from facebook.

    stream.from("kb-new-review-topic")
          .map(data)
          .filter(dt => dt.type=="product")
          .countByKey("type", "productCount")
          .filter(dt=>dt.source=='amazon')
          .countByKey('source',"amazonCount")
          .tap(kv => console.log(kv))
          .to("kb-new-review-topic-output");
          

    stream.start().then(() => {
        console.log("stream started, as kafka consumer is ready.");
    }, error => {
        console.log("streamed failed to start: " + error);
    });    


    //post to another topic which will be listened to 

    res.send("OK here now");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);