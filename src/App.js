import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductList from "./products/ListProducts";
import AddProductModal from "./products/ProductModal";
import Login from "./auth/login";
import Register from "./auth/register";

function App() {

  


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
            <Route path="/products/" >
                  <Route index element={<ProductList />} />
                  <Route path="up/:id/:ind" element={<AddProductModal />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
