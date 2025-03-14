import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const Cart = () => {
    const { cart, removeFromCart } = useCart();
    const navigate = useNavigate();

    return (
        <div className="cart-container">
            <h1>CART ({cart.length})</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cart.map((item, index) => (
                        <div className="cart-item" key={index}>
                            <img
                                src={item.selectedColor?.imageUrl}
                                alt={item.name}
                                className="cart-item-image"
                            />

                            <div className="cart-item-info">
                                <p className="cart-item-name">
                                    {item.name.toUpperCase()}
                                </p>
                                <p className="cart-item-storage">
                                    {item.selectedStorage?.capacity} |{" "}
                                    {item.selectedColor?.name.toUpperCase()}
                                </p>

                                <p className="cart-item-price">
                                    {item.price} EUR
                                </p>

                                <button
                                    className="remove-from-cart"
                                    onClick={() => removeFromCart(item)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="cart-actions">
                <button
                    className="continue-shopping"
                    onClick={() => navigate("/")}
                >
                    Continue Shopping
                </button>
                {cart.length > 0 && (
                    <div className="cart-total">
                        <p>
                            TOTAL{" "}
                            {cart.reduce((acc, item) => acc + item.price, 0)}{" "}
                            EUR
                        </p>
                        <button className="pay">Pay</button>
                    </div>
                )}
            </div>
        </div>
    );
};
