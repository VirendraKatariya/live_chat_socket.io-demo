import React, { useEffect, useState } from 'react';
import { MdSend } from "react-icons/md";
import io from 'socket.io-client';
import Chat from './chat'

const socket = io.connect("http://192.168.1.50:8000")

let listArray = [];
const chatList = (props) => {
	const [chat, setChat] = useState([]);
	const [chatOpen, setChatOpen] = useState([]);

	useEffect(() => {
		socket.on("chat", (payload) => {
			setChat([...chat, payload])
			listArray = [
				...new Map([...chat, payload].map((item) => [item["userName"], item])).values(),
			];
			{ console.log("payload =>> ", [...chat, payload]) }
		})
		
	}, [chat])
	console.log("listArray => ",listArray);


	return (
		<div >
			<div>
				{chatOpen && <Chat name={props.name} profile={props.profile} open={open} setChatOpen={setChatOpen}/>}
			</div>
			<div style={{background:'#c7c4c4', width:"400px"}}>
			<MdSend onClick={()=>props.setOpen(false)}/>
				{/* <table>
					<thead><div><MdSend onClick={()=>props.setOpen(false)}/></div></thead>
					<tbody> */}
					{listArray.map((payload, index) => {
						// {!listArray.includes(payload.userName) && 
						// <>
						// 	{listArray.push(payload.userName)},
							// {console.log(payload.userName)}
						// </>}
						// return (
							return (<div onClick={()=>{console.log(payload.userName)}}>{<img className='logo' src={payload.url}/>} {payload.name} </div>)
						// )
					})}
					{/* </tbody>
				</table> */}
			</div>
		</div>
	);
}

export default chatList;
