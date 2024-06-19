import "./PageLoadingSpinner.css";
import { DefaultContent } from "../../utils/constants/text-consts";
import React from "react";

const PageLoadingSpinner = () => {
  return (<>
          <div data-testid="loading-screen" className="loading-screen">
              <div className="spinner">
                  <svg className="path" viewBox="0 0 50 50">
                      <circle
                          className="path"
                          cx="25"
                          cy="25"
                          r="20"
                          fill="none"
                          strokeWidth="4"
                      />
                  </svg>
              </div>
              <h1>{DefaultContent.loadingData}</h1>
          </div>
      </>
  );
}

export default PageLoadingSpinner
