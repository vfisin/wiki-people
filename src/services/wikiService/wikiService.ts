import apiClient from "../apiClient";

const BASE_URL =
  "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births";

export const getBirthsData = async (month: string, day: string) => {
  return apiClient(`${BASE_URL}/${month}/${day}`, {
    method: "GET",
  });
};
