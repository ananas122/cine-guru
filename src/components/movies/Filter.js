// Import necessary modules from React, CSS, and other components
import React from 'react';
import './movies.css';
import SearchBar from '../general/SearchBar';
import Input from '../general/Input';
import SelectInput from '../general/SelectInput';
import Tag from './Tag';

// Filter Component - Allows filtering and sorting movies based on various criteria
// Props:
// - minYear, maxYear: Minimum and maximum years for filtering movies
// - setMinYear, setMaxYear: Functions to update minYear and maxYear
// - sort: Selected sorting criterion (e.g., Latest, Oldest, etc.)
// - setSort: Function to update the sorting criterion
// - genres: List of selected genres
// - setGenres: Function to update the selected genres
// - title: Movie title for searching
// - setTitle: Function to update the searched title
const Filter = ({ minYear, setMinYear, maxYear, setMaxYear, sort, setSort, genres, setGenres, title, setTitle }) => {

    // Array of available movie genres for selection
    const arrayOfGenres = ['Action', 'Drama', 'Comedy', 'Biography',
        'Romance', 'Thriller', 'War', 'History',
        'Sport', 'Sci-Fi', 'Documentary', 'Crime', 'Fantasy'];

    return (
        <div className='filter'>

            {/* Search bar to filter movies by title */}
            <SearchBar title={title} setTitle={setTitle} />

            {/* Input field for the minimum release year */}
            <Input label={'Min Date:'} type={'number'} value={minYear} setValue={setMinYear} />

            {/* Input field for the maximum release year */}
            <Input label={'Max Date:'} type={'number'} value={maxYear} setValue={setMaxYear} />

            {/* Dropdown menu to select the sorting criterion for movies */}
            <SelectInput
                label={'Sort:'}
                value={sort}
                setValue={setSort}
                Multiple={false}
                options={['Latest', 'Oldest', 'Highest rated', 'Lowest rated']}
            />

            {/* List of tags to select movie genres */}
            <div className='tagList'>
                {arrayOfGenres.map((tag, index) =>
                    <Tag key={index} genres={genres} genre={tag} setGenres={setGenres} />
                )}
            </div>

        </div>
    );
}

export default Filter;
