import {useState, useEffect} from "react";
import axios from "axios";
import ProductForm from "./ProductForm";

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
    
    //useEffect
    useEffect(() => {
        handleProductDB();
    }, [postResponse]);

    //Handlers
    //Get Data
    const handleProductDB = async () => { 
        try {
            const response = await axios.get("http://localhost:3000/product");
            console.log(response);
            setProductData(response);
        } catch (error) {
            console.log(error.message);
        }
    };

    // handle to the submission of data 
    const handleOnSubmit= async () => {
        e.preventDefault();
        try{
            await axios
                .post("http://localhost:3000/product", formData)
                .then((response) => setPostResponse(response.data.message)).then(() => setFormData({
                    name: "",
                    brand: "",
                    image: "",
                    price: ""
                }));
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
            />
        </div>

    )
}