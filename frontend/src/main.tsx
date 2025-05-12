import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AppRoutes } from './routes/index'

// reemplazar app sustituir por AppRoutes
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes  />
  </StrictMode>,
)
