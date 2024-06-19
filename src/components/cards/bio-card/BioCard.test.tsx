import {render, screen } from '@testing-library/react';
import BioCard from './BioCard';
import {MemoryRouter} from "react-router-dom";

describe('Testing Bio Card Component', () => {
    it('should render card with all props', () => {
        const { getByText } = render(
            <MemoryRouter>
            <BioCard
                name="KJ Apa"
                title="New Zealand actor"
                birthYear="1997"
                extract="Keneti James Fitzgerald Apa is a New Zealand actor, singer and musician."
                bioLink="https://www.wikimedia.org/"
                thumbnail="KJ.jpg"

            />
            </MemoryRouter>
        );
        expect(getByText('KJ Apa')).toBeInTheDocument();
        expect(getByText('New Zealand actor')).toBeInTheDocument();
        expect(getByText('Born 1997')).toBeInTheDocument();
        expect(getByText('Keneti James Fitzgerald Apa is a New Zealand actor, singer and musician.')).toBeInTheDocument();
        const link = screen.getByTestId('bio-link')
        expect(link).toHaveAttribute('href', 'https://www.wikimedia.org/');
        const cardImgContainer = screen.getByTestId('card-img-container');
        expect(cardImgContainer).toHaveStyle({
            backgroundImage: 'url(KJ.jpg)',
        });
    });

    it('should render card with no image', () => {
        render(
            <MemoryRouter>
                <BioCard
                    name="Chris Cornell"
                    title="A Great American Singer"
                    birthYear="1965"
                    extract="Chris Cornell was the singer of Soundgarden and Audioslave."
                    bioLink='https://www.wikimedia.org/'
                    thumbnail=""

                />
            </MemoryRouter>
        );

        const cardImgContainer = screen.getByTestId('card-img-container');
        expect(cardImgContainer).not.toHaveStyle({
            backgroundImage: 'url(KJ.jpg)',
        });
    });

});
