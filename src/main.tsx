import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout";
import RegisterLoginPage from "./components/Register&LoginPage/RegisterLoginPage";

import Home from './components/home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<RegisterLoginPage />} />
      <Route path="home" element={<Home />} />
      <Route path="productDetails" element={<ProductDetails />} />
    </Route>
  )
);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />{" "}
  </StrictMode>,
)
