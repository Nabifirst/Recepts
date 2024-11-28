import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './pages/layout/Layout'
import Home from './pages/home/home'
import ProductInfo from './pages/ProductInfo/ProductInfo';
import ProductByCategory from './pages/ProductByCategory/ProductByCategory'
import Favourite from './pages/Favourite/Favourite';
import ProductsByName from './pages/ProductsByName/ProductsByName';
import ProductByBrand from './pages/ProductByBrand/ProductByBrand';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import PersonalAccount from './pages/PersonalAccount/PersonalAccount';
function App() {
  const isRouder = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          // path:"/Home",
          element: <Home />,
        },
        {
          path: "/ProductInfo/:id",
          element: <ProductInfo />,
        },
        {
          path: "/ProductByCategory/:id",
          element: <ProductByCategory />,
        },
        {
          path: "/Favourite",
          element: <Favourite />,
        },
        {
          path: "/ProductsByName/:Name",
          element: <ProductsByName />,
        },
        {
          path: "/ProductByBrand/:id",
          element: <ProductByBrand />,
        },

      ],
    },
    {
      path: "/CreateAccount",
      element: <CreateAccount />,
    },
    {
      path: "/PersonalAccount",
      element: <PersonalAccount />,
    },
  ]);
  return (<RouterProvider router={isRouder} />)
}
export default App