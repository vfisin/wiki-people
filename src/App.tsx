import "./styles.css";

import React, { useEffect, useContext } from "react";
import {
  loadWikiInProgress,
  loadWikiFailure,
  loadWikiSuccess,
  setTodaysDate,
} from "./context/actions/actions";

import { getBirthsData } from "./services/wikiService/wikiService";
import WikiContext from "../src/context/wiki-context/context";
import { WikiResponse } from "./context/wiki-context/types";
import { processWikiBirthsData } from "./utils/commonUtils";
import  PageLoadingSpinner  from "./components/page-loading-spinner/PageLoadingSpinner";
import  ErrorModal  from "./components/modals/error-modal/ErrorModal";
import  BioGallery  from "./features/bio-gallery/BioGallery";
import { DefaultContent } from "./utils/constants/text-consts";
import Button from "./components/button/Button";
import HomeLayout from "./layout/home-page/HomeLayout";

export default function App() {
  const { state, dispatch } = useContext(WikiContext);
  const {
    data,
    paginatedData,
    isLoading,
    apiError,
    pageNum,
    today,
    pageSize,
  } = state;

  useEffect(() => {
    dispatch(setTodaysDate(new Date()));
  }, [dispatch]);

  const getWikiBirthsData = async () => {
    try {
      dispatch(loadWikiInProgress());
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const wikiData: WikiResponse =  await getBirthsData(month, day);
      const wikiDataTotalPages = Math.ceil(wikiData.births.length / pageSize);
      const profileData = processWikiBirthsData(
        wikiData,
        wikiDataTotalPages,
        pageSize
      );

      dispatch(
        loadWikiSuccess({
          data: profileData,
          pageNum: pageNum,
          totalPages: wikiDataTotalPages,
        })
      );
    } catch (e) {
      dispatch(loadWikiFailure(e));
    }
  };

  async function handleClick() {
    await getWikiBirthsData();
  }

  return (
      <HomeLayout>
    <div className="App">


      {!data?.[0]?.length ? (
        <Button
          name={DefaultContent.fetchButton}
          clickHandler={handleClick}
          disabled={isLoading}
        />
      ) : null}
      {isLoading ? <PageLoadingSpinner /> : null}
      {apiError ? <ErrorModal /> : null}
      {paginatedData?.length ? <BioGallery /> : null}
    </div>
      </HomeLayout>
  );
}
