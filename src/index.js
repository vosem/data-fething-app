import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/index';
import {Provider, connect} from 'react-redux';
import {
    fetchShowsSuccess,
    fetchShowsError,
    fetchPosterSuccess,
    fetchPosterError,
    generateYearQuery,
    generateTitleQuery,
    fetchCurrentPage,
    fetchPagesTotal,
    generateSortingQuery,
    generatePageQuery
} from './actions/actions';
import Show from './components/Show';
import SearchByTitle from "./components/SearchByTitle";
import SearchByYear from "./components/SearchByYear";
import SortShows from "./components/SortShows";
import Pagination from "./components/Pagination";
import './index.css';


async function fetchShows(options) {
    console.log('start fetchShows', options);
    const { title, year, sorting, page, limit, } = options || {};
    const path = ( sorting && sorting !== 'popular' ? [ 'shows', sorting, ] : ['search', 'show', ] ).join('/');
    const query = {
        extended: 'full',
        query: title || '',
        fields: 'title',
        years: year,
        page: page || 0,
        limit: limit || 10,
    };
    const q = Object.keys(query)
        .filter(_ => _==='query' || query[_] )
        .map(_ => [ _, query[_] ].map(_ => encodeURIComponent(_)).join('=') )
        .join('&');
    const url = `https://api.trakt.tv/${ path }?${ q }`;
    const headers = {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": "31f15cbdee3e55e2ceca6cd2e0e3ba9791b4f1feb1f7bab08c3d8ca6e018609a"
    };
    const response = await fetch(url, { headers });
    let json = await response.json();
    json = json.map(_ => {
        const { score, show, type } = _ || {};
        return { score, type, ...show };
    });
    const currentPage = response.headers.get('x-pagination-page');
    const pagesTotal = response.headers.get('x-pagination-page-count');
    console.log('return fetchShows', json);
    return { json, currentPage, pagesTotal };
}

async function fetchPoster(showId) {
    console.log('starts fetchPoster', showId);
    const path = [ 'v3', 'tv', showId, ].join('/');
    const query = {
        api_key: 'ab75dec43906f846e6200633b9ad43c7',
        client_key: '4c61b1676e8869c4553df95839f5a827',
    };
    const q = Object.keys(query)
        .filter(_ => query[_] )
        .map(_ => [ _, query[_] ].map(_ => encodeURIComponent(_)).join('=') )
        .join('&');
    const url = `http://private-anon-d2c67a30e4-fanarttv.apiary-proxy.com/${ path }?${ q }`;
    // const url = `https://api.thetvdb.com/series/${showId}/images/query?keyType=poster`;              //tvdb
    const headers = {
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTc5MDE4MDcsImlkIjoiZGF0YS1mZXRjaGluZy1hcHAiLCJvcmlnX2lhdCI6MTU1NzgxNTQwNywidXNlcmlkIjo1Mjc5NTIsInVzZXJuYW1lIjoiYW5uYS5wb3BvdnNrYS5maXJlZmx5YjM2In0.nBj-hDm7l4eLQHxCjhiNLc8UeZQZseiw5fKNpssGm1gF8twwGHsOjA7ra7qGZDMwKwo6sLw9egVw2jPUR4xV_WMJ4o02X7x15Ksk5WUXQ1k__7UzvW3vqfkzfXgq93kZW5dknZ97sYh1R06flr0pxICq1QIpOu2JjK3XeXS2VhkPAAzKXdHcEIW_t2ssRnOZe_Cx5l9JrZS-KzvfB-ckEMCdS1YMldTey6GTmllJSYg1ZsgfVWTivAsJKe0OV-4Z40hIDJi2rp4SrfCafyrWS3p3zV4yFhdwpdigc-F0sRQ823cUqoyg54QEmmNQtD5QUPHrlnC3t449gfgVrNlAuw'
    };
    const response = await fetch(url, {
        headers,
        // mode: 'no-cors'
    });

    const json = await response.json();
    console.log('fetchSreturn fetchPoster', json);
    return json;
}

function fetchShowsWithRedux(options) {
    console.log('start fetchShowsWithRedux', options);
    return async (dispatch) => {
        console.log('dispatch fetchShowsWithRedux');
        try {
            const { json, currentPage, pagesTotal } = await fetchShows(options);
            dispatch(fetchShowsSuccess(json));
            dispatch(fetchCurrentPage(currentPage));
            dispatch(fetchPagesTotal(pagesTotal));
            console.log(currentPage, pagesTotal);
        } catch (e) {
            dispatch(fetchShowsError());
        }
    }
}

