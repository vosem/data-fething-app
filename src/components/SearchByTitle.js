import React from 'react';
import {connect} from 'react-redux';
import { generateTitleQuery } from '../actions/actions';
import './SearchByTitle.css';

class SearchByTitle extends React.Component {

    componentDidMount(){}

    render() {
        return (
            <input
                className="search-by-title"
                type="text"
                placeholder="Title"
                onKeyUp={event => {this.props.searchByTitle(event); this.props.fetchShowsWithRedux()}}
            />
        )
    }
}

function searchByTitle(event) {
    return generateTitleQuery(event.target.value);
}

export default connect(null, /*mapDispatchToProps,*/ { searchByTitle })(SearchByTitle);