import { WikiResponse, Bio, Births } from "../context/wiki-context/types";

// Function to paginate data based on pageNum and pageSize
// export function paginateData(
//     data: Bio[],
//     pageNum: number,
//     pageSize: number
// ): Bio[] {
//   return data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
// }

// Comparator function for sorting profiles by birthYear in descending order
export function birthYearSort(a: Bio, b: Bio): number {
  return parseInt(b.birthYear) - parseInt(a.birthYear);
}

// Function to split data into pages based on pageSize
export function splitDataIntoPages(
    data: Bio[],
    totalPages: number,
    pageSize: number
): Bio[][] {
  let pagedArray: Bio[][] = [];
  for (let i = 0; i < totalPages; i++) {
    pagedArray[i] = data.slice(i * pageSize, (i + 1) * pageSize);
  }
  return pagedArray;
}

// Function to process WikiResponse data into Profile format and paginate it
export const processWikiBirthsData = (
    data: WikiResponse,
    totalPages: number,
    pageNum: number
): Bio[][] => {
  let mData: Bio[] = data.births.map((row: Births) => {
    return {
      name: row.text.split(",")[0],
      title: row.pages[0]?.description
          ? row.pages[0]?.description.split("(")[0]
          : "",
      birthYear: row.year,
      extract: row.pages[0]?.extract,
      bioUrl: row.pages[0]?.content_urls.desktop.page,
      thumbnail: row.pages[0]?.thumbnail?.source,
    };
  });

  // Sort mData by birthYear in descending order and paginate it
  return splitDataIntoPages(mData.sort(birthYearSort), totalPages, pageNum);
};
