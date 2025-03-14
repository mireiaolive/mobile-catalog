import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { InputSearch } from "../components/InputSearch";

export const Home = () => {
    const {
        data: phones,
        loading,
        error,
    } = useFetch(
        "https://prueba-tecnica-api-tienda-moviles.onrender.com/products"
    );

    const [search, setSearch] = useState("");

    if (loading) return <p>Cargando teléfonos...</p>;
    if (error) return <p>Error al obtener datos: {error}</p>;

    const filteredPhones = phones
        ?.filter(
            (phone) =>
                phone.name.toLowerCase().includes(search.toLowerCase()) ||
                phone.brand.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 20);

    return (
        <div className="container">
            <InputSearch initialValue={search} onSearch={setSearch} />
            <p className="phone-name">{filteredPhones.length} Results</p>
            <div className="phones-grid">
                {filteredPhones.length > 0 ? (
                    filteredPhones.map((phone, index) => {
                        const { name, id, brand, imageUrl, basePrice } = phone;
                        return (
                            <div className="phone-card" key={`${id}-${index}`}>
                                <Link to={`/phone/${id}`}>
                                    <img src={imageUrl} alt={name} />
                                </Link>
                                <p className="phone-brand">{brand}</p>
                                <div className="phone-info">
                                    <p className="phone-name">{name}</p>
                                    <p className="phone-price">
                                        {basePrice} EUR
                                    </p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No se encontraron resultados.</p>
                )}
            </div>
        </div>
    );
};
