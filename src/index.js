import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {Provider, connect} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Show from './components/Show';
import './index.css';

const logger = createLogger();

// action creators
// function fetchShowsRequest(){
//     return {
//         type: "FETCH_SHOWS_REQUEST"
//     }
// }

function fetchShowsSuccess(payload) {
    return {
        type: "FETCH_SHOWS_SUCCESS",
        payload
    }
}

function fetchShowsError() {
    return {
        type: "FETCH_SHOWS_ERROR"
    }
}

// function fetchPosterRequest(){
//     return {
//         type: "FETCH_POSTER_REQUEST"
//     }
// }

function fetchPosterSuccess(payload) {
    // console.log(payload);
    return {
        type: "FETCH_POSTER_SUCCESS",
        payload
    }
}

// function createPosterUrl(payload) {
//     // console.log(payload);
//     return {
//         type: "CREATE_POSTER_URL",
//         payload
//     }
// }

function fetchPosterError() {
    return {
        type: "FETCH_POSTER_ERROR"
    }
}
function addItem(payload) {
    return {
        type: "ADD_ITEM",
        payload
    }
}

//reducers
// const posterUrlReducer = (state = {}, action) => {
//     switch (action.type) {
//         case "CREATE_POSTER_URL":
//             return {...state, posterUrls: action.payload};
//         default:
//             return state;
//     }
// }
// const items = [1, 2];

function itemsReducer (state = {}, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            return Object.assign({}, state, {
                items: [
                    ...state.items || [],
                    {
                        item: action.payload
                    }
                ]
            });

        default:
            return state;
    }
}
const posterReducer = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_POSTER_REQUEST":
            return state;
        case "FETCH_POSTER_SUCCESS":
            // console.log(action.payload);
            // return {...state, poster: action.payload};
            return Object.assign({}, state, {
                posters: [
                    ...state.posters || [],
                    {
                        poster: action.payload
                    }
                ]
            });
        default:
            return state;
    }
}
const showsReducer = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_SHOWS_REQUEST":
            return state;
        case "FETCH_SHOWS_SUCCESS":
            return {...state, shows: action.payload};
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    posterState: posterReducer,
    showsState: showsReducer,
    itemsState: itemsReducer
});

// async shows requests
// function fetchShowsWithRedux() {
//     return (dispatch) => {
//         dispatch(fetchShowsRequest());
//         return fetchShows()
//             .then(([response, json]) =>{
//
//                 if(response.status === 200){
//                     dispatch(fetchShowsSuccess(json))
//                 }
//                 else{
//                     dispatch(fetchShowsError())
//                 }
//             })
//             // .then((response, json) => {
//                     // console.log(json);
//             // })
//
//     }
// }
function fetchShowsWithRedux() {
    return (dispatch) => {
        // dispatch(fetchShowsRequest());
        return fetchShows()
            .then((response) =>{
                // console.log(response);
                if(response !== 'undefined'){
                    dispatch(fetchShowsSuccess(response))
                }
                else{
                    dispatch(fetchShowsError())
                }
            })
        // .then((response) => {
        //
        // console.log(response);
        // console.log(store.getState().showsState.shows);
        // for(let i = 0; i < store.getState().showsState.shows.length; i++){
        //     console.log(i);
        //     fetchPosterWithRedux();         //does not work
        //
        // }
        // })

    }
}

function fetchShows(input, init) {
    const URL = "https://api.trakt.tv/search/show?extended=full&limit=10&query=";

    return fetch(URL, {
        headers: {
            "Content-Type": "application/json",
            "trakt-api-version": "2",
            "trakt-api-key": "31f15cbdee3e55e2ceca6cd2e0e3ba9791b4f1feb1f7bab08c3d8ca6e018609a"
        }
    })
        // .then( response => Promise.all([response, response.json()]));
        .then( response => response.json())
        // .then( response => console.log(response));
}

// async poster requests
function fetchPosterWithRedux() {
    console.log('fetchPosterWithRedux');
    // console.log(showId);
    return (dispatch) => {
        console.log('posterReduxThunk');
        // dispatch(fetchPosterRequest());
        return fetchPoster(dispatch)
            .then(([response, json]) =>{
                console.log('posterReduxThunk');
                if(response.status === 200){
                    dispatch(fetchPosterSuccess(json))
                }
                else{
                    dispatch(fetchPosterError())
                }
            })
    }
}
let showId = 0;
function getId(tvdbId) {
    showId = tvdbId;
    return showId;
}

function fetchPoster(input, init) {
    console.log('fetchPoster');
    // console.log(showId);
    // const showId = getId(store.getState().showsState.shows[i].show.ids.tvdb);
    const URL = `http://private-anon-d2c67a30e4-fanarttv.apiary-proxy.com/v3/tv/${showId}?api_key=ab75dec43906f846e6200633b9ad43c7&&client_key=4c61b1676e8869c4553df95839f5a827`;

    return fetch(URL, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then( response => Promise.all([response, response.json()]));
}

function addItems(showId) {
    console.log('addItems');
    console.log(showId);

        return addItem(showId);

}

// React presentational component
class App extends React.Component {
    componentDidMount(){
        // this.props.fetchPosterWithRedux()
        this.props.fetchShowsWithRedux()
            .then(() => {
                for(let i = 0; i < store.getState().showsState.shows.length; i++){
                    this.props.addItems(store.getState().showsState.shows[i].show.ids.tvdb);
                }
            })
            .then(() => {
                    for(let i = 0; i < store.getState().showsState.shows.length; i++){
                        console.log(i);
                        // this.props.fetchPosterWithRedux();
                        // console.log(showId);
                    }
            })


    }

    render(){

        console.log(this.props.posterState);
        let i = -1;
        return (
            <table>
                <tbody>
                {(this.props.shows || []).map(show => {
console.log(show.show.ids.tvdb);
console.log(this.props.posters);
                        // let index = this.props.shows.indexOf(show.show.ids.tvdb.parentElement)
                        // console.log(index);
                    ++i;
                       return <Show
                            key={i}
                            showId={show.show.ids.tvdb}
                            show={show.show}
                        />
                    }
                )}
                {
                    // this.props.posters &&
                    // <tr><td><img src={this.props.posters.tvthumb[0].url} alt={this.props.posters.tvthumb[0].url}></img></td></tr>

                }
                </tbody>
            </table>
        )
    }
}


function mapStateToProps(state){
    // console.log(state)
    return {
        // posters: state.posterState.posters,
        shows: state.showsState.shows,
        items: state.itemsState.items
    }
}


let Container = connect(mapStateToProps, {fetchPosterWithRedux, fetchShowsWithRedux, addItems})(App);

// Redux store
const store = createStore(
    rootReducer,
    applyMiddleware(logger, ReduxThunk)
);

// Rendering react elements
ReactDOM.render(
    <div>
        <Provider store={store}>
            <Container/>
        </Provider>
    </div>,
    document.getElementById('root')
);
