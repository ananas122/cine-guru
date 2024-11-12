import React, { useState, useEffect } from 'react';
import './movies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import cinemaImg from '../../assets/cinemaimg.png';
import Image from './Image';

const MovieCard = () => {
    const [movies, setMovies] = useState([]); // All movies fetched from API
    const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering
    const [filteredMovies, setFilteredMovies] = useState([]); // Filtered movies based on search
    const [favorites, setFavorites] = useState([]); // List of favorite movies
    const [watchLater, setWatchLater] = useState([]); // List of "watch later" movies

    // Fetch movies from the API
    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/movies');
            setMovies(response.data); // Set the movies state with data from API
            setFilteredMovies(response.data); // Initially set filtered movies to all movies
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchMovies(); // Fetch movies when component mounts
    }, []);

    // Update filtered movies when search term changes
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredMovies(movies); // Show all movies if search term is empty
        } else {
            const filtered = movies.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredMovies(filtered); // Update filtered movies based on search term
        }
    }, [searchTerm, movies]);

    // Handle changes in the search input
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); // Update search term
    };

    // Handle adding or removing a movie from favorites or watch later
    const handleToggleFavorite = async (movie) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            try {
                if (favorites.includes(movie.imdbId)) {
                    await axios.delete(`http://localhost:8000/api/titles/favorite/${movie.imdbId}`, {
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    });
                    setFavorites(favorites.filter(id => id !== movie.imdbId)); // Remove from favorites
                } else {
                    await axios.post(`http://localhost:8000/api/titles/favorite/${movie.imdbId}`, {}, {
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    });
                    setFavorites([...favorites, movie.imdbId]); // Add to favorites
                }
            } catch (error) {
                console.error('Error updating favorites:', error);
            }
        }
    };

    const handleToggleWatchLater = async (movie) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            try {
                if (watchLater.includes(movie.imdbId)) {
                    await axios.delete(`http://localhost:8000/api/titles/watchlater/${movie.imdbId}`, {
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    });
                    setWatchLater(watchLater.filter(id => id !== movie.imdbId)); // Remove from watch later
                } else {
                    await axios.post(`http://localhost:8000/api/titles/watchlater/${movie.imdbId}`, {}, {
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    });
                    setWatchLater([...watchLater, movie.imdbId]); // Add to watch later
                }
            } catch (error) {
                console.error('Error updating watch later:', error);
            }
        }
    };

    return (
        <div className="movieCardContainer">
            {/* Search bar */}
            <div className="search-bar">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search Movies"
                />
            </div>

            {/* Display filtered movies */}
            <ul className="movieCardList">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                        <div key={movie.imdbId} className="movieCard">
                            <li
                                style={{ color: favorites.includes(movie.imdbId) ? 'red' : 'white' }}
                                onClick={() => handleToggleFavorite(movie)}
                                className="movieCardIcon"
                            >
                                <FontAwesomeIcon icon={faStar} />
                            </li>
                            <li
                                style={{ color: watchLater.includes(movie.imdbId) ? 'red' : 'white' }}
                                onClick={() => handleToggleWatchLater(movie)}
                                className="movieCardIcon"
                            >
                                <FontAwesomeIcon icon={faClock} />
                            </li>
                            <li>
                                <Image imageUrl={movie.imageurls[0]} fallBackUrl={cinemaImg} />
                            </li>
                            <li className="movieTitle">{movie.title}</li>
                            <li className="movieSynopsis">{movie.synopsis || 'Not available'}</li>
                            <ul className="genresContainer">
                                {movie.genres.map((genre, index) => (
                                    <li key={index} className="movieGenre">
                                        {genre}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No movies found</p>
                )}
            </ul>
        </div>
    );
};

export default MovieCard;
