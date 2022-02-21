import React from 'react';
import { PanelSearch, PanelTable } from '../components';

const PanelBody = ({option, setIsOpen}) => {
  return (
    <div className='panel-body--container'>
        <PanelSearch option={option} />
        <PanelTable option={option} setIsOpen={setIsOpen}/>
    </div>
  )
}

export default PanelBody