import React, { useState } from "react";
import { useSelector } from "react-redux";

const FiltersContainer = () => {
  const { categories } = useSelector(state => state);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);

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
  };
  return (
    <div>
      <div className="add-form--input-wrapper">
        <header>
          <h3>Categorias</h3>
        </header>
        <div>
          <div
            className="add-form--input"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            {" "}
            Elige categoria <RiArrowDropDownLine />{" "}
          </div>
        </div>
      </div>
      {openDropdown && (
        <div className="add-form--input-wrapper">
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
