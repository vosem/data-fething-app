import React from 'react';
import {connect} from 'react-redux';
import { generateYearQuery } from '../actions/actions';
import './SearchByYear.css';

class SearchByYear extends React.Component {

    componentDidMount(){}

    render() {
        return (
            <input
                className={'search-by-year'}
                type="text"
                placeholder="Year"
                onKeyUp={event => {this.props.searchByYear(event); this.props.fetchShowsWithRedux()}}
            />
        )
    }
}

function searchByYear(event) {
    return generateYearQuery(event.target.value);
}

export default connect(null, { searchByYear })(SearchByYear);