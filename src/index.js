import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {Provider, connect} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import './index.css';

// action creators
function fetchRequest(){
    return {
        type: "FETCH_REQUEST"
    }
}

function fetchSuccess(payload) {
    console.log(payload);
    return {
        type: "FETCH_SUCCESS",
        payload
    }
}

function fetchError() {
    return {
        type: "FETCH_ERROR"
    }
}

//reducers
const posterReducer = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return state;
        case "FETCH_SUCCESS":
            return {...state, posters: action.payload};
        default:
            return state;
    }
}


// async requests
function fetchPosterWithRedux() {
    return (dispatch) => {
        dispatch(fetchRequest());
        return fetchPoster()
            .then(([response, json]) =>{
                if(response.status === 200){
                    dispatch(fetchSuccess(json))
                }
                else{
                    dispatch(fetchError())
                }
            })
    }
}

function getId(tmdbId) {
    const showId = 289590;
    return showId;
}


function fetchPoster(input, init) {
    const showId = getId();
    const URL = `http://private-anon-d2c67a30e4-fanarttv.apiary-proxy.com/v3/tv/${showId}?api_key=ab75dec43906f846e6200633b9ad43c7&&client_key=4c61b1676e8869c4553df95839f5a827`;


    return fetch(URL, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then( response => Promise.all([response, response.json()]));
}

// React presentational component
class App extends React.Component {
    componentDidMount(){
        this.props.fetchPosterWithRedux()
    }
    render(){

        return (
            <table>
                <tbody>
                {
                    this.props.posters &&
                    <tr><td><img src={this.props.posters.tvthumb[0].url} alt={this.props.posters.tvthumb[0].url}></img></td></tr>

                }
                </tbody>
            </table>
        )
    }
}


function mapStateToProps(state){
    return {
        posters: state.posters
    }
}


let Container = connect(mapStateToProps, {fetchPosterWithRedux})(App);

// Redux store
const store = createStore(
    posterReducer,
    applyMiddleware(ReduxThunk)
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





// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
// import {Provider, connect} from 'react-redux';
// import ReduxThunk from 'redux-thunk';
// import './index.css';
//
// function fetchRequest(){
//     return {
//         type: "FETCH_REQUEST"
//     }
// }
//
// function fetchSuccess(payload) {
//     console.log(payload);
//     return {
//         type: "FETCH_SUCCESS",
//         payload
//     }
// }
//
// function fetchError() {
//     return {
//         type: "FETCH_ERROR"
//     }
// }
//
// const showsReducer = (state = {}, action) => {
//     switch (action.type) {
//         case "FETCH_REQUEST":
//             return state;
//         case "FETCH_SUCCESS":
//             return {...state, shows: action.payload};
//         default:
//             return state;
//     }
// }
//
// function fetchShowsWithRedux() {
//     return (dispatch) => {
//         dispatch(fetchRequest());
//         return fetchShows()
//             .then(([response, json]) =>{
//             if(response.status === 200){
//                 dispatch(fetchSuccess(json))
//             }
//             else{
//                 dispatch(fetchError())
//             }
//         })
//     }
// }
//
// function fetchShows(input, init) {
//     const URL = "https://api.trakt.tv/search/show?extended=full&limit=10&query=";
//
//
//     return fetch(URL, {
//         headers: {
//             "Content-Type": "application/json",
//             "trakt-api-version": "2",
//             "trakt-api-key": "31f15cbdee3e55e2ceca6cd2e0e3ba9791b4f1feb1f7bab08c3d8ca6e018609a"
//         }
//     })
//     .then( response => Promise.all([response, response.json()]));
// }
//
// class App extends React.Component {
//     componentDidMount(){
//         this.props.fetchShowsWithRedux()
//     }
//     render(){
//         return (
//             <table>
//                 <tbody>
//                 {
//                     this.props.shows &&
//                     this.props.shows.map((item) =>{
//                         return(
//                             <tr><td>{ item.show.title }</td><td>{ item.show.ids.tvdb }</td></tr>
//                         )
//                     })
//                 }
//                 </tbody>
//             </table>
//         )
//     }
// }
//
//
// function mapStateToProps(state){
//     return {
//         shows: state.shows
//     }
// }
//
//
// let Container = connect(mapStateToProps, {fetchShowsWithRedux})(App);
//
// const store = createStore(
//     reducer,
//     applyMiddleware(ReduxThunk)
// );
//
// ReactDOM.render(
//     <div>
//     <Provider store={store}>
//         <Container/>
//     </Provider>
//     </div>,
//     document.getElementById('root')
// );
