import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GrabacionContainer from './Components/GrabacionContainer.jsx';


const router = createBrowserRouter([
      {
        path: "/",
        element: <App /> ,
      },
      {
        path: "/grabaciones/:titulo/:id",
        element:  <GrabacionContainer/>,
      },
    
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <RouterProvider router={ router }   />

  </React.StrictMode>,
)
