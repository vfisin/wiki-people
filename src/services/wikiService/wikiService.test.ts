
import apiClient from '../apiClient';
import {getBirthsData} from "../../services/wikiService/wikiService";

// Mock apiClient module
jest.mock('../apiClient', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('getBirthsData function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    it('calls apiClient with correct URL and method', async () => {
        const month = '06';
        const day = '19';
        const expectedUrl = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`;

        // Mock apiClient response
        const mockResponse = { data: 'mock data' };
        (apiClient as jest.Mock).mockResolvedValue(mockResponse);

        // Call the function under test
        await getBirthsData(month, day);

        // Assert that apiClient was called with the correct URL and method
        expect(apiClient).toHaveBeenCalledWith(expectedUrl, {
            method: 'GET',
        });
    });

    it('returns data from apiClient', async () => {
        const month = '06';
        const day = '19';
        const mockResponse = { data: 'mock data' };
        (apiClient as jest.Mock).mockResolvedValue(mockResponse);

        // Call the function under test
        const result = await getBirthsData(month, day);

        // Assert that the function returns the correct data
        expect(result).toEqual(mockResponse);
    });

    it('handles errors from apiClient', async () => {
        const month = '06';
        const day = '19';
        const errorMessage = 'Error fetching data';
        (apiClient as jest.Mock).mockRejectedValue(new Error(errorMessage));

        // Call the function under test
        await expect(getBirthsData(month, day)).rejects.toThrow(errorMessage);
    });
});
