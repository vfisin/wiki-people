import apiClient from './apiClient'; // Replace with your file path

describe('apiClient function', () => {
    beforeEach(() => {
        // Mock the fetch function
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ data: 'mock data' }),
        }) as jest.MockedFunction<typeof global.fetch>;
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    it('calls fetch with correct URL and options', async () => {
        const url = 'https://api.example.com/data';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // Call the function under test
        await apiClient(url, options);

        // Assert fetch was called with correct URL and options
        expect(fetch).toHaveBeenCalledWith(url, options);
    });

    it('returns data from fetch response', async () => {
        const url = 'https://api.example.com/data';

        // Call the function under test
        const result = await apiClient(url);

        // Assert that the function returns the correct data
        expect(result).toEqual({ data: 'mock data' });
    });

    it('throws error on non-OK response', async () => {
        const url = 'https://api.example.com/data';
        const errorMessage = 'HTTP error! Status: 404';

        // Mock a failed fetch response
        // @ts-ignore
        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText: 'Not Found',
        });

        // Call the function under test and expect it to throw an error
        await expect(apiClient(url)).rejects.toThrow(errorMessage);
    });

    it('throws error on fetch failure', async () => {
        const url = 'https://api.example.com/data';
        const errorMessage = 'Network request failed';

        // Mock a fetch failure (e.g., network error)
        // @ts-ignore
        global.fetch.mockRejectedValueOnce(new Error(errorMessage));

        // Call the function under test and expect it to throw an error
        await expect(apiClient(url)).rejects.toThrow(errorMessage);
    });
});
