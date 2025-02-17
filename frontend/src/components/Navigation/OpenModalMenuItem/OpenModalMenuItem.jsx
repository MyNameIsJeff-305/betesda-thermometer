import { useModal } from '../../../context/Modal';
import './OpenModalMenuItem.css';

function OpenModalMenuItem({
  modalComponent,
  itemText,
  onItemClick,
  onModalClose,
  style
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <li className="open-modal-menu-item" onClick={onClick} style={{ style }}>
      {itemText}
    </li>
  );
}

export default OpenModalMenuItem;
