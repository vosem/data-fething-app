import React from 'react';
import {connect} from 'react-redux';

let TitleSearchValue = '';

export function searchShowsSuccess(payload) {
    return {
        type: "SEARCH_SHOWS_SUCCESS",
        payload
    }
}

function searchByTitle(event) {              // can't use inside of class

    // event.nativeEvent.preventDefault();                 // doesn't prevent reload
    // event.nativeEvent.stopPropagation();                 // doesn't prevent reload
    // event.nativeEvent.stopImmediatePropagation();        // doesn't prevent reload
    // if (event.keyCode === 13) {
    // event.target &&
    console.log(event.target.value);

    if(event.target) {
        TitleSearchValue = event.target.value;
        console.log(event.target.value);
        return (dispatch) => {
            console.log('searchShowsThunk');
            return searchShows()

                .then((response) => {
                    // console.log(response);
                    if (response !== 'undefined') {
                        dispatch(searchShowsSuccess(response))
                    } else {
                        // dispatch(fetchShowsError())
                    }
                })
        }
    }
    // }
    // return false;                 // doesn't prevent reload
}

function searchShows(input, init) {
    console.log('searchShows');
    // const URL = `https://api.trakt.tv/search/show?extended=full&limit=10&query=,title=${TitleSearchValue}`;
    const URL = `https://api.trakt.tv/search/show?extended=full&limit=10&query=${TitleSearchValue}&show.title=${TitleSearchValue}&year=2008`;
    // const URL = `https://api.trakt.tv/search/show?extended=full&limit=10&query=tron&title=tron`;
    // const URL = `https://api.trakt.tv/shows/popular?extended=full&limit=10&title=${TitleSearchValue}`;

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

    componentDidMount(){}

    render() {
        console.log('this.props ' + this.props.onKeyUp)
        return (
            <form action="#">
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