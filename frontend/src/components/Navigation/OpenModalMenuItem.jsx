// import React from 'react';
import { useModal } from '../../context/Modal';
import './ProfileButton.css';
function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the menu item that opens the modal
  onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    // <li onClick={onClick}>{itemText}</li>
    <button onClick={onClick} className='dropDownLoginSignup deleteModalButton'>{itemText}</button>
  );
}

export default OpenModalMenuItem;

// **** to change this styling find option 3 in navigation
