import React from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import './index.css'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
