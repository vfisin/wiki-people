export type Action = {
  type: string;
  payload?: any;
};

export type Thumbnail = {
  source: string;
};

export type ArticleUrls = {
  desktop: ArticleUrlDesktop
}

export type ArticleUrlDesktop = {
  page: string
}

export type Page = {
  description: string;
  extract: string;
  thumbnail: Thumbnail;
  content_urls: ArticleUrls
};

export type Births = {
  text: string;
  year: string;
  pages: Page[];
};

export type Bio = {
  name: string;
  title: string;
  birthYear: string;
  extract: string;
  bioUrl: string;
  thumbnail: string;
};

export type WikiResponse = {
  births: Births[];
};

export type WikiState = {
  isLoading: boolean;
  data: Bio[][];
  paginatedData: Bio[];
  pageNum: number;
  totalPages: number;
  pageSize: number;
  today: Date;
  apiError: boolean;
  pageTitle: string;
};
