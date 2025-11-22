import { useState, useEffect } from "react";
import axios from "axios";
import CartContainer from "./CartContainer";
import ProductFormApp from "./ProductFormApp";
import ProductsContainer from "./ProductsContainer";
import ProductForm from "./ProductForm";
import NavBar from "./NavBar";

export default function GroceriesAppContainer({ products }) {
  const [productQuantity, setProductQuantity] = useState(
    products.map((product) => ({ id: product.id, quantity: 0 }))
  );
  
  //States
    const [cartList, setCartList] = useState([]);
    const [productData, setProductData] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        image: "",
        price: ""
    });
    const[postResponse, setPostResponse] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    
    //useEffect
    useEffect(() => {
        handleProductDB();
    }, [postResponse]);

  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleAddToCart = (productId) => {
    const product = products.find((product) => product.id === productId);
    const pQuantity = productQuantity.find(
      (product) => product.id === productId
    );
    const newCartList = [...cartList];
    const productInCart = newCartList.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }
    setCartList(newCartList);
  };

  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter((product) => product.id !== productId);
    setCartList(newCartList);
  };

  const handleClearCart = () => {
    setCartList([]);
  };

     //Handle the editing of one product by its id 
    const handleOnEdit = async(id) => {
        try{
            const productToEdit = await axios.get(`http://localhost:3000/product/${id}`);
            console.log(contactToEdit);
            setFormData({
                name: contactToEdit.data.name,
                brand: contactToEdit.data.brand,
                image: contactToEdit.data.image,
                price: contactToEdit.data.price
            })
            setIsEdit(true);
        }catch (error){
            console.log(error);
        }
    };
  //Handlers
    //Get Data
    const handleProductDB = async () => { 
        try {
            const response = await axios.get(`http://localhost:3000/product`);
            //console.log(response);
            setProductData(response);
        } catch (error) {
            console.log(error.message);
        }
    };

    //Handle to reset the form 
    const handleResetForm = () => {
        setFormData({
                    name: "",
                    brand: "",
                    image: "",
                    price: ""
                })
    }
    // handle to the submission of data 
    const handleOnSubmit= async () => {
        e.preventDefault();
        try{
            if (isEdit){
                handleOnUpdate(formData.id);
                handleResetForm();
                setIsEdit(false);
            }else
            {await axios
                .post(`http://localhost:3000/product`, formData)
                .then((response) =>
                    { setPostResponse(response.data.message);
                      console.log(response);
                    })
                .then(() => handleResetForm() )};
        }catch (error){
            console.log(error.message);
        }
    };

    //handle the onChange event for the form 
    const handleOnChange = (e) => {
        setFormData((prevData) => {
            return {...prevData, [e.target.name]: e.target.value};
        });
    };

    //Handle the delete on contact by id
    const handleOnDelete = async (id) => {
        try{
            const response = await axios.delete(`http://localhost:3000/product/${id}`);
            setPostResponse(response.data.message);
        }catch(error){
            console.log(error.message);
        }
    };

//Handle updating the API patch route
    const handleOnUpdate = async (id) => {
        try {
            const result = await axios.patch(
                `http://localhost:3000/product/${id}`,
                formData
            );
            setPostResponse(result.data.message);
        }catch (error){
            console.log(error);
        }
    };

// Render
  return (
    <div>
      <NavBar quantity={cartList.length} />
      <div className="GroceriesApp-Container">
        <ProductsContainer
          products={products}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={productQuantity}
        />
          <p style={{color: "green"}}>{postResponse}</p>
            <ProductsContainer
            handleOnDelete={handleOnDelete}
            handleOnEdit={handleOnEdit}
            />
        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
        <ProductForm 
            name={formData.name} 
            brand={formData.brand} 
            image={formData.image} 
            price={formData.price} 
            handleOnSubmit={handleOnSubmit} 
            handleOnChange={handleOnChange}
            isEdit={isEdit}
            />

      </div>
    </div>
  );
}
