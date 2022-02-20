import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiArrowDropDownLine } from "react-icons/ri";
import { getCategories, filterProducts } from "../Redux/Actions/actions";

const FiltersContainer = () => {
  const { categories, loadCategories } = useSelector((state) => state);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "category") {
      if (e.target.checked) {
        setFilteredCategories([...filteredCategories, e.target.value]);
      } else {
        setFilteredCategories(
          filteredCategories.filter((item) => item !== e.target.value)
        );
      }
    }
    dispatch(filterProducts(filteredCategories));
  };

  if(loadCategories) dispatch(getCategories());

  return (
    <div>
      <div
        className="catalog--filters"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        {" "}
        Elige categoria <RiArrowDropDownLine />{" "}
      </div>
      {openDropdown && (
        <div className="catalog--filter">
          {categories.map((category) => (
            <div key={category.id}>
              <label>{category.name}</label>
              <input
                type="checkbox"
                name="category"
                value={category.name}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FiltersContainer;
