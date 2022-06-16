import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import { TaskProvider } from './context/TodoContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TaskProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TaskProvider>
)
