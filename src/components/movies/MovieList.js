import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import Filter from './Filter';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minYear, setMinYear] = useState(1970);
    const [maxYear, setMaxYear] = useState(2022);
    const [sort, setSort] = useState('Default');
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
                    params: {
                        api_key: process.env.REACT_APP_API_KEY,
                        language: 'en-US',
                        sort_by: sort === 'Latest' ? 'release_date.desc' : 'release_date.asc',
                        primary_release_year: minYear,
                        'vote_average.gte': maxYear,
                        with_genres: genres.join(',')
                    }
                });
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();
    }, [minYear, maxYear, sort, genres]);

    return (
        <div>
            <Filter
                minYear={minYear}
                setMinYear={setMinYear}
                maxYear={maxYear}
                setMaxYear={setMaxYear}
                sort={sort}
                setSort={setSort}
                genres={genres}
                setGenres={setGenres}
                title={searchTerm}
                setTitle={setSearchTerm}
            />
            <div className="movieCardContainer">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
