import React from 'react';

import './MenuButton.style.scss';

const MenuButton = props => {
  return (
    <button type='button' className='hamburger' onClick={props.onClick}>
      <div className='bars'>
        <div className='button-bar'></div>
        <div className='button-bar'></div>
        <div className='button-bar'></div>
      </div>
    </button>
  );
};

export default MenuButton;
