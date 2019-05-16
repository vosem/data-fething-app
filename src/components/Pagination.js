import React from 'react';
import store from '../store/index';
import {connect} from 'react-redux';
import { generatePageQuery, generatePrevPageQuery, generateNextPageQuery } from '../actions/actions';
import './Pagination.css';

class Pagination extends React.Component {

    componentDidMount(){}

    setPrevPage(event){ // doesn't work this way
        if (event.target.value > 1) return generatePrevPageQuery(event.target.value - 1)
        else return generatePrevPageQuery(event.target.value);
    }
    render() {
        return (
            <div className="pagination">
                <button
                    value={this.props.queries && this.props.queries.page || 0}
                    onClick={event => {this.setPrevPage(event); this.props.fetchShowsWithRedux()}}
                >
                    {'<'}
                </button>
                <button
                    value="1"
                    onClick={event => {this.props.paginate(event); this.props.fetchShowsWithRedux()}}
                >1</button>
                <input
                    type="text"
                    placeholder="go to page"
                    onFocus={(e) => e.target.placeholder = ""}
                    onBlur={(e) => e.target.placeholder = "go to page"}
                    onKeyUp={event => {this.props.paginate(event); this.props.fetchShowsWithRedux()}}
                />
                <button>Last</button>
                <button
                    value={this.props.queries && this.props.queries.page || 1}
                    onClick={event => {this.props.setNextPage(event); this.props.fetchShowsWithRedux()}}
                >
                    {'>'}
                </button>
            </div>
        )
    }
}

function setNextPage(event){
    return generateNextPageQuery(++event.target.value);
}
function paginate(event) {
    return generatePageQuery(event.target.value);
}
function mapStateToProps(state){
    return {
        queries: state.queryState.queries
    }
}
// const mapDispatchToProps = (dispatch, ownProps) => {
//     setPrevPage: () => dispatch(setPrevPage(event))
// }
export default connect(mapStateToProps, /*mapDispatchToProps,*/ { paginate, /*setPrevPage,*/ setNextPage })(Pagination);