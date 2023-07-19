import React, { useEffect } from 'react';
import { connectMQTT, subscribeToTopic, unsubscribeFromTopic, disconnectMQTT, publishMessage } from '../services/mqttService';
import type { NextPage } from "next";

// const client = mqtt.connect("ws://192.168.1.14:9001");
// const topic = "mytopic"; // change this to whatever your want

// client.on("connect", () => {
//   console.log("connected to mqtt broker.");

//   client.subscribe(topic, (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//   });
// });

// const emit = (body: "0" | "1") => {
//   client.publish(topic, body);
// };




const Home: NextPage = () => {
  useEffect(() => {
    const client = connectMQTT();

    subscribeToTopic('nextopic');


    return () => {
      unsubscribeFromTopic('nextopic');
      client && disconnectMQTT()
    };
  }, []);
  return (
    <>
      <button onClick={() => publishMessage("nexttopic", "1")}>on</button>
      <button onClick={() => publishMessage("nextopic", "0")}>off</button>
    </>
  );
};

export default Home;
