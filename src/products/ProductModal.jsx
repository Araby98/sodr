import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../slices/ProductApi';

const AddProductModal = ({  onClose , product}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image,setImage]=useState("");


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!product) {
  //       dispatch(createProduct({ name, description, price, image }));
  //       onClose(); 
  //   } else {
  //     dispatch(updateProduct({ id:product.id,name:name, description:description, price:price, image:image }));
  //     onClose(); 
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProductData = {
      id: product ? product.id : null, 
      name:name?name:product.name, 
      description:description?description:product.description,
      price:price?price:product.price,
      image:image?image:product.image,
    };
  console.log("updatedProductData",updatedProductData)
    if (!product) {
      // Creating a new product
      dispatch(createProduct(updatedProductData));
    } else {
      // Updating an existing product
      dispatch(updateProduct(updatedProductData));
    }
  
    onClose(); // Close the modal after submission
  };

  return (
    <div  tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Product</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" defaultValue={product?product.name:" "} onChange={(e)=>{setName(e.target.value)}} 
                className="form-control" required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea  name="description"  defaultValue={product?product.description:" "}  onChange={(e)=>{setDescription(e.target.value)}}
                  className="form-control" required ></textarea>
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" name="price"  defaultValue={product?product.price:" "}  onChange={(e)=>{setPrice(e.target.value)}}
                  className="form-control" required />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input type="file"  accept="image/*" onChange={(e)=>{setImage(e.target.files[0])}}
                  className="form-control-file" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}> Close </button>
              <button type="submit" className="btn btn-primary"> {product?"Update Product":"Add Product"} </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
