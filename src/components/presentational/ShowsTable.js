import React from 'react';
import SortShows from "./SortShows";
import SearchByTitle from "./SearchByTitle";
import SearchByYear from "./SearchByYear";
import Shows from "./Shows";
import './ShowsTable.css';

export default function ShowsTable (props) {
    return(
        <table>
            <thead>
            <tr>
                <td colSpan="2">
                    <SortShows onSortingChange={props.onSortingChange} />
                </td>
                <td>
                    <SearchByTitle onTitleChange={props.onTitleChange} />
                </td>
                <td>Rank</td>
                <td>
                    <SearchByYear onYearChange={props.onYearChange} />
                </td>
                <td>TVDB Id</td>
                <td>No of<br/>Episodes</td>
            </tr>
            </thead>
            <Shows
                posters={props.posters}
                shows={props.shows}
                queries={props.queries}
            />
        </table>
    )
}