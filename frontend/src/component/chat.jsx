import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';
import { FaUserTie } from 'react-icons/fa'
import { MdSend } from "react-icons/md";
import dayjs from 'dayjs';

const socket = io.connect("http://192.168.1.50:8000")

const userName = nanoid(4);
const chat = (props) => {
	const [message, setMessage] = useState("");
	const [size, setSize] = useState(1);
	const [chat, setChat] = useState([]);
	const name = props.name;
	const url = props.profile;
	const messageRef = useRef(null)

	const sendChat = (e) => {
		const time = dayjs(new Date()).format("h:mm A");
		// console.log("message=> ",message);
		e.preventDefault()
		socket.emit("chat", { message, userName, time, name, url })
		setMessage('')
		setSize(1);
		console.log(`chat =>${chat}`);
	}
	useEffect(() => {
		socket.on("chat", (payload) => {
			setChat([...chat, payload])
			// { console.log("payload =>> ", [...chat, payload]) }
		})
		messageRef.current?.scrollIntoView();
	}, [chat])

	useEffect(() => {
		// console.log(message);
		message.length == 0 && setSize(1)
	}, [message])
	const textAreaReSize = () => {
		if (size < 3) setSize(size + 1);
	}
	

	return (
		<>
			<div className='main'>
				<section className='header'>
					<div className='main-header'>
						<div ><img className='logo' src ={props.profile}/></div>
						<div><strong>{props.name}</strong></div>
					</div>
					<div className='sub-header'>
						{message !== "" ? 'Typing ...' : "Type your Message"}
					</div>
				</section>
				<section className='message'>

					{chat.map((payload, index) => {
						
						return (
							<div key={index} className=''>
								{payload.userName === userName
									?
									<div className=' myMessageFull'>
										{/* <div><FaUserTie /></div> */}
										<div><img className='messageLogo' src ={props.profile}/></div>
										<div
											className='messageData'
										// style={{width:{payload.message.length }}}
										>
											{payload.message}
											<span className='messageTime'>{payload.time}</span>
										</div>
									</div>
									:
									<div className='messageFull'>
										{/* <div><FaUserTie /></div> */}
										<div><img className='messageLogo' src={payload.url}/></div>
										<div
											className='messageData'
										>
											{payload.message}
											<span className='messageTime'>{payload.time}</span>
										</div>
									</div>
								}

							</div>
							// <p key={index}>{payload.userName} <span> {payload.message}</span></p>
							// <p key={index}><FaUserTie /> <span className='messageData'> {payload.message}</span></p>
						)
					})}
					<div ref={messageRef} />
				</section>
				<section className='footer'>
					<div > {/**style={{ width: '800px' }} */}
						<Form onSubmit={sendChat} className='fromClass'>
							{/* <input
								type="text"
								name="chat"
								value={message}
								onChange={(e) => { setMessage(e.target.value) }}
							/> */}
							{/* <div style={{ display: '' }}> */}
							<div style={{width:'80%'}}>
								<Form.Control
									as="textarea"
									value={message}
									onChange={(e) => { setMessage(e.target.value) }}
									placeholder="Message"
									rows={size}
									style={{ borderRadius: '2rem', resize:'none' }}
									onKeyDown={(e) => { e.key == "Enter" && textAreaReSize() }}
								/>
							</div>
							<div className='footerButton' >
								<Button variant='success' type='submit' disabled={message == "" ? true : false}><MdSend /></Button>
							</div>
							{/* </div> */}

						</Form>
					</div>
				</section>
			</div>
			{/* <div>
				<Form>
					<Form.Control
						as="textarea"
						value={message}
						onChange={(e) => { setMessage(e.target.value) }}
						placeholder="Enter your message here"
						rows={size}
						style={{ borderRadius: '2rem', position: 'sticky' }}
						onKeyDown={(e) => { e.key == "Enter" && textAreaReSize() }}
					/>

				</Form>
			</div> */}
			{/* {chat.map((payload, index)=>{
				return(
					<p key={index}>{payload.message}: <span>id: {payload.userName}</span></p>
				)
			})} */}
			{/* <form onSubmit={sendChat}>
				<input
					type="text"
					name="chat"
					value={message}
					onChange={(e) => { setMessage(e.target.value) }}
				/>
				<button type='submit'>send</button>
			</form> */}
		</>
	);
}

export default chat;
