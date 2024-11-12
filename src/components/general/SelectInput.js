import React from 'react';
import './general.css';

// This component is used to create a dropdown select input with customizable options and value
export default function SelectInput({ label, options, className, value, setValue }) {

    // Function to handle the selection change and update the state with the selected value
    const handleSelect = (event) => {
        setValue(event.target.value);  // Update the value based on user selection
    }

    return (
        // Wrapper for the select input field, with an optional additional className for customization
        <div className={`select-wrapper ${className}`}>

            {/* Conditionally render the label if it's provided */}
            {label && <label>{label}Sort:</label>}

            {/* The select dropdown to choose from available options */}
            <select value={value} onChange={handleSelect}>

                {/* Map through the options array and create <option> elements */}
                {options.map((option, index) => (
                    <React.Fragment key={index}>
                        {/* Each <option> is set to the current value from the 'options' array */}
                        <option value={option.value}>
                            Default
                        </option>
                        <option value={option.value}>
                            Latest
                        </option>
                        <option value={option.value}>
                            Oldest
                        </option>
                        <option value={option.value}>
                            Highest Rated
                        </option>
                        <option value={option.value}>
                            Lowest Rated
                        </option>
                    </React.Fragment>
                ))}
            </select>
        </div>
    );
}