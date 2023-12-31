import { useModal } from '../../context/Modal.jsx';
import './OpenModalButton.css';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button className='bttn-modal'onClick={onClick}>{buttonText}</button>;

}




// const Greeting = () => {
//     return (
//       <OpenModalButton
//         buttonText="Greeting"
//         modalComponent={<h2>Hello World!</h2>}
//       />
//     );
//   };



// const Greeting = () => {
//     return (
//       <OpenModalButton
//         buttonText="Greeting"
//         modalComponent={<h2>Hello World!</h2>}
//         onButtonClick={() => console.log("Greeting initiated")}
//       />
//     );
//   };





// const Greeting = () => {
//     return (
//       <OpenModalButton
//         buttonText="Greeting"
//         modalComponent={<h2>Hello World!</h2>}
//         onButtonClick={() => console.log("Greeting initiated")}
//         onModalClose={() => console.log("Greeting completed")}
//       />
//     );
//   };

export default OpenModalButton;
