import React from 'react';
import { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [sortBy, setSortBy] = useState("");

  const getOrders = async () => {
    const response = await fetch(
      "http://localhost:4000/orders/vieworders",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    const data = await response.json();

    if (data.success) {
      setOrders(data.orders);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);



  const cancelOrder = async (id) => {

    const response = await fetch(
      `http://localhost:4000/orders/cancelorder/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      getOrders();
    }
  };

  let sortedOrders = [...orders];

if (sortBy === "new") {

    sortedOrders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

}

if (sortBy === "old") {

    sortedOrders.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

}
  return (
    <>

      <div>

        <h1>My Orders</h1>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="new">Newest First</option>
          <option value="old">Oldest First</option>
        </select>

        <br />
        <br />

     {sortedOrders.map((order) => (

          <div key={order._id}>

            <h3>Total : ₹{order.totalPrice}</h3>

            <p>Status : {order.status}</p>

            {order.products.map((item) => (

              <div key={item._id}>

                <h4>{item.product.productName}</h4>

                <p>Quantity : {item.quantity}</p>

                <button onClick={() => cancelOrder(order._id)}>
                  Cancel Order
                </button>

              </div>

            ))}

          </div>

        ))}

      </div>
    </>
  )
}

export default Orders
