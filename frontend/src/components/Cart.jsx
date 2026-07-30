import { useEffect, useState } from "react";

function Cart() {

    const [cart, setCart] = useState([]);
    const [sortBy, setSortBy] = useState("");


    const getCart = async () => {
        try {
            const response = await fetch(
                "http://localhost:4000/flipkart/viewcart",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            const data = await response.json();
            console.log(data);
            // your backend returns an array
            setCart(data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getCart();
    }, []);


    const updateQuantity = async (id, quantity) => {

        if (quantity < 1) return;

        try {

            const response = await fetch(
                `http://localhost:4000/flipkart/updatecart/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ quantity })
                }
            );

            const data = await response.json();

            if (data.message) {
                getCart();
            }

        } catch (err) {
            console.log(err);
        }

    };


    const removeItem = async (id) => {

        const response = await fetch(
            `http://localhost:4000/flipkart/removecart/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        const data = await response.json();

        console.log(data);

        getCart();
    }

    const placeOrder = async () => {

        const response = await fetch(
            "http://localhost:4000/orders/placeorder",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        const data = await response.json();

        alert(data.message);

        if (data.success) {
            getCart();
        }
    };

    //sorting
    let sortedCart = [...cart];

    if (sortBy === "low") {
        sortedCart.sort(
            (a, b) => a.product.price - b.product.price
        );
    }

    if (sortBy === "high") {
        sortedCart.sort(
            (a, b) => b.product.price - a.product.price
        );
    }

    if (sortBy === "quantity") {
        sortedCart.sort(
            (a, b) => b.quantity - a.quantity
        );
    }
    return (

        <div>

            <h1>My Cart</h1>
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="">Sort By</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="quantity">Quantity</option>
            </select>

            <br />
            <br />

            {
                cart.length === 0 ?
                 (
                    <h3>Cart is Empty</h3>
                ) : 
                (
                    sortedCart.map((item) => (

                        <div key={item._id} style={{
                            border: "1px solid black",
                            padding: "15px",
                            margin: "15px"
                        }}
                        >

                            {item.product ? (

                                <>
                                    <h2>{item.product.productName}</h2>

                                    <p>Category : {item.product.category}</p>

                                    <p>Price : ₹{item.product.price}</p>

                                    <div>

                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                        >
                                            -
                                        </button>

                                        <span style={{ margin: "0 10px" }}>
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                        <br />
                                        <br />

                                        <button onClick={() => removeItem(item._id)}>
                                            Remove
                                        </button>

                                    </div>
                                </>

                            ) : (

                                <p>Product not found.</p>

                            )}

                        </div>

                    ))

                )
            }
            <button onClick={placeOrder}>
                Place Order
            </button>
        </div>


    );

}

export default Cart;