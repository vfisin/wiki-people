import React from 'react';
import { render, screen } from '@testing-library/react';
import BioGallery from './BioGallery';
import {Bio, WikiState} from '../../context/wiki-context/types';
import { DefaultContent } from '../../utils/constants/text-consts';
import WikiContext from '../../context/wiki-context/context';

// Mock data for testing
const mockState: WikiState = {
    isLoading: false,
    data: [
        [
            {
                name: 'John Doe',
                title: 'Engineer',
                birthYear: '1985',
                extract: 'Lorem ipsum',
                thumbnail: 'john-doe.jpg',
                bioUrl: 'https://example.com/john-doe',
            },
            {
                name: 'Jane Smith',
                title: 'Scientist',
                birthYear: '1990',
                extract: 'Dolor sit amet',
                thumbnail: 'jane-smith.jpg',
                bioUrl: 'https://example.com/jane-smith',
            },
        ],
    ],
    paginatedData: [
        {
            name: 'John Doe',
            title: 'Engineer',
            birthYear: '1985',
            extract: 'Lorem ipsum',
            thumbnail: 'john-doe.jpg',
            bioUrl: 'https://example.com/john-doe',
        },
        {
            name: 'Jane Smith',
            title: 'Scientist',
            birthYear: '1990',
            extract: 'Dolor sit amet',
            thumbnail: 'jane-smith.jpg',
            bioUrl: 'https://example.com/jane-smith',
        },
    ],
    pageNum: 1,
    totalPages: 1,
    pageSize: 1,
    today: new Date('June 17, 2024 14:45:00'),
    apiError: false,
    pageTitle: DefaultContent.headerTitle,
};

describe('BioGallery Component', () => {
    it('renders bios when data is available', () => {
        render(
            <WikiContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
                <BioGallery />
            </WikiContext.Provider>
        );

        // Check if each bio card is rendered
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();

        // Check if "No data available" message is not rendered
        expect(screen.queryByText('No data available')).not.toBeInTheDocument();
    });

    it('renders "No data available" when paginatedData is empty', () => {
        // Modify context state to simulate empty paginatedData
        const wikiContextValue = { ...mockState, paginatedData: [] };

        render(
            <WikiContext.Provider value={{ state: wikiContextValue, dispatch: jest.fn() }}>
                <BioGallery />
            </WikiContext.Provider>
        );

        // Check if "No data available" message is rendered
        expect(screen.getByText('No data available')).toBeInTheDocument();

        // Check if no bio cards are rendered
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
});
