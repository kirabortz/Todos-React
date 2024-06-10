import React from "react"
import "./index.css"
import App from "app/ui/App"
import { createRoot } from "react-dom/client"

import { store } from "app/model/Store"
import { Provider } from "react-redux"
import {BrowserRouter, HashRouter} from "react-router-dom"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)

root.render(
  <HashRouter>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Provider>
  </HashRouter>,
)
