import { FC, ReactNode } from 'react';
import modalStyle from '../../styles/modalStyle.module.css';

interface IModalR {
  children: ReactNode;
  stati: boolean;
}
const ModalR: FC<IModalR> = ({ children, stati }) => {
  return (
    <>
      {stati && (
        <div className={modalStyle.overlay}>
          <div className={modalStyle.contentModal}>
            <div className={modalStyle.contenido}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalR;
