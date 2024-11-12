import { BrowserRouter,Route,Routes} from "react-router-dom"
import Product  from "./pages/Product"
import Pricing from "./pages/Pricing"
import Homepage from "./pages/Homepage"
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login";

function App() {
  
  return (
  <div>
       {/* <h1> Hello Router !!</h1> */}
      
   <BrowserRouter>
   <Routes>
    <Route index element={<Homepage/>}/>
    <Route path="product" element={<Product/>}/>
    <Route path="pricing" element={<Pricing/>}/>
    <Route path="/login" element={<Login/>}/>
    {/* nested route */}
    <Route path="app" element={<AppLayout/>}>
    <Route index element={<p>LIST</p>}/>
    <Route path='cities' element={<p>List of Cities</p>}/>
    <Route path='countries' element={<p>Countries</p>}/>
    <Route path='form' element={<p>Form</p>}/>
    </Route>


    <Route path="/" element={<Homepage/>}/>
    <Route path="*" element={<PageNotFound/>}/>
   </Routes>
   </BrowserRouter>
  </div>
   
  );
}

export default App
