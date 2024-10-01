import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { LikeContextProvider } from './context/LikeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
   <LikeContextProvider>
      <App />
   </LikeContextProvider>

  
 
    </BrowserRouter>
  </StrictMode>,
)
