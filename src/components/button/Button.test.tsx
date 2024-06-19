import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Import userEvent for simulating events

import Button from './Button';

describe('Testing Button Component', () => {
    it('should render a button with name "Load"', () => {
        const { getByText } = render(<Button name="Load" />);
        expect(getByText('Load')).toBeInTheDocument();
    });

    it('should render a disabled "Load" button', () => {
        const { getByText } = render(<Button name="Load" disabled={true} />);
        expect(getByText('Load')).toBeDisabled();
    });

    it('should handle onClick event', async () => {
        const handleClick = jest.fn();
        const { getByText } = render(<Button name="Click Me" clickHandler={handleClick} />);

        await userEvent.click(getByText('Click Me'));

        expect(handleClick).toHaveBeenCalled();
    });
});
