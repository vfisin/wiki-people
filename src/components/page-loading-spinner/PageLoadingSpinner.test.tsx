import React from 'react';
import { render, screen } from '@testing-library/react';
import PageLoadingSpinner from './PageLoadingSpinner';
import { DefaultContent } from '../../utils/constants/text-consts';

describe('PageLoadingCover Component', () => {
  it('renders loading screen and spinner', () => {
    render(<PageLoadingSpinner />);

    const loadingScreen = screen.getByTestId('loading-screen');
    expect(loadingScreen).toBeInTheDocument();
  });

  it('renders the correct loading text', () => {
    render(<PageLoadingSpinner />);

    const loadingText = screen.getByText(DefaultContent.loadingData);
    expect(loadingText).toBeInTheDocument();
  });
});