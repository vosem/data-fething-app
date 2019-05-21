import React from 'react';
import Show from "./Show";
import no_poster from "../assets/no_poster.jpg";

class Shows extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        let shows = this.props.shows || [];
        let posterUrl,
            poster,
            posterAlt;
        shows = shows.map((show, i) => {
            if (this.props.posters) {
                poster = this.props.posters.filter(poster => {
                    return poster.poster.thetvdb_id === show.ids.tvdb.toString();
                });
                if(poster[0] && poster[0].poster.tvposter) {
                    posterUrl = poster[0].poster.tvposter[0].url;
                    posterAlt = posterUrl;
                } else{
                    posterUrl = { no_poster }.no_poster;
                    posterAlt = 'no poster'
                }
            }
            return (<Show
                posters = {this.props.posters}
                posterUrl = {posterUrl}
                posterAlt = {posterAlt}
                key={i+1}
                showNumber={i+1}
                show={show}
            />)}
        );
        return(
            <tbody>{shows}</tbody>
        )
    }

}

export default Shows;