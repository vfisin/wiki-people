export const LOAD_WIKI_IN_PROGRESS = "LOAD_WIKI_IN_PROGRESS";
export const loadWikiInProgress = () => ({
  type: LOAD_WIKI_IN_PROGRESS,
});
export const LOAD_WIKI_SUCCESS = "LOAD_WIKI_SUCCESS";
export const loadWikiSuccess = (data: any) => ({
  type: LOAD_WIKI_SUCCESS,
  payload: { data },
});
export const LOAD_WIKI_FAILURE = "LOAD_WIKI_FAILURE";
export const loadWikiFailure = (error: any) => ({
  type: LOAD_WIKI_FAILURE,
  payload: error,
});

export const PAGE_CHANGE = "PAGE_CHANGE";
export const pageChange = (pageNum: number) => ({
  type: PAGE_CHANGE,
  payload: pageNum,
});
export const CLOSE_ERROR_MODAL = "CLOSE_ERROR_MODAL";
export const closeErrorModal = () => ({
  type: CLOSE_ERROR_MODAL,
});

export const SET_TODAYS_DATE = "SET_TODAYS_DATE";
export const setTodaysDate = (date: Date) => ({
  type: SET_TODAYS_DATE,
  payload: date,
});
