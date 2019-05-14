import React from 'react';
import {connect} from 'react-redux';
import { generateYearQuery } from '../actions/actions';

class SearchByYear extends React.Component {

    componentDidMount(){}

    render() {
        return (
            <input
                type="text"
                placeholder="Year"
                onKeyUp={event => {this.props.searchByYear(event); this.props.fetchShowsWithRedux()}}
            />
        )
    }
}

function searchByYear(event) {
    let searchParam = `&years=${event.target.value}`;
    return generateYearQuery(searchParam);
}


function mapStateToProps(state){
    return {
        posters: state.postersState.posters,
        shows: state.showsState.shows,
        queries: state.queryState.queries
    }
}

export default connect(mapStateToProps, /*mapDispatchToProps,*/ { searchByYear })(SearchByYear);