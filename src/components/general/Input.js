import React from 'react';
import './general.css';

export default function Input({ label, type, className, value, setValue, icon, inputAttributes }) {
    const handleInput = (event) => {
        setValue(event.target.value);
    }

    return (
        // Wrapper for the input field, with an optional additional className for customization
        <div className={`input-wrapper ${className}`}>

            {/* Conditionally render the label if it's provided */}
            {label && <label>{label}</label>}

            <div className="input-container">

                {/* Conditionally render the icon if it's provided */}
                {icon && <span className="icon">{icon}</span>}

                {/* The input field with customizable type, value, onChange, and other attributes */}
                <input
                    type={type}                  // Sets the input type (text, number, etc.)
                    value={value}                // Sets the value of the input field
                    onChange={handleInput}       // Updates the value whenever the user types
                    {...inputAttributes}         // Allows additional input attributes to be passed in
                />
            </div>
        </div>
    );
}