import React, {useState, useEffect} from 'react';
//import { Card, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import {nanoid} from 'nanoid';

const socket = io.connect("http://192.168.1.3:8000")


const chat = () => {
	const [message, setMessage] = useState("");
	const [chat, setChat] = useState([]);

	const sendChat = (e) => {
		e.preventDefault()
		socket.emit("chat", {message,userName})
		setMessage('')
	}
	useEffect(()=>{
		socket.on("chat",(payload)=>{
			setChat([...chat, payload ])
		})
	})
	const userName = nanoid(4);
	return (
		<>
			{chat.map((payload, index)=>{
				return(
					<p key={index}>{payload.message}: <span>id: {payload.userName}</span></p>
				)
			})}
			<form onSubmit={sendChat}>
				<input 
					type="text" 
					name="chat"
					value={message}
					onChange={(e)=>{setMessage(e.target.value)}}
				/>
				<button type='submit'>send</button>
			</form>
		</>
	);
}

export default chat;
