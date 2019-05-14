import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/index';
import {Provider, connect} from 'react-redux';
import { fetchShowsSuccess, fetchShowsError, fetchPosterSuccess, fetchPosterError } from './actions/actions';
import Show from './components/Show';
import SearchByTitle from "./components/SearchByTitle";
import SearchByYear from "./components/SearchByYear";
import SortShows from "./components/SortShows";
import './index.css';

/////////////////////////////// async shows requests ///////////////////////////

function fetchShowsWithRedux() {
    return (dispatch) => {
        // dispatch(fetchShowsRequest());

        return fetchShows()
            .then((response) =>{
                if(response !== 'undefined'){
                    // console.log(response);
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

function generateShowsUrl (){
    let URL, titleQuery, yearQuery, sortingQuery;

    if(store.getState().queryState.queries) {
        titleQuery = store.getState().queryState.queries.title;
        yearQuery = store.getState().queryState.queries.year;
        sortingQuery = store.getState().queryState.queries.sorting;
    }

    if(store.getState().queryState.queries && titleQuery === undefined) titleQuery = '';
    if(store.getState().queryState.queries && yearQuery === undefined) yearQuery = '';

    if (store.getState().queryState.queries) {
        if(store.getState().queryState.queries.sorting === 'popular') {
            URL = `https://api.trakt.tv/search/show?extended=full&limit=10&query=${titleQuery}${yearQuery}`
        }
        else URL = `https://api.trakt.tv/shows/${sortingQuery}?extended=full&limit=10&query=${titleQuery}${yearQuery}`;
        console.log(URL);
    }else {
        URL = `https://api.trakt.tv/search/show?extended=full&limit=10&query=`;
    }
    return URL;
}

 function fetchShows() {

    let URL = generateShowsUrl();

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
    // console.log('fetchPosterWithRedux');
    return (dispatch) => {
        // console.log('dispatch posterReduxThunk');
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

// function getToken() {
//
//     const URL = `https://api.thetvdb.com/login`;
//
//     return fetch(URL, {
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             // "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTc5MDE4MDcsImlkIjoiZGF0YS1mZXRjaGluZy1hcHAiLCJvcmlnX2lhdCI6MTU1NzgxNTQwNywidXNlcmlkIjo1Mjc5NTIsInVzZXJuYW1lIjoiYW5uYS5wb3BvdnNrYS5maXJlZmx5YjM2In0.nBj-hDm7l4eLQHxCjhiNLc8UeZQZseiw5fKNpssGm1gF8twwGHsOjA7ra7qGZDMwKwo6sLw9egVw2jPUR4xV_WMJ4o02X7x15Ksk5WUXQ1k__7UzvW3vqfkzfXgq93kZW5dknZ97sYh1R06flr0pxICq1QIpOu2JjK3XeXS2VhkPAAzKXdHcEIW_t2ssRnOZe_Cx5l9JrZS-KzvfB-ckEMCdS1YMldTey6GTmllJSYg1ZsgfVWTivAsJKe0OV-4Z40hIDJi2rp4SrfCafyrWS3p3zV4yFhdwpdigc-F0sRQ823cUqoyg54QEmmNQtD5QUPHrlnC3t449gfgVrNlAuw"
//         },
//         method: "POST",
//         // body: JSON.stringify({"apikey":"S8C0EN8YHQ6KD00U","username":"anna.popovska.fireflyb36","userkey":"MMNF6OV4HH7K4YIS"}),
//         body: '{"apikey":"S8C0EN8YHQ6KD00U","username":"anna.popovska.fireflyb36","userkey":"MMNF6OV4HH7K4YIS"}',
//         mode: 'no-cors'
//     })
//         // .then( response => Promise.all([response, response.json()]));
//         .then( response => Promise.all([response, console.log(response)]));
// }

function fetchPoster(input, init) {
    // console.log('fetchPoster');
    const URL = `http://private-anon-d2c67a30e4-fanarttv.apiary-proxy.com/v3/tv/${showId}?api_key=ab75dec43906f846e6200633b9ad43c7&&client_key=4c61b1676e8869c4553df95839f5a827`;
    // const URL = `https://api.thetvdb.com/series/${showId}/images/query?keyType=poster`;              //tvdb

    return fetch(URL, {
        headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTc5MDE4MDcsImlkIjoiZGF0YS1mZXRjaGluZy1hcHAiLCJvcmlnX2lhdCI6MTU1NzgxNTQwNywidXNlcmlkIjo1Mjc5NTIsInVzZXJuYW1lIjoiYW5uYS5wb3BvdnNrYS5maXJlZmx5YjM2In0.nBj-hDm7l4eLQHxCjhiNLc8UeZQZseiw5fKNpssGm1gF8twwGHsOjA7ra7qGZDMwKwo6sLw9egVw2jPUR4xV_WMJ4o02X7x15Ksk5WUXQ1k__7UzvW3vqfkzfXgq93kZW5dknZ97sYh1R06flr0pxICq1QIpOu2JjK3XeXS2VhkPAAzKXdHcEIW_t2ssRnOZe_Cx5l9JrZS-KzvfB-ckEMCdS1YMldTey6GTmllJSYg1ZsgfVWTivAsJKe0OV-4Z40hIDJi2rp4SrfCafyrWS3p3zV4yFhdwpdigc-F0sRQ823cUqoyg54QEmmNQtD5QUPHrlnC3t449gfgVrNlAuw'
        },
        // mode: 'no-cors'
    })
        .then( response => Promise.all([response, response.json()]));
}

///////////////////////// React component //////////////////////

class App extends React.Component {
    componentDidMount(){
        console.log(this.props);
        this.props.fetchShowsWithRedux()
            // .then(() => {
            //     console.log(getToken());
            // })
            .then(() => {
                    for(let i = 0; i < this.props.shows.length; i++){
                        // console.log(i);
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
                    <td colSpan="3">
                        <SortShows fetchShowsWithRedux={this.props.fetchShowsWithRedux} />
                    </td>
                    <td>
                        <SearchByTitle fetchShowsWithRedux={this.props.fetchShowsWithRedux} />
                    </td>
                    <td>Rank</td>
                    <td>
                        <SearchByYear fetchShowsWithRedux={this.props.fetchShowsWithRedux} />
                    </td>
                    <td>No of Episodes</td>
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
        queries: state.queryState.queries
    }
}

let Container = connect(mapStateToProps, {fetchPosterWithRedux, fetchShowsWithRedux})(App);

ReactDOM.render(
    <div>
        <Provider store={store}>
            <Container/>
        </Provider>
    </div>,
    document.getElementById('root')
);
