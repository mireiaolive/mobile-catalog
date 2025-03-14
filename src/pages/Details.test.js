import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Details } from "../pages/Details";
import { CartProvider } from "../context/CartContext";

jest.mock("../hooks/useFetch", () => ({
    useFetch: (url) => {
        if (url.includes("products/")) {
            return {
                data: {
                    id: "1",
                    name: "iPhone 13",
                    brand: "Apple",
                    basePrice: 999,
                    specs: {
                        screen: "6.1 inches",
                        resolution: "2532x1170",
                        processor: "A15 Bionic",
                    },
                    storageOptions: [{ capacity: "128GB", price: 999 }],
                    colorOptions: [
                        {
                            hexCode: "#000000",
                            imageUrl:
                                "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.png",
                        },
                    ],
                },
            };
        }
        return { data: [] };
    },
}));
describe("Probando <Details/>", () => {
    test("debe mostrar el nombre y la marca del dispositivo", () => {
        render(
            <CartProvider>
                <MemoryRouter>
                    <Details />
                </MemoryRouter>
            </CartProvider>
        );

        expect(
            screen.getByText("iPhone 13", { selector: ".phone-name" })
        ).toBeInTheDocument();

        expect(
            screen.getByText("Apple", { selector: "td" })
        ).toBeInTheDocument();
    });
});
