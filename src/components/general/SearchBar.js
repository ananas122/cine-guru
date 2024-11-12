import React from 'react';
import './general.css';

export default function SearchBar({ title, setTitle }) {
    const handleInput = (event) => {
        setTitle(event.target.value);
    };
    return (
        <div className="search-bar">
            <input
                type="text"
                value={title}
                onChange={handleInput}
                placeholder="Search Movies"
            />
        </div>
    );
}