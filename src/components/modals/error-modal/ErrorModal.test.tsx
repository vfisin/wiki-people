import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorModal from './ErrorModal';

// Mock the DefaultContent used
jest.mock("../../../utils/constants/text-consts", () => ({
    DefaultContent: {
        errorMessageLine1: "Mocked Error Line 1",
        errorMessageLine2: "Mocked Error Line 2",
    },
}));

describe('ErrorModal Component', () => {
    it('renders error modal components', () => {
        render(<ErrorModal />);
        expect(screen.getByText('Error Occurred')).toBeInTheDocument();
        expect(screen.getByText('Mocked Error Line 1')).toBeInTheDocument();
        expect(screen.getByText('Mocked Error Line 2')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });


});
