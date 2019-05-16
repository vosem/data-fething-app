import React from 'react';
import {connect} from 'react-redux';
import {generateSortingQuery} from '../actions/actions';
import './SortShows.css';

class SortShows extends React.Component {

    componentDidMount(){}

    render() {
        return (
            <select
                className="sort-shows"
                name = "sortShows"
                defaultValue={"popular"}
                onChange={event => {this.props.sortShows(event); this.props.fetchShowsWithRedux()}}
                style={{width: 100 + '%'}}
            >
                <option value={"popular"}>popular</option>
                <option value={"trending"}>trending</option>
                <option value={"played"}>played</option>
                <option value={"watched"}>watched</option>
                <option value={"anticipated"}>anticipated</option>
            </select>
        )
    }
}

function sortShows(event) {
    return generateSortingQuery(event.target.value);
}

export default connect(null, /*mapDispatchToProps,*/ { sortShows })(SortShows);