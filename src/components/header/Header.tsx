import "./Header.css";
import { useContext } from "react";
import WikiContext from "../../context/wiki-context/context";
import {DefaultContent} from "../../utils/constants/text-consts";
import wikiLogo from "../../assets/Wiki-logo.svg";

const Header = () => {
  const { state } = useContext(WikiContext);
  const { today, pageTitle } = state;

  return (
      <div className="header">
          <div className="header-left">
              <img src={wikiLogo} alt="Logo" className="header-logo" style={{ color: '#ff0000' }}/>
              <div className="site-name">Wikipedia</div>
          </div>
          <div className="header-right">
              <h1>{pageTitle}</h1>
              <h3>
                  {DefaultContent.headerText}: {today.getMonth() + 1}/{today.getDate()}/{today.getFullYear()}
              </h3>
          </div>
      </div>
  );
};

export default Header;
