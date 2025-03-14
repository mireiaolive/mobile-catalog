import { useState } from "react";

export const InputSearch = ({ initialValue, onSearch }) => {
    const [search, setSearch] = useState(initialValue || "");

    const handleChange = (e) => {
        setSearch(e.target.value);
        onSearch(e.target.value);
    };

    const handleClear = () => {
        setSearch("");
        onSearch("");
    };

    return (
        <div className="input-container">
            <input
                className="input-search"
                type="text"
                placeholder="Search for a smartphone..."
                value={search}
                onChange={handleChange}
            />
            {search && (
                <button className="clear-search" onClick={handleClear}>
                    &#10005;
                </button>
            )}
        </div>
    );
};
