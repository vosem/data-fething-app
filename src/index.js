import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/index';
import {Provider, connect} from 'react-redux';
import { fetchShowsSuccess, fetchShowsError, fetchPosterSuccess, fetchPosterError } from './actions/actions';
import Show from './components/Show';
import SearchByTitle from "./components/SearchByTitle";
import SearchByYear from "./components/SearchByYear";
import SortShows from "./components/SortShows";
import Pagination from "./components/Pagination";
import './index.css';

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
            // .then(() => {            // fetchPosterWithRedux() -> return does not work
            //     for(let i = 0; i < store.getState().showsState.shows.length; i++){
            //         // console.log(i);
            //         getId(store.getState().showsState.shows[i].show.ids.tvdb);
            //         console.log(store.getState().showsState.shows[i].show.ids.tvdb);
            //         fetchPosterWithRedux();
            //     }
            // });
    }
}

function generateShowsUrl (){
    const queries = store.getState().queryState.queries || {};
    const { title, year, sorting, page, limit } = queries;
    const P = sorting && sorting !== 'popular' ? [ 'shows', sorting ] : ['search', 'show' ];
    const Q = { extended: 'full', query: title || '', fields: 'title', years: year, page: page || 0, limit: limit || 10 };
    const QQ = Object.keys(Q).map(_ => [ _, Q[_] ]).filter(_ => _[1] || _[0]==='query');
    const URL = `https://api.trakt.tv/${ P.join('/') }?${ QQ.map(_ => _.map(_ =>encodeURIComponent(_)).join('=') ).join('&') }`;
    return URL;
}

function fetchShows() {

    let URL = generateShowsUrl();
    // console.log(URL);

    return fetch(URL, {
        headers: {
            "Content-Type": "application/json",
            "trakt-api-version": "2",
            "trakt-api-key": "31f15cbdee3e55e2ceca6cd2e0e3ba9791b4f1feb1f7bab08c3d8ca6e018609a"
        }
    })
        .then( response => {
            console.log('x-pagination-page-count', response.headers.get('x-pagination-page-count'));
            console.log('x-pagination-page', response.headers.get('x-pagination-page'));
            return response.json()
        })
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

function getToken() {
    const body = {
        apikey: 'Q13BY1KX85AT1XY1',
        username: 'anna.popovska.fireflyb36',
        userkey: 'MMNF6OV4HH7K4YIS'
    };
    return fetch(`https://api.thetvdb.com/login`, {
        headers: {
            'Content-Type': "application/json",
            Accept: "application/json",
            // "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTc5MDE4MDcsImlkIjoiZGF0YS1mZXRjaGluZy1hcHAiLCJvcmlnX2lhdCI6MTU1NzgxNTQwNywidXNlcmlkIjo1Mjc5NTIsInVzZXJuYW1lIjoiYW5uYS5wb3BvdnNrYS5maXJlZmx5YjM2In0.nBj-hDm7l4eLQHxCjhiNLc8UeZQZseiw5fKNpssGm1gF8twwGHsOjA7ra7qGZDMwKwo6sLw9egVw2jPUR4xV_WMJ4o02X7x15Ksk5WUXQ1k__7UzvW3vqfkzfXgq93kZW5dknZ97sYh1R06flr0pxICq1QIpOu2JjK3XeXS2VhkPAAzKXdHcEIW_t2ssRnOZe_Cx5l9JrZS-KzvfB-ckEMCdS1YMldTey6GTmllJSYg1ZsgfVWTivAsJKe0OV-4Z40hIDJi2rp4SrfCafyrWS3p3zV4yFhdwpdigc-F0sRQ823cUqoyg54QEmmNQtD5QUPHrlnC3t449gfgVrNlAuw"
        },
        method: 'POST',
        body: JSON.stringify(body),
        mode: 'no-cors',
    })
    .then(_ => console.log(_));
}

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
        this.props.fetchShowsWithRedux()
            // .then(() => getToken())
            .then(() => {
                for(let i = 0; i < this.props.shows.length; i++){
                    // console.log(this.props.shows[i].show);
                    // console.log(store.getState().showsState.shows[i].show);
                    getId(this.props.shows[i].show.ids.tvdb);
                    this.props.fetchPosterWithRedux();
                }
            })
    }

    render(){
        let i = 0;
        return (
            <div>
                <Pagination fetchShowsWithRedux={this.props.fetchShowsWithRedux} />
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
                        <td>No of<br/>Episodes</td>
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
            </div>
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
