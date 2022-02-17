import React from 'react';
import { SortList } from '../components';

const SortContainer = () => {
  return (
      <div className="catalog-sort--container">
          <span className="catalog-sort--label"> Ordenar por </span>
          <SortList />
      </div>
  )
}

export default SortContainer