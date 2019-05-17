import React from 'react';
import {connect} from 'react-redux';
import './Pagination.css';

class Pagination extends React.Component {

    render() {
        let lastPage = this.props.queries && this.props.queries.pagesTotal || 1;
        let currentPage = this.props.queries && this.props.queries.page || 1;
        let placeholder = `Current page: ${currentPage}`;
        return (
            <div className="pagination">
                <button
                    disabled={currentPage < 2}
                    value={currentPage}
                    onClick={() => this.props.fetchShowsByPage(+currentPage - 1)}
                >
                    {'<'}
                </button>
                <button
                    disabled={currentPage === "1"}
                    onClick={event => this.props.fetchShowsByPage(1)}
                >1</button>
                <input
                    type="text"
                    placeholder={placeholder}
                    onFocus={(e) => e.target.placeholder = ""}
                    onBlur={(e) => e.target.placeholder = placeholder}
                    onKeyUp={event => this.props.fetchShowsByPage(event.target.value)}
                />
                <button
                    value={ lastPage }
                    onClick={() => this.props.fetchShowsByPage(lastPage)}
                >
                    Last page: { lastPage }
                </button>
                <button
                    disabled={currentPage > lastPage - 1}
                    value={currentPage}
                    onClick={() => this.props.fetchShowsByPage(+currentPage + 1)}
                >
                    {'>'}
                </button>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        queries: state.queryState.queries
    }
}

export default connect(mapStateToProps)(Pagination);