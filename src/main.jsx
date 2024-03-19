import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx'
import { ThemeProvider } from './context/theme-provider.jsx'
import { PWAProvider } from '@/context/PWAProvider.jsx'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'




      const queryClient = new QueryClient()

     

ReactDOM.createRoot(document.getElementById('root')).render(

  



  
  


        <ThemeProvider>
  <BrowserRouter>
          <AuthProvider>

          
<PWAProvider>
        
 <QueryClientProvider client={queryClient}>

          <App />
          <ReactQueryDevtools/>
</QueryClientProvider>
</PWAProvider>

          
        </AuthProvider>
</BrowserRouter>
              </ThemeProvider>
  


     
      
    

   
  
)
