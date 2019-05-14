import React from 'react';
import {connect} from 'react-redux';
import { generateTitleQuery } from '../actions/actions';

class SearchByTitle extends React.Component {

    componentDidMount(){}

    render() {
        return (
            <input
                type="text"
                placeholder="Title"
                onKeyUp={event => {this.props.searchByTitle(event); this.props.fetchShowsWithRedux()}}
            />
        )
    }
}

function searchByTitle(event) {

    let searchParam = `${event.target.value}&fields=title`;
    return generateTitleQuery(searchParam);

}

export default connect(null, /*mapDispatchToProps,*/ { searchByTitle })(SearchByTitle);