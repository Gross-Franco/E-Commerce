import React from 'react'
import { ControlContainer } from '../containers';

const SideBar = ({setOption, setIsOpen}) => {

  const handleClick = (e) => {
    setOption("");
    setIsOpen(false);
  }
  return (
    <div className='admin-page--side-bar'>
        <h2 className='side-bar--title' onClick={handleClick}>Control Panel</h2>
        <ControlContainer setOption={setOption} setIsOpen={setIsOpen} />
    </div>
  )
}

export default SideBar