function fetchPosterWithRedux(showId) {
    console.log('start fetchPosterWithRedux', showId);
    return async ( dispatch ) => {
        console.log('dispatch fetchPosterWithRedux');
        try {
            const json = await fetchPoster(showId);
            dispatch(fetchPosterSuccess(json));
        } catch (e) {
            dispatch(fetchPosterError());
        }
    }
}

async function getToken() {
    const url = "https://api.thetvdb.com/login";
    const body = JSON.stringify({
        "apikey": "I9BNICRZC43FVWDE",
        "userkey": "MMNF6OV4HH7K4YIS",
        "username": "anna.popovska.fireflyb36"
    });
    const headers = new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "PostmanRuntime/7.13.0",
        "Cache-Control": "no-cache",
        "Host": "api.thetvdb.com",
        "content-length": body.length
    });
    // const response = await fetch(new Request(url, {
    //     method: 'POST',
    //     headers,
    //     // mode: "no-cors",
    //     body,
    //     cache: "reload",
    // }));

    const response = await function (){
        const xhr = new XMLHttpRequest();
        console.log(xhr);
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send(body);
        xhr.onreadystatechange = () => {
            if (xhr.readyState != xhr.DONE) {
                console.log(`readyState = ${xhr.readyState}`);
            } else if (xhr.status == 200) {
                console.log('xhr.responseText', xhr.responseText);
                return (xhr.responseText);
            } else {
                console.log(`Error!!!`);
                return(xhr.status);
            }
        }
    }
    response();
    console.log(url);
    console.log(headers);
    console.log(body);
    console.log(response);
    return response;
}

///////////////////////// React component //////////////////////

class App extends React.Component {

    async componentDidMount() {
        await this.props.fetchShowsWithRedux();
        this.fetchPosters();
        // getToken();
        // .then(() => {
        //     for(let i = 0; i < this.props.shows.length; i++){
        //         // console.log(this.props.shows[i].show);
        //         // console.log(store.getState().showsState.shows[i].show);
        //         getId(this.props.shows[i].show.ids.tvdb);
        //         this.props.fetchPosterWithRedux();
        //     }
        // })
    }

    fetchPosters = () => {
        const shows = store.getState().showsState.shows || [];
        shows.forEach((show) => this.props.fetchPosterWithRedux(show.ids.tvdb));
    }

    fetchShowsByTitle = async (title) => {
        this.props.generateTitleQuery(title);
        const options = store.getState().queryState.queries;
        await this.props.fetchShowsWithRedux(options);
        this.fetchPosters();
    }

    fetchShowsByYear = async (year) => {
        this.props.generateYearQuery(year);
        const options = store.getState().queryState.queries;
        await this.props.fetchShowsWithRedux(options);
        this.fetchPosters();
    }

    fetchShowsBySorting = async (sorting) => {
        this.props.generateSortingQuery(sorting);
        const options = store.getState().queryState.queries;
        await this.props.fetchShowsWithRedux(options);
        this.fetchPosters();
    }

    fetchShowsByPage = async (page) => {
        this.props.generatePageQuery(page);
        const options = store.getState().queryState.queries;
        await this.props.fetchShowsWithRedux(options);
        this.fetchPosters();
    }

    render(){
        let shows = this.props.shows || [];
        shows = shows.map((show, i) => (<Show
                key={i+1}
                showNumber={i+1}
                showId={show.ids.tvdb}
                show={show}
            />)
        );

        return (

            <div>
                <Pagination
                    fetchShowsByPage={this.fetchShowsByPage}
                />
                <table>
                    <tbody>
                    <tr>
                        <td colSpan="3">
                            <SortShows fetchShowsBySorting={this.fetchShowsBySorting} />
                        </td>
                        <td>
                            <SearchByTitle fetchShowsByTitle={this.fetchShowsByTitle} />
                        </td>
                        <td>Rank</td>
                        <td>
                            <SearchByYear fetchShowsByYear={this.fetchShowsByYear} />
                        </td>
                        <td>No of<br/>Episodes</td>
                    </tr>
                    {shows}
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

let Container = connect(mapStateToProps, {
    fetchPosterWithRedux,
    fetchShowsWithRedux,
    generateTitleQuery,
    generateYearQuery,
    generateSortingQuery,
    generatePageQuery
})(App);

ReactDOM.render(
    <div>
        <Provider store={store}>
            <Container />
        </Provider>
    </div>,
    document.getElementById('root')
);
