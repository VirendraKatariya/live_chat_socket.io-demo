import { useState } from 'react'
import Chat from './component/chat';

function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="App">
			<Chat />
		</div>
	)
}

export default App
