// import Button from '@mui/material/Button';
import style from '/styles/buttonComponent.module.css';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';
interface IButtonComponent {
  children: ReactNode;
  onClick?: () => void;
}
const Button = styled.button`
  background: white;
  color: black;
  font-weight: 700;
  border: 1px solid white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  padding: 10px;
  cursor: pointer;
  margin-left: 10px;
`


const ButtonComponent: FC<IButtonComponent> = ({ children, onClick }) => {
  return (
    <Button className={style.button} onClick={onClick}>
      {children}
    </Button>
  );
};

export default ButtonComponent;
