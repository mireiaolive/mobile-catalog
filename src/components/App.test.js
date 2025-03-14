import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { Navbar } from "./Navbar";
import { CartProvider } from "../context/CartContext";

describe("Probando <App/>", () => {
    test("renderiza el componente home en la ruta /", () => {
        render(<App />);
    });

    test("renderiza el logo en el navbar", () => {
        render(
            <MemoryRouter>
                <CartProvider>
                    <Navbar />
                </CartProvider>
            </MemoryRouter>
        );
        const logo = screen.getByAltText("Logo");
        expect(logo).toBeInTheDocument();
    });
});
