import React from 'react'

const ControlContainer = ({setOption, setIsOpen}) => {
  const handleClick = (e) => {
    setOption(e.target.innerText);
    setIsOpen(false);
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