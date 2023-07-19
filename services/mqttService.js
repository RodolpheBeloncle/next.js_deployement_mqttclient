import React from 'react';
import mqtt from 'mqtt';

const broker_url = process.env.NEXT_PUBLIC_MQTT_BROKER_URL;
const mqttOptions = {
  clientId: process.env.NEXT_PUBLIC_CLIENTID,
  // username: process.env.NEXT_PUBLIC_USERNAME,
  // password: process.env.NEXT_PUBLIC_PASSWORD,
};

let mqttClient;
console.log(process.env.NEXT_PUBLIC_MQTT_BROKER_URL);

export const connectMQTT = () => {
  mqttClient = mqtt.connect(
    process.env.NEXT_PUBLIC_MQTT_BROKER_URL,
    mqttOptions
  );

  mqttClient.on('connect', () => {
    console.log('MQTT connected');
    // Additional logic after successful connection
  });

  mqttClient.on('message', (topic, message) => {
    // Handle incoming MQTT messages
    console.log(`Received message on topic "${topic}": ${message.toString()}`);
  });

  return mqttClient;
};

export const disconnectMQTT = () => {
  if (mqttClient) {
    mqttClient.end();
    console.log('MQTT disconnected');
  }
};

export const subscribeToTopic = (topic) => {
  if (mqttClient) {
    mqttClient.subscribe(topic);
  }
};

export const unsubscribeFromTopic = (topic) => {
  if (mqttClient) {
    mqttClient.unsubscribe(topic);
  }
};

export const publishMessage = (topic, message) => {
  if (mqttClient) {
    mqttClient.publish(topic, message);
  }
};
