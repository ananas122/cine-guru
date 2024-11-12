import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    // Fonction pour récupérer les films de l'API TMDb
    const fetchMovies = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
                params: {
                    api_key: process.env.REACT_APP_TMDB_API_KEY,
                    language: 'en-US',
                    page: 1,
                },
            });
            setMovies(response.data.results);
        } catch (err) {
            setError('Erreur lors de la récupération des films');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className="movie-list">
            {error && <p>{error}</p>}
            {movies.length > 0 ? (
                movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            ) : (
                <p>Aucun film trouvé</p>
            )}
        </div>
    );
};

export default MovieList;
