import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Pagination.css';

class Pagination extends React.Component {

    typingTimer;
    clearInput = () => {ReactDOM.findDOMNode(this.refs.currentPageInput).value=""};

    render() {
        const lastPage = Math.max( +this.props.pagesTotal, 1 );
        const currentPage = Math.min( Math.max( +this.props.currentPage, 1 ), lastPage);
        const placeholder = `Current page: ${currentPage}`;
        return (
            <div className="pagination">
                <button
                    disabled={currentPage < 2}
                    value={currentPage}
                    onClick={() => {this.props.onChange( Math.max(+currentPage - 1, 1) ); this.clearInput()}}
                >
                    {'<'}
                </button>
                <button
                    disabled={currentPage === 1}
                    onClick={() => {this.props.onChange(1); this.clearInput();}}
                >
                    1
                </button>
                <input
                    ref="currentPageInput"
                    type="text"
                    placeholder={placeholder}
                    onFocus={(e) => e.target.placeholder = ""}
                    onBlur={(e) => e.target.placeholder = placeholder}
                    onKeyUp={event => {
                            let pageIndex = +event.target.value;
                            clearTimeout(this.typingTimer);
                            this.typingTimer = setTimeout(() => {
                                if (isNaN(pageIndex)) {
                                    alert("Sorry. There should be a number!")
                                } else {
                                    pageIndex = pageIndex > this.props.pagesTotal ? this.props.pagesTotal : pageIndex;
                                    if (pageIndex > 0) {
                                        this.props.onChange(pageIndex);
                                        this.clearInput();
                                    }
                                }
                            }, 1000);
                        }
                    }
                />
                <button
                    value={ lastPage }
                    onClick={() => {this.props.onChange(lastPage); this.clearInput()}}
                >
                    Last page: { lastPage }
                </button>
                <button
                    disabled={currentPage > lastPage - 1}
                    value={currentPage}
                    onClick={() => {
                        this.props.onChange(+currentPage + 1); this.clearInput()}}
                >
                    {'>'}
                </button>
            </div>
        )
    }
}

Pagination.propTypes = {
    pagesTotal: PropTypes.number,
    currentPage: PropTypes.number
};

export default Pagination;