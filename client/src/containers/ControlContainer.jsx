import React from 'react';
import { useDispatch } from 'react-redux';
import { setAddOrUpdate } from '../Redux/Actions/actions';

const ControlContainer = ({setOption, setIsOpen}) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setOption(e.target.innerText);
    setIsOpen(false);
    dispatch(setAddOrUpdate('add'));
  }
  return (
    <div className='side-bar--content'>
        <ul className='side-bar--content-list'>
            <li className='side-bar--list-item' onClick={handleClick} >Pedidos</li>
            <li className='side-bar--list-item' onClick={handleClick} >Productos</li>
            <li className='side-bar--list-item' onClick={handleClick} >Categorias</li>
        </ul>
    </div>
  );
};

export default ControlContainer;