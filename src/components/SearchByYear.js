import React from 'react';
import './SearchByYear.css';

class SearchByYear extends React.Component {
    render() {
        console.log('SearchByYearComponent ', this.props);
        return (
            <input
                className={ 'search-by-year' }
                type={ 'text' }
                placeholder={ 'Year' }
                onFocus={ event => event.target.placeholder = "" }
                onBlur={ event => event.target.placeholder = "Year" }
                onKeyUp={ event => this.props.fetchShowsByYear(event.target.value) }
            />
        )
    }
}

export default SearchByYear;