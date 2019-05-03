import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import {Provider, connect} from 'react-redux';
import * as thunk from 'redux-thunk';
import './index.css';

// const thunk = ReduxThunk.default;

function fetchPostsRequest(){
    return {
        type: "FETCH_REQUEST"
    }
}

function fetchPostsSuccess(payload) {
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
            return {...state, posts: action.payload};
        default:
            return state;
    }
}

function fetchPostsWithRedux() {
    return (dispatch) => {
        dispatch(fetchPostsRequest());
        return fetchPosts().then(([response, json]) =>{
            if(response.status === 200){
                dispatch(fetchPostsSuccess(json))
            }
            else{
                dispatch(fetchPostsError())
            }
        })
    }
}

function fetchPosts() {
    const URL = "https://jsonplaceholder.typicode.com/posts";
    return fetch(URL, { method: 'GET'})
        .then( response => Promise.all([response, response.json()]));
}

class App extends React.Component {
    componentDidMount(){
        this.props.fetchPostsWithRedux()
    }
    render(){
        return (
            <table>
                {
                    this.props.posts &&
                    this.props.posts.map((post) =>{
                        return(
                            <tr>{post.title}</tr>
                        )
                    })
                }
            </table>
        )
    }
}


function mapStateToProps(state){
    return {
        posts: state.posts
    }
}


let Container = connect(mapStateToProps, {fetchPostsWithRedux})(App);

const store = createStore(
    reducer,
    applyMiddleware(thunk.default)
);
ReactDOM.render(
    <div>
    <Provider store={store}>
        <Container/>
    </Provider>
    </div>,
    document.getElementById('root')
);
