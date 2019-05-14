const FETCH_SHOWS_SUCCESS = "FETCH_SHOWS_SUCCESS";
export const fetchShowsSuccess = payload =>({
        type: FETCH_SHOWS_SUCCESS,
        payload
})

function fetchShowsError() {
    return {
        type: "FETCH_SHOWS_ERROR"
    }
}

function fetchPosterSuccess(payload) {
    return {
        type: "FETCH_POSTER_SUCCESS",
        payload
    }
}

function fetchPosterError() {
    return {
        type: "FETCH_POSTER_ERROR"
    }
}
function generateTitleQuery(payload) {
    return {
        type: "GENERATE_TITLE_QUERY",
        payload
    }
}
function generateYearQuery(payload) {
    return {
        type: "GENERATE_YEAR_QUERY",
        payload
    }
}
function generateSortingQuery(payload) {
    return {
        type: "GENERATE_SORTING_QUERY",
        payload
    }
}
export {
    fetchShowsError,
    fetchPosterSuccess,
    fetchPosterError,
    generateTitleQuery,
    generateYearQuery,
    generateSortingQuery
}