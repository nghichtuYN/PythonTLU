import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
export const AdninSearchComponent = (props) => {
  const { value, placeholder, onChange } = props;
  return (
    <div className="input-wrapper-admin-search ">
      <input
        className="fs-md-2 fs-lg-3 fs-xxl-3 fs-xl-4"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <FaSearch id="search-icon" />
    </div>
  );
};
