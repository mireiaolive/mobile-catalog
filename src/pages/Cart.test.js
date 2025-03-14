import { render, screen } from "@testing-library/react";
import { Cart } from "./Cart";
import { CartProvider } from "../context/CartContext";
import { MemoryRouter } from "react-router-dom";

describe("Probando componente <Cart/>", () => {
    test("debe mostrar el título 'CART' en el componente", () => {
        render(
            <CartProvider>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </CartProvider>
        );

        expect(
            screen.getByRole("heading", { name: /CART/i })
        ).toBeInTheDocument();
    });
});
