import { render, screen } from '@testing-library/react';
import {DefaultContent} from "../../utils/constants/text-consts";
import Header from "./Header";
import {WikiDataProvider} from "../../context/wiki-context/provider";

const renderWithContext = () => {
    return render(
        <WikiDataProvider>
            <Header />
        </WikiDataProvider>
    );
};

describe('Header Component', () => {
    it('renders the logo with correct alt text', () => {
        renderWithContext();
        const logo = screen.getByAltText('Logo');
        expect(logo).toBeInTheDocument();
    });

    it('renders the site name', () => {
        renderWithContext();
        const siteName = screen.getByText('Wikipedia');
        expect(siteName).toBeInTheDocument();
    });

    it('renders the page title', () => {
        renderWithContext();
        const siteTitle = screen.getByText(DefaultContent.headerTitle);
        expect(siteTitle).toBeInTheDocument();
    });


});