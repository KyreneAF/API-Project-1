
//THIS IS THE CODE GIVEN BY THE READING REFACTORED CODE IS BELOW IT DIDNT WORK WELL THOUGH
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';

// import LoginFormPage from './components/LoginFormPage/LoginFormPage'; removed because we are creating a modal
// import SignupFormPage from './components/SignupFormPage/SignupFormPage';

import { Splash } from './components/Splash/Splash';
import { SpotDetails } from './components/SpotDetails/SpotDetails';
import {CreateSpot} from './components/CreateSpot/CreateSpot';
import {ManageSpots} from './components/ManageSpots/ManageSpots';
import {NotFound} from './components/NotFound/NotFound';
import { UpdateSpot } from './components/UpdateSpot/UpdateSpot';
import Navigation from './components/Navigation/Navigation';

import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>

      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Splash />
      },
      {
        path:'/spots/new',
        element: < CreateSpot />

      },
      {
        path: '/spots/:id/edit',
        element:<UpdateSpot />
      },
      {
        path: '/spots/current',
        element:<ManageSpots />
      },

      {
        path: '/spots/:id',
        element:<SpotDetails />
      },


      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

function App() {
  return(
    <>

     <RouterProvider router={router} />

    </>

  )

}

export default App;







// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { Outlet,BrowserRouter,Routes,Route } from 'react-router-dom';
// // import LoginFormPage from './components/LoginFormPage/LoginFormPage'; removed because we are creating a modal
// // import SignupFormPage from './components/SignupFormPage/SignupFormPage';
// import Navigation from './components/Navigation/Navigation';
// import {Header} from './components/Header'
// import * as sessionActions from './store/session';




// function Layout() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => {
//       setIsLoaded(true)
//     });
//   }, [dispatch]);

//   return (
//     <>
//       <Navigation isLoaded={isLoaded} />
//       {isLoaded && <Outlet />}
//     </>
//   );
// }

// function App(){
//   return (
//     <>
//     <BrowserRouter>
//       <Routes>
//       <Route
//           path="/"
//           element={
//             <>
//               <Header />
//               <Outlet />
//             </>
//           }
//         >
//           <Route index element={<Layout />} />
//           {/* Other routes... */}
//         </Route>
//       </Routes>
//     </BrowserRouter>

//     </>
//   )
// }

// export default App;
