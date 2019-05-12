import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {Provider, connect} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Show from './components/Show';
import './index.css';
import TitleSearch from "./components/TitleSearch";

const logger = createLogger();

///////////////////////////////// actionCreators ///////////////////////////////

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

function fetchPosterSuccess(payload) {
    return {
        type: "FETCH_POSTER_SUCCESS",
        payload
    }
}

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

//////////////////////////////// reducers ///////////////////////////////////////
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
        case "FETCH_POSTER_SUCCESS":
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
        case "FETCH_SHOWS_SUCCESS":
            return {...state, shows: action.payload};
        case "SEARCH_SHOWS_SUCCESS":
            return {...state, shows: action.payload};
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    postersState: posterReducer,
    showsState: showsReducer,
    itemsState: itemsReducer
});

/////////////////////////////// async shows requests ///////////////////////////

function fetchShowsWithRedux() {
    return (dispatch) => {
        // dispatch(fetchShowsRequest());
        return fetchShows()
            .then((response) =>{
                if(response !== 'undefined'){
                    dispatch(fetchShowsSuccess(response))
                }
                else{
                    dispatch(fetchShowsError())
                }
                return response;
            })
            // .then((response) => {            // fetchPosterWithRedux() -> return does not work
            //     console.log('!!!!', response);
            //     console.log(store.getState().showsState.shows);
            //     for(let i = 0; i < store.getState().showsState.shows.length; i++){
            //         console.log(i);
            //         getId(store.getState().showsState.shows[i].show.ids.tvdb);
            //         fetchPosterWithRedux();
            //     }
            // });
    }
}

// function fetchShows(input, init) {
//     return new Promise((resolve, reject) => {
//         const URL = "https://api.trakt.tv/search/show?extended=full&limit=10&query=";
//         const req = new XMLHttpRequest();
//         req.open('GET', URL, true);
//         const headers = {
//             "Content-Type": "application/json",
//             "trakt-api-version": "2",
//             "trakt-api-key": "31f15cbdee3e55e2ceca6cd2e0e3ba9791b4f1feb1f7bab08c3d8ca6e018609a"
//         };
//         Object.keys(headers).forEach(key => req.setRequestHeader(key, headers[key]));
//         req.onreadystatechange = () => {
//             if (req.readyState != req.DONE) {
//                 console.log(`readyState = ${req.readyState}`);
//             } else if (req.status == 200) {
//                 // try {
//                 //     const res = JSON.parse(req.responseText);
//                 //     console.log(res);
//                 //     resolve(res);
//                 // } catch (e) {
//                 //     console.log(`Error: ${e}!!! ${req.responseText}`);
//                 //     reject();
//                 // }
//                 resolve(req.responseText);
//             } else {
//                 console.log(`Error!!!`);
//                 reject(req.status);
//             }
//         }
//         req.send();
//     }).then(res => {
//         try {
//             res = JSON.parse(res);
//             console.log(res);
//             return Promise.resolve(res);
//         } catch (e) {
//             console.log(`Error: ${e}!!! ${res}`);
//             return Promise.reject(e);
//         }
//     });
// }

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
}

/////////////////////// async poster requests ////////////////////
function fetchPosterWithRedux() {
    console.log('fetchPosterWithRedux');
    return (dispatch) => {
        console.log('dispatch posterReduxThunk');
        return fetchPoster(dispatch)
            .then(([response, json]) =>{
                if(response.status === 200){
                    // console.log('fetchPosterSuccess');
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
    // console.log('fetchPoster');
    const URL = `http://private-anon-d2c67a30e4-fanarttv.apiary-proxy.com/v3/tv/${showId}?api_key=ab75dec43906f846e6200633b9ad43c7&&client_key=4c61b1676e8869c4553df95839f5a827`;

    return fetch(URL, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then( response => Promise.all([response, response.json()]));
}

function addItems(showId) {
    return addItem(showId);

}

///////////////////////// React component //////////////////////

class App extends React.Component {
    componentDidMount(){
        this.props.fetchShowsWithRedux()
            .then(() => {
                for(let i = 0; i < this.props.shows.length; i++){
                    this.props.addItems(this.props.shows[i].show.ids.tvdb);
                }
            })
            .then(() => {
                    for(let i = 0; i < this.props.shows.length; i++){
                        console.log(i);
                        getId(this.props.shows[i].show.ids.tvdb);
                        this.props.fetchPosterWithRedux();
                    }
            })
    }

    render(){

        let i = 0;
        return (
            <table>
                <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <TitleSearch />
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                {(this.props.shows || []).map(show => {
                    ++i;
                       return <Show
                            key={i}
                            showNumber={i}
                            showId={show.show.ids.tvdb}
                            show={show.show}
                        />
                    }
                )}
                </tbody>
            </table>
        )
    }
}


function mapStateToProps(state){
    return {
        posters: state.postersState.posters,
        shows: state.showsState.shows,
        items: state.itemsState.items
    }
}

let Container = connect(mapStateToProps, {fetchPosterWithRedux, fetchShowsWithRedux, addItems})(App);

/////////////////////////////////// Redux store ////////////////////////////////
const store = createStore(
    rootReducer,
    applyMiddleware(logger, ReduxThunk)
);

////////////////////////////// Rendering react elements ////////////////////////
ReactDOM.render(
    <div>
        <Provider store={store}>
            <Container/>
        </Provider>
    </div>,
    document.getElementById('root')
);
