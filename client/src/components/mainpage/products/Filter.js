import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

export default function Filters() {
  const state = useContext(GlobalState);

  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = (e) => {
    var value = "";
    if (e.target.value === "") {
      value = "";
    } else value = "category=" + e.target.value;

    setCategory(value);
  };

  return (
    <div className="filter_menu">
      <span>Filters: </span>
      <div className="select">
        <select name="category" onChange={handleCategory}>
          <option value="">All Products</option>
          <option value="laptop">Laptop</option>
          <option value="mobile phone">Mobile Phone</option>
          <option value="other">Other</option>
        </select>
      </div>
      <span>Sort By: </span>
      <div className="select">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best sales</option>
          <option value="sort=-price">Price: High-Low</option>
          <option value="sort=price">Price: Low-High</option>
        </select>
      </div>
    </div>
  );
}
