import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import WikiContext from './context/wiki-context/context';
import * as wikiService from './services/wikiService/wikiService';
import {
    loadWikiInProgress,
} from './context/actions/actions';
import { WikiState} from "@App/context/wiki-context/types";

// Mock WikiContext
jest.mock('./context/wiki-context/context');

describe('App Component', () => {
    const mockState: WikiState = {
        data: [],
        paginatedData: [],
        isLoading: false,
        apiError: false,
        pageNum: 1,
        totalPages: 10,
        today: new Date(),
        pageSize: 10,
        pageTitle: 'Test'
    };

    const mockDispatch = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders fetch button when data is empty', () => {
        const { getByText } = render(
            <WikiContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
                <App />
            </WikiContext.Provider>
        );
        const fetchButton = getByText('Click to load birthdays');
        expect(fetchButton).toBeInTheDocument();
    });

    it('calls handleClick function on button click', () => {
        const { getByText } = render(
            <WikiContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
                <App />
            </WikiContext.Provider>
        );
        const fetchButton = getByText('Click to load birthdays');
        fireEvent.click(fetchButton);
        expect(mockDispatch).toHaveBeenCalledWith(loadWikiInProgress());
    });

    it('dispatches loadWikiSuccess on successful API call', async () => {
        const mockWikiData = {
            births: [{ name: 'John Doe', dob: '1990-01-01' }],
        };

        // Mock getBirthsData using spyOn
        const spyGetBirthsData = jest.spyOn(wikiService, 'getBirthsData');
        spyGetBirthsData.mockResolvedValueOnce(mockWikiData);

        const { getByText } = render(
            <WikiContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
                <App />
            </WikiContext.Provider>
        );
        const fetchButton = getByText('Click to load birthdays');
        fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(spyGetBirthsData).toHaveBeenCalled(); // Check if getBirthsData is called
            expect(mockDispatch).toHaveBeenCalled();
        });

        spyGetBirthsData.mockRestore(); // Restore the original function
    });

    it('dispatches loadWikiFailure on failed API call', async () => {
        const errorMessage = 'API Error';
        // Mock getBirthsData using spyOn
        const spyGetBirthsData = jest.spyOn(wikiService, 'getBirthsData');
        spyGetBirthsData.mockRejectedValueOnce(new Error(errorMessage));

        const { getByText } = render(
            <WikiContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
                <App />
            </WikiContext.Provider>
        );
        const fetchButton = getByText('Click to load birthdays');
        fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(spyGetBirthsData).toHaveBeenCalled(); // Check if getBirthsData is called
            expect(mockDispatch).toHaveBeenCalled();
        });

        spyGetBirthsData.mockRestore(); // Restore the original function
    });

    it('does not render BioGallery when paginatedData is empty', () => {
        const emptyPaginatedState = { ...mockState, paginatedData: [] };

        const { queryByTestId } = render(
            <WikiContext.Provider value={{ state: emptyPaginatedState , dispatch: mockDispatch }}>
                <App />
            </WikiContext.Provider>
        );

        const bioGallery = queryByTestId('bio-gallery');
        expect(bioGallery).toBeNull();
    });
});
