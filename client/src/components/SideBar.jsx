import React from 'react'
import { ControlContainer } from '../containers';
import { useDispatch } from 'react-redux';
import { setAddOrUpdate } from '../Redux/Actions/actions';

const SideBar = ({setOption, setIsOpen}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    setOption("");
    setIsOpen(false);
    dispatch(setAddOrUpdate('add'));
  }
  return (
    <div className='admin-page--side-bar'>
        <h2 className='side-bar--title' onClick={handleClick}>Control Panel</h2>
        <ControlContainer setOption={setOption} setIsOpen={setIsOpen} />
    </div>
  )
}

export default SideBar