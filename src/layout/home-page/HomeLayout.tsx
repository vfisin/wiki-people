import React, {useCallback, useContext} from "react";
import "./HomeLayoutStyle.css";
import Header from "../../components/header/Header";
import PageNavigation from "../../components/page-navigation/PageNavigation";
import WikiContext from "../../context/wiki-context/context";
import {pageChange} from "../../context/actions/actions";
import reactLogo from "../../assets/React-icon.png"

type HomeLayoutProps = {
    children: React.ReactNode;
};

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
    const { state, dispatch } = useContext(WikiContext);
    const {
        pageNum,
        totalPages,
    } = state;

    const handlePageChange = useCallback(
        (pNum: number) => {
            if (pNum !== pageNum) {
                dispatch(pageChange(pNum));
            }
        },
        [pageNum, dispatch]
    );
    return (
        <div className="main-layout">
            <div className="header-container">
                <Header />
                {totalPages ? <PageNavigation handlePageChange={handlePageChange} /> : null}

            </div>
            <main className="main-content-container">
                {children}
            </main>
            <footer className="footer-container">
                Powered by React 18  <img src={reactLogo} alt="Logo" className="footer-logo" />  Developed by Viktor Fisin
            </footer>
        </div>
    );
};

export default HomeLayout;