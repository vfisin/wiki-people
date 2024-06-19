import React, { useContext, useEffect, useState } from "react";
import WikiContext from "../../context/wiki-context/context";
import "./PageNavigation.css";
import Button from "../button/Button";

interface PaginatorProps  {
  handlePageChange: (page: number) => void;
}

const PageNavigation = ({ handlePageChange }: PaginatorProps) => {
  const { state } = useContext(WikiContext);
  const { pageNum, totalPages } = state;
  const [rows, setRows] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    function generatePagination() {
      const newRows: React.ReactNode[] = [];
      const maxPagesToShow = 5;
      const halfMaxPages = Math.floor(maxPagesToShow / 2);

      // Previous button
      newRows.push(
          <Button
              key="previous"
              name="Back"
              clickHandler={() => handlePageChange(pageNum - 1)}
              disabled={pageNum === 1 || totalPages === 0}
          />
      );

      // Condition to show all pages if there are 7 or fewer
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          newRows.push(
              <Button
                  key={i}
                  name={i.toString()}
                  clickHandler={() => handlePageChange(i)}
                  disabled={pageNum === i}
              />
          );
        }
      } else {
        // Show first page
        newRows.push(
            <Button
                key={1}
                name="1"
                clickHandler={() => handlePageChange(1)}
                disabled={pageNum === 1}
            />
        );

        if (pageNum > halfMaxPages + 2) {
          newRows.push(
              <Button
                  key="left-ellipsis"
                  name="..."
                  className="ellipsis"
                  clickHandler={() => handlePageChange(Math.max(pageNum - Math.ceil(maxPagesToShow / 2), 1))}
              />

          );
        }

        const startPage = Math.max(pageNum - halfMaxPages, 2);
        const endPage = Math.min(pageNum + halfMaxPages, totalPages - 1);

        for (let i = startPage; i <= endPage; i++) {
          newRows.push(
              <Button
                  key={i}
                  name={i.toString()}
                  clickHandler={() => handlePageChange(i)}
                  disabled={pageNum === i}
              />
          );
        }

        if (pageNum < totalPages - halfMaxPages - 1) {
          newRows.push(
              <Button key="right-ellipsis" name="..." className="ellipsis"  clickHandler={() => handlePageChange(Math.min(pageNum + Math.ceil(maxPagesToShow / 2), totalPages))} />
          );
        }

        // Show last page
        newRows.push(
            <Button
                key={totalPages}
                name={totalPages.toString()}
                clickHandler={() => handlePageChange(totalPages)}
                disabled={pageNum === totalPages}
            />
        );
      }

      // Next button
      newRows.push(
          <Button
              key="next"
              name="Next"
              clickHandler={() => handlePageChange(pageNum + 1)}
              disabled={pageNum === totalPages || totalPages === 0}
          />
      );

      setRows(newRows);
    }

    generatePagination();
  }, [totalPages, pageNum, handlePageChange]);

  return <div className="page-navigation">{rows}</div>;
};

export default PageNavigation;
