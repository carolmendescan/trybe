/* eslint-disable complexity */
import clipboardCopy from 'clipboard-copy';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ ...rest }) {
  const [linkCopy, setLinkCopy] = useState(false);
  const time = 2000;

  const handleClick = () => {
    clipboardCopy(window.location.href);
    setLinkCopy(true);
    setTimeout(() => {
      setLinkCopy(false);
    }, time);
  };

  return (
    <>
      <button
        className="w-7 h-7"
        data-testid="share-btn"
        { ...rest }
        onClick={ () => handleClick() }
      >
        <img alt="Share button" src={ shareIcon } />
      </button>
      {linkCopy && <p>Link copied!</p>}
    </>
  );
}
