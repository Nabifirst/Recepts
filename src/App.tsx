import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './pages/layout/Layout'
import Home from './pages/home/home'
import ProductInfo from './pages/ProductInfo/ProductInfo';
import ProductByCategory from './pages/ProductByCategory/ProductByCategory'
import ProductsByName from './pages/ProductsByName/ProductsByName';
import ProductByBrand from './pages/ProductByBrand/ProductByBrand';
import PersonalAccount from './pages/PersonalAccount/PersonalAccount';
import Wishlist from './pages/WishList/WishList';
function App() {
  const isRouder = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
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
          path: "/WishList",
          element: <Wishlist />,
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
      path: "/PersonalAccount",
      element: <PersonalAccount />,
    },
  ]);
  return (<RouterProvider router={isRouder} />)
}
export default App