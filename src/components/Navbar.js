import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const Navbar = () => {
    const { cart } = useCart();
    const cartItemCount = cart.length;

    const location = useLocation();

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                <img src="/logo.png" alt="Logo" />
            </Link>
            {location.pathname !== "/cart" && (
                <div className="navbar-cart">
                    <Link to="/cart" className="cart-link">
                        <i className="cart-icon">🛒</i>
                        <span className="cart-item-count">
                            {cartItemCount > 0 ? cartItemCount : "0"}
                        </span>
                    </Link>
                </div>
            )}
        </nav>
    );
};
