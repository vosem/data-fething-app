import React from 'react';
import './SearchByTitle.css';

class SearchByTitle extends React.Component {

    componentDidMount(){}

    render() {
        return (
            <input
                className="search-by-title"
                type="text"
                placeholder="Title"
                onFocus={event => event.target.placeholder = ""}
                onBlur={event => event.target.placeholder = "Title"}
                onKeyUp={event => this.props.fetchShowsByTitle(event.target.value)}
            />
        )
    }
}

export default SearchByTitle;