import React from 'react';
import ReactDOM from "react-dom";
import './SearchByTitle.css';
// import Pagination from "./Pagination";

class SearchByTitle extends React.Component {

     // clearInput() {ReactDOM.findDOMNode(this.refs.currentPageInput).value=""};

    render() {
        return (
            <input
                className="search-by-title"
                type="text"
                placeholder="Title"
                onFocus={event => event.target.placeholder = ""}
                onBlur={event => event.target.placeholder = "Title"}
                onKeyUp={event => {this.props.fetchShowsByTitle(event.target.value); console.log('fffffff', ReactDOM.findDOMNode(this.refs.currentPageInput))}}
            />
        )
    }
}

export default SearchByTitle;