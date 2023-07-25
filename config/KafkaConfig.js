import { Kafka, Partitioners } from "kafkajs"
export const kafkaClient = new Kafka({
    clientId: 'fbhfhdoy',
    brokers: ['tricycle.srvs.cloudkafka.com:9094'],
    ssl: true,
    sasl: {
        mechanism: 'scram-sha-512',
        username: 'fbhfhdoy',
        password: '6hQYf3O8-xW8_N81GcAbyEDh4ZTCLfPc'
    },
});


export const kafkaProducer = kafkaClient.producer({
    createPartitioner: Partitioners.LegacyPartitioner
});