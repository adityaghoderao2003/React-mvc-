import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {

    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    // Get single product
    const getSingleProduct = async () => {

        try {

            const response = await fetch(
                `http://localhost:4000/flipkart/viewproduct/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                setProductName(data.product.productName);
                setCategory(data.product.category);
                setPrice(data.product.price);
                setStock(data.product.stock);
                setDescription(data.product.description);
            }

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getSingleProduct();
    }, []);

    // Update Product
    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `http://localhost:4000/flipkart/updateproduct/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },

                    body: JSON.stringify({
                        productName,
                        category,
                        price,
                        stock,
                        description
                    })
                }
            );

            const data = await response.json();

            alert(data.message);

            if (data.success) {
                navigate("/");
            }

        } catch (err) {
            console.log(err);
        }

    };

    return (

        <div>

            <h1>Edit Product</h1>

            <form onSubmit={handleUpdate}>

                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />

                <br /><br />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Update Product
                </button>

            </form>

        </div>

    );
}

export default EditProduct;