import React from 'react';
import {connect} from 'react-redux';

let TitleSearchValue = '';

export function searchShowsSuccess(payload) {
    return {
        type: "SEARCH_SHOWS_SUCCESS",
        payload
    }
}

function searchByTitle(event) {

    // if (event.keyCode === 13) {

    if(event.target) {
        TitleSearchValue = event.target.value;

        return (dispatch) => {
            return searchShows()
                .then((response) => {
                    if (response !== 'undefined') {
                        dispatch(searchShowsSuccess(response))
                    } else {
                        // dispatch(fetchShowsError())
                    }
                })
        }
    }
    // }
}

function searchShows(input, init) {
    const URL = `https://api.trakt.tv/search/show?extended=full&limit=10&query=${TitleSearchValue}&fields=title`;

    return fetch(URL, {
        headers: {
            "Content-Type": "application/json",
            "trakt-api-version": "2",
            "trakt-api-key": "31f15cbdee3e55e2ceca6cd2e0e3ba9791b4f1feb1f7bab08c3d8ca6e018609a"
        }
    })
        .then( response => response.json())
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onKeyUp: event => dispatch(searchByTitle(event))
//     }
// }
function mapStateToProps(state){
    return {
        posters: state.postersState.posters,
        shows: state.showsState.shows,
        items: state.itemsState.items
    }
}



class TitleSearch extends React.Component {

    handleSubmit(event){
        event.preventDefault();
    }

    componentDidMount(){}

    render() {
        return (
            <form action="" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    // onKeyUp={this.props.onKeyUp}
                    onKeyUp={event => this.props.searchByTitle(event)}
                />
            </form>
        )
    }
}

export default connect(mapStateToProps, /*mapDispatchToProps,*/ { searchByTitle })(TitleSearch);