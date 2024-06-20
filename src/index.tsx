import React from 'react'
import './index.css'
import App from 'app/ui/App'
import { createRoot } from 'react-dom/client'

import { store } from 'app/model/Store'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
)
