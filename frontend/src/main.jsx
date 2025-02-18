import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { SnackbarProvider } from 'notistack';
import ChatProvider from './context/ChatProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <ChatProvider>
    <SnackbarProvider maxSnack={3}>
    <App />
    </SnackbarProvider>
    </ChatProvider>
    </BrowserRouter>
)
