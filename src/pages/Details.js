import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export const Details = () => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [updatedPrice, setUpdatedPrice] = useState(null);

    const { id } = useParams();

    const { data: phone } = useFetch(
        `https://prueba-tecnica-api-tienda-moviles.onrender.com/products/${id}`
    );

    const { data: phonesList } = useFetch(
        `https://prueba-tecnica-api-tienda-moviles.onrender.com/products`
    );

    const { addToCart } = useCart();

    useEffect(() => {
        if (selectedStorage) {
            setUpdatedPrice(selectedStorage.price);
        }
    }, [selectedStorage]);

    if (!phone) return <p>Teléfono no encontrado.</p>;

    const {
        name,
        brand,
        basePrice,
        storageOptions,
        colorOptions,
        specs,
        description,
    } = phone;

    const phoneImage = phonesList?.find((p) => p.id === id)?.imageUrl;

    const imageUrlToUse = selectedColor ? selectedColor.imageUrl : phoneImage;

    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    const handleStorageClick = (storage) => {
        setSelectedStorage(storage);
    };

    console.log("Datos phone:", phone);

    const handleAddToCart = () => {
        if (selectedColor && selectedStorage) {
            addToCart({
                ...phone,
                selectedColor,
                selectedStorage,
                price: updatedPrice || basePrice,
            });
        }
    };

    const isButtonDisabled = !selectedColor || !selectedStorage;

    return (
        <>
            <Link to="/" className="back-link">
                <span className="back-arrow">{"<"}</span>
                <span className="back-text">BACK</span>
            </Link>
            <div className="details-specifications-container">
                <div className="details-container">
                    <img
                        src={imageUrlToUse}
                        alt={name}
                        className="phone-image"
                    />
                    <div className="details-info">
                        <div className="phone-info-details">
                            <p className="phone-name">{name}</p>
                            <p className="phone-price">
                                From {updatedPrice || basePrice} EUR
                            </p>
                        </div>
                        <p className="storage-label">
                            STORAGE ¿HOW MUCH SPACE DO YOU NEED?
                        </p>
                        <div className="storage-options">
                            {storageOptions?.map((storage) => (
                                <p
                                    key={storage.capacity}
                                    className={`storage-option ${
                                        selectedStorage?.capacity ===
                                        storage.capacity
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() => handleStorageClick(storage)}
                                >
                                    {storage.capacity}
                                </p>
                            ))}
                        </div>
                        <p className="storage-label">
                            COLOR. PICK YOUR FAVOURITE.
                        </p>
                        <div className="color-options">
                            {colorOptions?.map((color) => (
                                <div
                                    key={color.hexCode}
                                    className={`color-box ${
                                        selectedColor?.hexCode === color.hexCode
                                            ? "selected"
                                            : ""
                                    }`}
                                    style={{ backgroundColor: color.hexCode }}
                                    onClick={() => handleColorClick(color)}
                                ></div>
                            ))}
                        </div>

                        <button
                            className={`add-button ${
                                isButtonDisabled ? "disabled" : ""
                            }`}
                            onClick={handleAddToCart}
                            disabled={isButtonDisabled}
                        >
                            Añadir
                        </button>
                    </div>
                </div>

                <div className="specifications">
                    <p>SPECIFICATIONS</p>
                    <table className="specifications-table">
                        <tbody>
                            <tr>
                                <td>BRAND</td>
                                <td>{brand}</td>
                            </tr>
                            <tr>
                                <td>NAME</td>
                                <td>{name}</td>
                            </tr>
                            <tr>
                                <td>DESCRIPTION</td>
                                <td>{description}</td>
                            </tr>
                            <tr>
                                <td>SCREEN</td>
                                <td>{specs?.screen}</td>
                            </tr>
                            <tr>
                                <td>RESOLUTION</td>
                                <td>{specs?.resolution}</td>
                            </tr>
                            <tr>
                                <td>PROCESSOR</td>
                                <td>{specs?.processor}</td>
                            </tr>
                            <tr>
                                <td>MAIN CAMERA</td>
                                <td>{specs?.mainCamera}</td>
                            </tr>
                            <tr>
                                <td>SELFIE CAMERA</td>
                                <td>{specs?.selfieCamera}</td>
                            </tr>
                            <tr>
                                <td>BATTERY</td>
                                <td>{specs?.battery}</td>
                            </tr>
                            <tr>
                                <td>OS</td>
                                <td>{specs?.os}</td>
                            </tr>
                            <tr>
                                <td>SCREEN REFRESH RATE</td>
                                <td>{specs?.screenRefreshRate}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="similar-items-container">
                    <p className="similar-item-title">SIMILAR ITEMS</p>
                    <div className="similar-items-list">
                        {phonesList?.map((item, index) => (
                            <div
                                className="similar-item"
                                key={`${item.id}-${index}`}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="similar-item-image"
                                />
                                <p className="similar-item-brand">
                                    {phone.brand}
                                </p>
                                <div className="similar-item-container">
                                    <p>{phone.name}</p>
                                    <p>{phone.basePrice} EUR</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
