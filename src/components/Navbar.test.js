import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";
import { CartProvider } from "../context/CartContext";
import { BrowserRouter } from "react-router-dom";

const renderNavbar = () => {
    render(
        <CartProvider>
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        </CartProvider>
    );
};

describe("Probando <Navbar/>", () => {
    test("renderiza el icono del carrito navbar", () => {
        renderNavbar();
        const cartIcon = screen.getByText("🛒");
        expect(cartIcon).toBeInTheDocument();
    });

    test("muestra la cantidad de ítems en el carrito correctamente", () => {
        renderNavbar();

        const cartItemCount = screen.getByText("0");
        expect(cartItemCount).toBeInTheDocument();
    });
});
