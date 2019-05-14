import {combineReducers} from "redux";

const posterReducer = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_POSTER_SUCCESS":
            return Object.assign({}, state, {
                posters: [
                    ...state.posters || [],
                    {
                        poster: action.payload
                    }
                ]
            });
        default:
            return state;
    }
}

const showsReducer = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_SHOWS_SUCCESS":
            return {...state, shows: action.payload};
        case "SEARCH_SHOWS_SUCCESS":
            return {...state, shows: action.payload};
        default:
            return state;
    }
}

const queryReducer = (state = {}, action) => {
    switch (action.type) {
        case "GENERATE_SORTING_QUERY":
            return Object.assign({}, state, {
                queries: {
                    ...state.queries,
                    sorting: action.payload
                }
            });
        case "GENERATE_TITLE_QUERY":
            return Object.assign({}, state, {
                queries: {
                    ...state.queries,
                    title: action.payload
                }
            });
        case "GENERATE_YEAR_QUERY":
            return Object.assign({}, state, {
                queries: {
                    ...state.queries,
                    year: action.payload
                }
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    postersState: posterReducer,
    showsState: showsReducer,
    queryState: queryReducer
});

export default rootReducer;