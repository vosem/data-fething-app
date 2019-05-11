import React from 'react';
import {connect} from 'react-redux';
import './Show.css';
import no_poster from '../assets/no_poster.jpg';

let posterUrl,
    posterAlt;

class Show extends React.Component {

    componentDidMount(){}

    render() {
        if (this.props.posters) {
            posterUrl = this.props.posters.filter(poster => {
                return poster.poster.thetvdb_id === this.props.showId.toString();
            })
            if(posterUrl) {
                // posterUrl = posterUrl[0].poster.tvthumb[0].url;
                if(posterUrl[0] && posterUrl[0].poster && posterUrl[0].poster.tvposter) {
                    posterUrl = posterUrl[0].poster.tvposter[0].url;
                    posterAlt = posterUrl;
                } else{
                    posterUrl = { no_poster }.no_poster;
                    posterAlt = 'no poster'
                }
            }
        }

        return (
            <tr className="show">
                <td className="showNumber">{this.props.showNumber}</td>
                <td className="showId">{this.props.show.ids.tvdb}</td>
                {
                    this.props.posters &&
                    <td className="showPoster"><img src={posterUrl} alt={posterAlt} height="50px"></img></td>
                }
                <td className="title">{this.props.show.title}</td>
                <td className="rating">{this.props.show.rating}</td>
                <td className="year">{this.props.show.year}</td>
                <td className="episodes">{this.props.show.aired_episodes}</td>
            </tr>
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
export default connect(mapStateToProps)(Show);