export default function ProductForm({name, brand, image, price, handleOnSubmit, handleOnChange, isEdit}){
    
    return 
       ( 
       <div className="ProductForm">
            <form onSubmit={handleOnSubmit}>
                {/*Name*/}
                <label htmlFor="name">Name: </label>
                <input
                  type ="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={handleOnChange}
                  placeholder="Enter a Name"
                  required
                />
                <br/>
                {/*Brand*/}
                <label htmlFor="brand">Brand: </label>
                <input
                  type ="text"
                  name="brand"
                  id="brand"
                  value={brand}
                  onChange={handleOnChange}
                  placeholder="Enter the brand"
                  required
                />
                {/*Image*/}
                <label htmlFor="image">Image: </label>
                <input
                  type ="text"
                  name="image"
                  id="image"
                  value={image}
                  onChange={handleOnChange}
                  placeholder="Enter an image URL"
                  required
                />
                {/*Price*/}
                 <label htmlFor="price">Price: </label>
                <input
                  type ="text"
                  name="price"
                  id="price"
                  value={price}
                  onChange={handleOnChange}
                  placeholder="Enter price"
                  required
                />
                <button>{isEdit? "Editing" : "Submit"}</button>
            </form>
        </div>
        )
}