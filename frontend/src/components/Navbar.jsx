import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {

        localStorage.removeItem("token");

        alert("Logout Successful");

        navigate("/login");

    };

    return (

        <nav
            style={{
                display: "flex",
                gap: "20px",
                padding: "20px",
                borderBottom: "1px solid black"
            }}
        >

            <Link to="/">Home</Link>

            <Link to="/addproduct">Add Product</Link>

            <Link to="/cart">Cart</Link>

            <Link to="/orders">Orders</Link>

            {

                token ? (

                    <button onClick={handleLogout}>
                        Logout
                    </button>

                ) : (

                    <>
                        <Link to="/login">Login</Link>

                        <Link to="/register">Register</Link>
                    </>

                )

            }

        </nav>

    );
}

export default Navbar;