import React from 'react';
import store from '../../store';
import {connect} from 'react-redux';
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
} from '../../actions';
import Pagination from "../presentational/Pagination";
import ShowsTable from "../presentational/ShowsTable";

async function fetchShows(options) {

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
    return { json, currentPage, pagesTotal };
}

async function fetchPoster(showId) {
    const path = [ 'v3', 'tv', showId, ].join('/');
    const query = {
        api_key: 'ab75dec43906f846e6200633b9ad43c7',
        client_key: '4c61b1676e8869c4553df95839f5a827',
    };
    const q = Object.keys(query)
        .filter(_ => query[_] )
        .map(_ => [ _, query[_] ].map(_ => encodeURIComponent(_)).join('=') )
        .join('&');
    const url = `https://private-anon-d2c67a30e4-fanarttv.apiary-proxy.com/${ path }?${ q }`;
    const headers = {
        "Content-Type": "application/json"
    };
    const response = await fetch(url, {
        headers,
        // mode: 'no-cors'
    });

    const json = await response.json();
    return json;
}

function fetchShowsWithRedux(options) {
    return async (dispatch) => {
        try {
            const { json, currentPage, pagesTotal } = await fetchShows(options);
            dispatch(fetchShowsSuccess(json));
            dispatch(fetchCurrentPage(currentPage));
            dispatch(fetchPagesTotal(pagesTotal));
        } catch (e) {
            dispatch(fetchShowsError());
        }
    }
}

function fetchPosterWithRedux(showId) {
    return async ( dispatch ) => {
        try {
            const json = await fetchPoster(showId);
            dispatch(fetchPosterSuccess(json));
        } catch (e) {
            dispatch(fetchPosterError());
        }
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.generateTitleQuery = this.props.generateTitleQuery.bind(this);
        this.generateYearQuery = this.props.generateYearQuery.bind(this);
        this.generatePageQuery = this.props.generatePageQuery.bind(this);
        this.typingTimer = 0;
        this.state = { contentReady: false }
    }

    async componentDidMount() {
        await this.props.fetchShowsWithRedux();
        await this.fetchPosters();
    }

    fetchPosters = async () => {
        const shows = store.getState().showsState.shows || [];
        const posters = store.getState().postersState.posters;
        await shows.forEach( (show) => {
            if (posters)
            {
                if (posters.filter((item) => +item.poster.thetvdb_id === show.ids.tvdb).length !== 0){
                    return;
                } else return this.props.fetchPosterWithRedux(show.ids.tvdb);
            } else return this.props.fetchPosterWithRedux(show.ids.tvdb);
        })
    }

    fetchShowsByTitle = (title) => {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(
            async () => {
                this.generateTitleQuery(title);
                this.generatePageQuery(1);
                const options = store.getState().queryState.queries;
                await this.props.fetchShowsWithRedux(options);
                this.fetchPosters();
            }, 500);
    }

    fetchShowsByYear = (year) => {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(
            async () => {
                if (isNaN(year)) {
                    alert("Sorry. There should be a four-digit-number!")
                } else {
                    this.generateYearQuery(year);
                    this.generatePageQuery(1);
                    const options = store.getState().queryState.queries;
                    await this.props.fetchShowsWithRedux(options);
                    this.fetchPosters();
                }
            }, 500);
    }

    fetchShowsBySorting = async (sorting) => {
        this.props.generateSortingQuery(sorting);
        this.props.generatePageQuery(1);
        const options = store.getState().queryState.queries;
        await this.props.fetchShowsWithRedux(options);
        this.fetchPosters();
    }

    get pageCurrent () {
        const {queries} = store.getState().queryState || {};
        const {page} = queries || {};
        return +page || 1;
    }
    get pagesTotal () {
        const {queries} = store.getState().queryState || {};
        const {pagesTotal} = queries || {};
        return +pagesTotal || 1;
    }

    fetchShowsByPage = async (pageIndex) => {
        this.props.generatePageQuery(pageIndex);
        const options = store.getState().queryState.queries;
        await this.props.fetchShowsWithRedux(options);
        this.fetchPosters();
    }

    render(){
        return (
            <div>
                <Pagination
                    currentPage={ this.pageCurrent }
                    pagesTotal={ this.pagesTotal }
                    onChange={ this.fetchShowsByPage }
                />
                <ShowsTable
                    posters={this.props.posters}
                    shows={this.props.shows}
                    queries={this.props.queries}
                    onSortingChange={this.fetchShowsBySorting}
                    onTitleChange={this.fetchShowsByTitle}
                    onYearChange={this.fetchShowsByYear}
                />
                <Pagination
                    currentPage={ this.pageCurrent }
                    pagesTotal={ this.pagesTotal }
                    onChange={ this.fetchShowsByPage.bind(this) }
                />
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

export default Container;
