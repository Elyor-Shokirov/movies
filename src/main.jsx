import { createRoot } from 'react-dom/client'
import App from './components/app/app.jsx'
import './styles/index.scss'
createRoot(document.getElementById('root')).render(
	// <StrictMode>
	<App />
	// </StrictMode>
)
