import React from 'react';
import { render, screen, cleanup  } from '@testing-library/react';
import PageNavigation from './PageNavigation';
import WikiContext from "../../context/wiki-context/context";

describe('PageNavigation Component', () => {
    const mockHandlePageChange = jest.fn();


    const totalPages = 10;
    const pageNum = 1;
    // Initialize WikiContext state using mock dispatch
    const mockContextValue = {
        state: {
            isLoading: false,
            data: [],
            paginatedData: [],
            pageNum: pageNum,
            totalPages: totalPages,
            pageSize: 1,
            today: new Date,
            apiError: false,
            pageTitle: ''
        },
        dispatch: jest.fn(), // Mock dispatch function
    };

    beforeEach(() => {
        render(
            <WikiContext.Provider value={ mockContextValue}>
                <PageNavigation handlePageChange={mockHandlePageChange} />
            </WikiContext.Provider>
        );
    });

    afterEach(cleanup); // Clean up after each test

    it('renders pagination buttons correctly', () => {
        // Find and assert on the presence of navigation buttons
        for (let i = 1; i <= 3; i++) {
            const button = screen.getByText(i.toString());
            expect(button).toBeInTheDocument();
        }

        // Check the presence of navigation buttons (Previous, Next)
        const previousButton = screen.getByText('Back');
        const nextButton = screen.getByText('Next');
        expect(previousButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
    });


});