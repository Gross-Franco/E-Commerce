import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories, filterProducts, getProductsPublic } from "../Redux/Actions/actions";
import { useEffect } from "react";
import { Form } from "react-bootstrap";

import './styles/estilos.css'



const FiltersContainer = () => {
  const { categories, loadCategories } = useSelector((state) => state.categories);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {

    if (!filteredCategories.includes(e.target.value)) {
      setFilteredCategories([...filteredCategories, e.target.value])
    }
  };

  useEffect(() => {
    filteredCategories.length > 0 ? dispatch(filterProducts(filteredCategories)) :
      dispatch(getProductsPublic());
  }, [filteredCategories])

  if (loadCategories) dispatch(getCategories());
  return (
    <div>
      <div>
        <span>categorias:
          {
            filteredCategories ?
              filteredCategories.map((c, i) => {
                return (
                  <label
                    className="catego"
                    key={i}>
                    {c}
                    <button
                      name={c}
                      onClick={e => {
                        setFilteredCategories(filteredCategories.filter(ca => ca !== e.target.name));
                      }}>x
                    </button>
                  </label>
                )
              })
              : ""
          }
        </span>
      </div>
      <Form.Select size="sm" onChange={e => (handleChange(e))}>
        <option disabled >{categories === [] ?
          categories[1].name
          : "elige una categoria"
        }</option>
        {categories.map(c => {
          return (
            <option
              key={c.id}
            >{c.name}</option>

          )
        })}


      </Form.Select>
    </div>
  );
};

export default FiltersContainer;
