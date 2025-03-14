import { render, screen } from "@testing-library/react";
import { Home } from "./Home";
import { useFetch } from "../hooks/useFetch";

jest.mock("../hooks/useFetch");

describe("Probando <Home/>", () => {
    test("debe mostrar el mensaje de carga de datos", () => {
        useFetch.mockReturnValue({
            data: null,
            loading: true,
            error: null,
        });

        render(<Home />);

        expect(screen.getByText("Cargando teléfonos...")).toBeInTheDocument();
    });
});
