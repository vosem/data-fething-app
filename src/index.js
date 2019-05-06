import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import {Provider, connect} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import './index.css';

const thunk = ReduxThunk;

function fetchPostsRequest(){
    return {
        type: "FETCH_REQUEST"
    }
}

function fetchPostsSuccess(payload) {
    console.log(payload);
    return {
        type: "FETCH_SUCCESS",
        payload
    }
}

function fetchPostsError() {
    return {
        type: "FETCH_ERROR"
    }
}

const reducer = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return state;
        case "FETCH_SUCCESS":
            return {...state, shows: action.payload};
        default:
            return state;
    }
}

function fetchPostsWithRedux() {
    return (dispatch) => {
        dispatch(fetchPostsRequest());
        return fetchPosts()
            .then(([response, json]) =>{
            if(response.status === 200){
                dispatch(fetchPostsSuccess(json))
            }
            else{
                dispatch(fetchPostsError())
            }
        })
    }
}

function fetchPosts(input, init) {
    const URL = "https://api.trakt.tv/search/show?extended=full&limit=10&query=";


    return fetch(URL, {
        headers: {
            "Content-Type": "application/json",
            "trakt-api-version": "2",
            "trakt-api-key": "31f15cbdee3e55e2ceca6cd2e0e3ba9791b4f1feb1f7bab08c3d8ca6e018609a"
        }
    })
    .then( response => Promise.all([response, response.json()]));
}

class App extends React.Component {
    componentDidMount(){
        this.props.fetchPostsWithRedux()
    }
    render(){
        return (
            <table>
                <tbody>
                {
                    this.props.shows &&
                    this.props.shows.map((item) =>{
                        return(
                            <tr><td>{ item.show.title }</td><td>{ item.show.ids.tvdb }</td></tr>
                        )
                    })
                }
                </tbody>
            </table>
        )
    }
}


function mapStateToProps(state){
    return {
        shows: state.shows
    }
}


let Container = connect(mapStateToProps, {fetchPostsWithRedux})(App);

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <div>
    <Provider store={store}>
        <Container/>
    </Provider>
    </div>,
    document.getElementById('root')
);
