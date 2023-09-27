import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct,fetchProducts } from '../slices/ProductApi';
import AddProductModal from './ProductModal';
import Main from '../main';
import { useNavigate } from 'react-router-dom';


const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token,setToken] = useState();
  const [product,setProduct] = useState();
  const navigate=useNavigate()

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch,isModalOpen]);

  useEffect(() => {
        const tok = localStorage.getItem('jwtToken');
        setToken(tok)
    },[products])

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: error</div>;
  }

  const handleAdd = () => {
    setIsModalOpen(true); // Open the modal when the "Add Product" button is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleDelete = (id) => {
    if (window.confirm("are u sure!")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleEdit = (product) => {
    setProduct(product)
    setIsModalOpen(true);
  };
  

 
  return (
    <div className='container'>
     {token?<>
      <Main/>
       <h1 className="text-center">Product List</h1>
       <button className="btn btn-primary my-2" onClick={handleAdd}>Add Product</button>
      <div className="row">
      {isModalOpen ? (
        <AddProductModal isOpen={isModalOpen} onClose={closeModal} product={product} />):
      (products.map((product) => (
        
          <div className="col-md-3" key={product.id} style={{marginBottom:"10px"}}>
            <div className="card text-start"  >
              <img className="card-img-top" src={`data:image/jpeg;base64,${product.image}`}
              alt={product.imageName}
               />
              <div className="card-body">
                <h4 className="card-title">{product.name}</h4>
                <h4 className="card-title">{product.price}</h4>
                <p className="card-text">{product.description}</p>
                <div className="row">
              <button className="btn btn-warning col-md-6" onClick={()=>handleEdit(product)}>Edit</button>
              <button className="btn btn-danger col-md-6" onClick={()=>handleDelete(product.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
      
      )))}
      </div></>:navigate("/login")}
    </div>
     
  
  );
};

export default React.memo(ProductList);

