import React from 'react';
import './Show.css';
import no_poster from '../assets/no_poster.jpg';

function Show (props){

    let posterUrl,
        poster,
        posterAlt;
    if (props.posters) {
        poster = props.posters.filter(poster => {
            return poster.poster.thetvdb_id === props.showId.toString();
        })
        if(poster) {
            if(poster[0] && poster[0].poster && poster[0].poster.tvposter) {
                posterUrl = poster[0].poster.tvposter[0].url;
                posterAlt = posterUrl;
            } else{
                posterUrl = { no_poster }.no_poster;
                posterAlt = 'no poster'
            }
        }
    }

    return (
        <tr className="show">
            <td className="showNumber">{props.showNumber}</td>
            <td className="showId">{props.show.ids.tvdb}</td>
            {
                props.posters &&
                <td className="showPoster"><img src={posterUrl} alt={posterAlt} height="50px"></img></td>
            }
            <td className="title">{props.show.title}</td>
            <td className="rating">{props.show.rating}</td>
            <td className="year">{props.show.year}</td>
            <td className="episodes">{props.show.aired_episodes}</td>
        </tr>
    )
}

export default Show;