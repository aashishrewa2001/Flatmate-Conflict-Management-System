// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './context/AuthContext.jsx' // Import AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Wrap entire app */}
      <App />
    </AuthProvider>
  </StrictMode>,
);
