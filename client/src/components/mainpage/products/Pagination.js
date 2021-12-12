import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

export default function LoadMore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsAPI.page;
  const [result] = state.productsAPI.result;

  return (
    <div className="load-more">
      {result < page * 8 ? (
        ""
      ) : (
        <button onClick={() => setPage(page + 1)} className="loadmore">
          Load more
        </button>
      )}
    </div>
  );
}
