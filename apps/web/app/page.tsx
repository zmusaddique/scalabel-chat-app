'use client'
import { useState } from 'react';
import { useSocket } from '../context/SocketProvider';
import classes from './page.module.css';

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");


  return (
    <div>
      <div>
        <input onChange={e => setMessage(e.target.value)} className={classes['chat-input']} placeholder="Message..." />
        <button
          onClick={
            e => {
              sendMessage(message)
              console.log(message)
            }}
          className={classes['button']}
        >
          Send
        </button>
      </div>
      <div>
        <h1>All messages will appear here</h1>
      </div>
      {messages.map(e => <li>{e}</li>)}
    </div>
  )
}