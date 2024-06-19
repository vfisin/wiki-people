import { DefaultContent } from "../../utils/constants/text-consts";

 const initialState = {
  isLoading: false,
  data: [[]],
  paginatedData: [],
  pageNum: 1,
  totalPages: 0,
  pageSize: 15,
  today: new Date("June 17, 2024 14:45:00"),
  apiError: false,
  pageTitle: DefaultContent.headerTitle,
};


export default initialState