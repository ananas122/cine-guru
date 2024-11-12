import React from 'react';
import './general.css';

export default function Button({ label, className, onClick, icon }) {
    return (
        // Création du bouton avec une classe CSS dynamique (className)
        <button className={`button ${className}`} onClick={onClick}>
            {/* Affichage de l'icône si elle est fournie. Le texte "Load More.." est également affiché avec l'icône */}
            {icon && <span className="icon">{icon}Load More..</span>}
            {/* Affichage du label du bouton */}
            {label}
        </button>
    );
}