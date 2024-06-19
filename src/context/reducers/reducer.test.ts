import wikiReducer from './reducer';
import * as actions from '../actions/actions';
import initialState from '../wiki-context/initialState';

describe('Test Reducers', () => {
    it('should handle LOAD_WIKI_IN_PROGRESS', () => {
        expect(wikiReducer(initialState, actions.loadWikiInProgress())).toEqual({...initialState, isLoading: true});
    });

    it('should handle LOAD_WIKI_FAILURE', () => {
        const errorPayload = 'error';
        expect(wikiReducer(initialState, actions.loadWikiFailure(errorPayload))).toEqual({...initialState, isLoading: false, apiError: true});
    });

    it('should handle CLOSE_ERROR_MODAL', () => {
        expect(wikiReducer(initialState, actions.closeErrorModal())).toEqual({...initialState, apiError: false});
    });

    it('should handle PAGE_CHANGE', () => {
        const pageNum = 1;
        expect(wikiReducer(initialState, actions.pageChange(pageNum))).toEqual({
            ...initialState,
            pageNum: pageNum,
            paginatedData: initialState.data[pageNum - 1], // Ensure paginatedData is updated correctly
        });
    });

    it('should handle LOAD_WIKI_SUCCESS', () => {
        const testData = { data: [], totalPages: 0 }; // Example data structure
        expect(wikiReducer(initialState, actions.loadWikiSuccess(testData))).toEqual({
            ...initialState,
            isLoading: false,
            data: testData.data,
            apiError: false,
            totalPages: testData.totalPages,
            paginatedData: testData.data[initialState.pageNum - 1], // Ensure paginatedData is updated correctly
        });
    });

    it('should handle SET_TODAYS_DATE', () => {
        const expectedToday = new Date();
        expect(wikiReducer(initialState, actions.setTodaysDate(expectedToday))).toEqual({
            ...initialState,
            today: expectedToday,
        });
    });

    it('should return the current state for unknown action', () => {
        let unknownAction = { type: 'UNKNOWN_ACTION' };
        expect(wikiReducer(initialState, unknownAction)).toEqual(initialState);
    });
});
