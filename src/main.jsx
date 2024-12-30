import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './components/app/app.jsx'
import './styles/index.scss'
createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)
