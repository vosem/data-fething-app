import React from 'react';
import Show from "./Show";
import no_poster from "../../assets/no_poster.jpg";

class Shows extends React.Component {

    render(){
        let shows = this.props.shows,
            posterUrl,
            poster,
            posterAlt,
            showIndex = this.props.queries ? 10 * (this.props.queries.page - 1) : 1;

        shows = shows && shows.map((show, i) => {
            showIndex++;
            if (this.props.posters) {
                poster = this.props.posters.filter(poster => {
                    return poster.poster.thetvdb_id === show.ids.tvdb.toString();
                });
                if(poster[0] && poster[0].poster.tvthumb) {
                    posterUrl = poster[0].poster.tvthumb[0].url;
                    posterAlt = posterUrl;
                } else if (poster[0] && poster[0].poster.tvposter){
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
                showNumber={showIndex}
                show={show}
            />)}

        );
        return(
            <tbody>{shows}</tbody>
        )
    }

}

export default Shows;