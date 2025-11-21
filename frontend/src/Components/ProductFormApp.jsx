import {useState, useEffect} from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import ProductsContainer from "./ProductsContainer";

export default function ProductFormApp(){

    //States
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
    }

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

    //Render
    return (
        <div>
            <ProductForm 
            name={formData.name} 
            brand={formData.brand} 
            image={formData.image} 
            price={formData.price} 
            handleOnSubmit={handleOnSubmit} 
            handleOnChange={handleOnChange}
            isEdit={isEdit}
            />
            <p style={{color: "green"}}>{postResponse}</p>
            <ProductsContainer
            handleOnDelete={handleOnDelete}
            handleOnEdit={handleOnEdit}
            />
        </div>

    )
}