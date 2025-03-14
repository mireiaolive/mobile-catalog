import { render, act } from "@testing-library/react";
import { CartProvider, useCart } from "../context/CartContext";

const TestComponent = () => {
    const { cart, addToCart } = useCart();
    return (
        <div>
            <p data-testid="cart-length">{cart.length}</p>
            <button onClick={() => addToCart({ id: 1, name: "Producto 1" })}>
                Add
            </button>
        </div>
    );
};

describe("Probando <CartContext/>", () => {
    test("addToCart añade un producto al carrito", () => {
        const { getByText, getByTestId } = render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        expect(getByTestId("cart-length").textContent).toBe("0");

        act(() => {
            getByText("Add").click();
        });

        expect(getByTestId("cart-length").textContent).toBe("1");
    });
});
