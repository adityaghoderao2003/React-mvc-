import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Home() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();   // <-- Missing
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");


  const getProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/flipkart/viewproduct?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.success) {
        setProducts(data.allproduct);
        setTotalPages(data.totalPages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, [page]);

  const deleteProduct = async (id) => {

    const response = await fetch(
      `http://localhost:4000/flipkart/deleteproduct/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      getProducts();   // <-- This reloads the products
    }
  };

  const addToCart = async (productId) => {
    try {

      const response = await fetch(
        "http://localhost:4000/flipkart/addtocart",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },

          body: JSON.stringify({
            product: productId
          })
        }
      );

      const data = await response.json();

      alert(data.message);

    } catch (err) {
      console.log(err);
    }

  };


  //filtering 
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase())
);
  return (

    <div>

      <h1>All Products</h1>
      <input
    type="text"
    placeholder="Search Product"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>

<div style={{display : 'flex' , justifyContent : 'space-around'}}> 
      {  filteredProducts.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid white",
              margin: "15px",
              padding: "15px"
            }}
          >

            <h2>{product.productName}</h2>

            <p>Category : {product.category}</p>

            <p>Price : ₹{product.price}</p>

            <p>Stock : {product.stock}</p>

            <p>{product.description}</p>

            <button onClick={() => navigate(`/edit/${product._id}`)}>
              Edit
            </button>

            <button onClick={() => deleteProduct(product._id)}>
              Delete
            </button>
            

            <button onClick={() => addToCart(product._id)}>
              Add to Cart
            </button>

          </div>

))

}
</div>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span style={{ margin: "0 15px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

    </div>

  );
}

export default Home;