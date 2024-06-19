import {
  LOAD_WIKI_SUCCESS,
  LOAD_WIKI_IN_PROGRESS,
  LOAD_WIKI_FAILURE,
  PAGE_CHANGE,
  CLOSE_ERROR_MODAL,
  SET_TODAYS_DATE,
} from "../actions/actions";
import { WikiState, Action } from "../wiki-context/types";

const wikiReducer = (state: WikiState, action: Action): WikiState => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_WIKI_SUCCESS: {
      const { data, totalPages } = payload.data;
      return {
        ...state,
        isLoading: false,
        data: data,
        apiError: false,
        totalPages: totalPages,
        paginatedData: data[state.pageNum - 1],
      };
    }
    case LOAD_WIKI_IN_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_WIKI_FAILURE:
      return {
        ...state,
        isLoading: false,
        apiError: true,
      };
    case PAGE_CHANGE:
      const pageNum = payload;
      return {
        ...state,
        pageNum: pageNum,
        paginatedData: state.data[pageNum - 1],
      };
    case CLOSE_ERROR_MODAL:
      return {
        ...state,
        apiError: false,
      };
    case SET_TODAYS_DATE:
      return {
        ...state,
        today: payload,
      };
    default: {
      return state;
    }
  }
};

export default wikiReducer;
