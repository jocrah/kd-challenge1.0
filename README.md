# KD Challenge S1.0

## Intended Solution Approach (ones quite worked on are checked)
- [x] Create a review producer microservice to push new reviews to specified kafka topic _kb-new-review-topic_
   * Express API to receive new reviews on ```/review``` POST route
   * Validation of data input against specified review schema using a custom middleware.
   * Pushing new review to kafka topic through Kafka Producer API
- [x] Create a review aggregator microservice 
   * Express API to provide API for getting posted reviews on ```/reviews```
   * Use Kafka Streams API to aggregate data using given guidelines and push to new topic for web UI

- [ ] Write tests for APIs using Mocha
- [ ] Create a review storage microservice to deal with storage of data to MongoDB, a cloud cluster used in this case (MongoDB Atlas)
- [ ] Have a reactjs UI serving as a Kafka consumer to visualise output in realtime
- [ ] Final intention was to employ the use of containers (docker) 


## Setup
* Download Kafka Quickstart [here](https://www.apache.org/dyn/closer.cgi?path=/kafka/2.2.0/kafka_2.12-2.2.0.tgz) and start the kafka server while following the following steps

```bash
tar -xzf kafka_2.12-2.2.0.tgz

cd kafka_2.12-2.2.0

bin/zookeeper-server-start.sh config/zookeeper.properties

bin/kafka-topics.sh --list --bootstrap-server localhost:9092
```
* Run ```npm install``` in the *review-producer-microservice* folder and *review-aggregator-microservice* folders

* Run ```npm start``` in each of them

* Kindly copy the following api routes (as denoted by hosts and ports used) to access [review-producer-microservice](http://0.0.0.0:8080/review) and [review-aggregator-microservice](http://0.0.0.0:8000/reviews) to try out using Postman or any other viable way.
