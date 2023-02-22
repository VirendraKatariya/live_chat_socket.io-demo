import { useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import Chat from './component/chat';
import ChatList from './component/chatList';

const image = [
	"https://picsum.photos/id/1006/200/300",
	"https://picsum.photos/id/1011/200/300",
	"https://picsum.photos/id/1027/200/300",
	"https://picsum.photos/id/1074/200/300",
	"https://picsum.photos/id/433/200/300",
	"https://picsum.photos/id/447/200/300",
	"https://picsum.photos/id/593/200/300",
	"https://picsum.photos/id/64/200/300",
	"https://picsum.photos/id/823/200/300.jpg?hmac=Sv69FIuXkj79IVp4uZ1YpgRHDGP0jadf5nSiTx1xSoo",
];
function App() {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [profile, setProfile] = useState("")

	const saveHandler = () => {
		name !== "" && profile !== "" && setOpen(true)
	}
	return (
		<div className="App" style={{}}>
			{!open && <div>
				<Form>
					<Form.Control
						type="text"
						value={name}
						onChange={(e) => { setName(e.target.value) }}
						placeholder="Enter your full name"
						style={{ borderRadius: '2rem', resize: 'none', marginBottom: '1rem' }}
					/>
					{/* <Form.Label>Select profile picture</Form.Label> */}
					<div style={{ display: 'flex', flexWrap: 'wrap' }}>
						{image.map((url) => {
							console.log(url);
							return <div>
								<img style={{ width: '100px', padding: "5px" }} src={url} alt="not found" />
								<Form.Check
									inline
									label=""
									name="check"
									value={url}
									type="radio"
									onClick={() => { setProfile(url) }}
								// id={`inline-${type}-1`}
								/>

							</div>
						})}
					</div>
					<Button variant='success' type='submit' onClick={() => saveHandler()} >SAVE</Button>
				</Form>
			</div>}
			<div style={{display:'flex'}}>
				{open && <Chat name={name} profile={profile} open={open} setOpen={setOpen} />}
				{/* {open && <ChatList open={open} setOpen={setOpen} name={name} profile={profile}/>} */}
			</div>
		</div>
	)
}

export default App
