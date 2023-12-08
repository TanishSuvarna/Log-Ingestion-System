import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9093'],
})

// const consumer = kafka.consumer({ groupId: 'test-group' })

// await consumer.connect()
// await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

// await consumer.run({
//   eachMessage: async ({ topic, partition, message }) => {
//     const deserialize = JSON.parse(message.value.toString());
//     console.log(deserialize);
//   }
// })

export const logsInsert = async(req , res , next) => {
    try{
        const producer = kafka.producer()
        const serialize = req.body.map(obj =>{
          return {value : Buffer.from(JSON.stringify(obj))}
        });
        await producer.connect()
        await producer.send({
            topic: 'logs',
            messages: serialize,
        })
        await producer.disconnect()
        res.json({message:"Log Inserted Successfully"});
    }
    catch(err){ console.log(err) };
}

// Ingestion
//reverse proxy -> backend server -> kafka topic -> logstash -> elastic search

//Query Elastic Search Pagination