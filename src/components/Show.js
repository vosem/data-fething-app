import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

let posterUrl = '';
let posterId = 0;
const createPosterUrl = (posterId) =>{

    posterUrl = `http://private-anon-d2c67a30e4-fanarttv.apiary-proxy.com/v3/tv/${posterId}?api_key=ab75dec43906f846e6200633b9ad43c7&&client_key=4c61b1676e8869c4553df95839f5a827`;
    // console.log(posterUrl);
    return posterUrl;
};
// let idd = -1;

class Show extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        posterId=this.props.show.ids.tvdb;
        createPosterUrl(this.props.show.ids.tvdb);
        this.props.fetchPosterWithRedux();

    }

    render() {
        this.props.posters && this.props.posters[this.props.showId] && this.props.posters[this.props.showId].poster &&
        console.log(this.props.posters[this.props.showId].poster.tvthumb[0].url);

        if (this.props.posters) {
            for (let i = 0; i < this.props.posters.length; i++) {

            }
        }


            return (

                <tr className="show">
                    <td className="key">{this.props.showId}</td>
                    <td className="id">{this.props.show.ids.tvdb}</td>
                    {
                        this.props.posters && this.props.posters[this.props.showId] && this.props.posters[this.props.showId].poster &&
                        <td><img src={this.props.posters[this.props.showId].poster.tvthumb[0].url} alt={this.props.posters[this.props.showId].poster.tvthumb[0].url} height="50px"></img></td>

                    }
                    <td className="posterImage"></td>
                    <td className="title">{this.props.show.title}</td>
                    <td className="rating">{this.props.show.rating}</td>
                </tr>
            )
    }
}

function fetchPosterRequest(){
    return {
        type: "FETCH_POSTER_REQUEST"
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

// function getId(tmdbId) {
//     const showId = 289590;
//     return showId;
// }

function fetchPoster(input, init) {
    // const showId = getId();
    // const URL = `http://private-anon-d2c67a30e4-fanarttv.apiary-proxy.com/v3/tv/${showId}?api_key=ab75dec43906f846e6200633b9ad43c7&&client_key=4c61b1676e8869c4553df95839f5a827`;
    const URL = createPosterUrl(posterId);
    // console.log(URL);

    return fetch(URL, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then( response => Promise.all([response, response.json()]));
}
function fetchPosterWithRedux() {
    return (dispatch) => {
        // dispatch(fetchPosterRequest());
        return fetchPoster()
            .then(([response, json]) =>{
                if(response.status === 200){
                    dispatch(fetchPosterSuccess(json))
                }
                else{
                    dispatch(fetchPosterError())
                }
            })
    }
}

function mapStateToProps(state){
    return {
        posters: state.posterState.posters,
        // shows: state.showsState.shows
    }
}
export default connect(mapStateToProps, {fetchPosterWithRedux})(Show);



// import React from 'react';
//
// const Show = ({ show }) => {
//
//     const {
//         id,
//         poster,
//         title,
//         rank
//     } = show;
//
//     return(
//         <tr className = "show">
//             <td className="id" >{ id }</td>
//             <td className="poster" >{ poster }</td>
//             <td className="title" >{ title }</td>
//             <td className="rank" >{ rank }</td>
//         </tr>
//     )
// }
//
// export default Show;