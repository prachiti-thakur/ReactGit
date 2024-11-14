import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./component/CityList";
import { useEffect, useState } from "react";
import CountryList from "./component/CountryList";
import City from "./component/City";
import Form from "./component/Form";
import { CitiesProvider } from "./contexts/citiesContext";

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />

          {/* Nested routes */}
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />

            <Route path="cities/:id" element={<City />} />

            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>

          {/* Catch-all for undefined routes */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
