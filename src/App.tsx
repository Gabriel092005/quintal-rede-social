import { RouterProvider } from 'react-router-dom'
import './global.css'
import { router } from './routes'
import {Helmet,HelmetProvider} from 'react-helmet-async'
import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { ThemeProvider } from './components/theme/theme-provider'
// import {HealthStatusProvider } from './context/HealthContextProvider'



export function App() {
  return(
    <HelmetProvider>
      <Helmet titleTemplate='%s | pna.angola'/>
        <Toaster richColors/>
      <ThemeProvider storageKey="vite-ui-theme" defaultTheme="system">
      <QueryClientProvider client={queryClient}>
           <RouterProvider router={router}/>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
  )
}


