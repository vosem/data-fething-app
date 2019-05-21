import React from 'react';
import './Show.css';

function Show (props){

    return (
        <tr className="show">
            <td className="showNumber">{props.showNumber}</td>
            <td className="showPoster"><img src={props.posterUrl} alt={props.posterAlt} height="50px"></img></td>
            <td className="title">{props.show.title}</td>
            <td className="rating">{props.show.rating}</td>
            <td className="year">{props.show.year}</td>
            <td className="showId">{props.show.ids.tvdb}</td>
            <td className="episodes">{props.show.aired_episodes}</td>
        </tr>
    )
}

export default Show;