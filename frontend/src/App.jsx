import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import './index.css'

import ThermometerScreen from "./components/ThermometerScreen";
import Navigation from "./components/Navigation";

function Layout() {
  return (
    <div className="app-div-container">
      <header className="header">
        <Navigation />
      </header>
      <main className='main-zone'>
        <Outlet />
      </main>
      <footer className="footer">
          <p>© 2025 Betesda Church. Powered by <a href="https://mynameisjeffportfolio.netlify.app/">Michel Garcia Ribalta</a></p>
      </footer>
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element:
          <ThermometerScreen />
      },
    ]
  }
])

function App() {

  return <RouterProvider router={router} />
}

export default App;