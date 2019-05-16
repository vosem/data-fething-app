import React from 'react';
// import {connect} from 'react-redux';
// import { generateYearQuery } from '../actions/actions';
import './SearchByYear.css';

class SearchByYear extends React.Component {

    componentDidMount(){}

    render() {
        return (
            <input
                className={'search-by-year'}
                type="text"
                placeholder="Year"
                onFocus={(e) => e.target.placeholder = ""}
                onBlur={(e) => e.target.placeholder = "Year"}
                onKeyUp={ async (event) => this.props.fetchShows(event.target.value) }
            />
        )
    }
}

// export default connect(null, { searchByYear })(SearchByYear);
export default SearchByYear;