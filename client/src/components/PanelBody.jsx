import React from 'react';
import { PanelSearch, PanelTable } from '../components';

const PanelBody = ({option}) => {
  return (
    <div className='panel-body--container'>
        <PanelSearch />
        <PanelTable option={option} />
    </div>
  )
}

export default PanelBody