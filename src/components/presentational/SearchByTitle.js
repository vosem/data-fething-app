import React from 'react';
import './SearchByTitle.css';

function SearchByTitle (props) {

    return (
        <input
            className="search-by-title"
            type="text"
            placeholder="Title"
            onFocus={ event => event.target.placeholder = "" }
            onBlur={ event => event.target.placeholder = "Title" }
            onKeyUp={ event => props.onTitleChange(event.target.value) }
        />
    )
}

export default SearchByTitle;