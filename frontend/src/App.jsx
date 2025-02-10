import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import * as sessionActions from "./store/session";

import './index.css'

import ThermometerScreen from "./ThermometerScreen";

import { useEffect } from "react";

function Layout() {
  const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = useState(false);

  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      // .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app-div-container">
      {
        sessionUser ? (
          <>
            <header className="header">
              
            </header>
            <main className='main-zone'>
                <Outlet />
            </main>
            <footer className="footer">

            </footer>
          </>
        ) : (
          <main className='main-zone'>
            <Outlet />
          </main>
        )
      }
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