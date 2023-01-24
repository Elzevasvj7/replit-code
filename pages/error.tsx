import ChangeLanguage from '@/components/ChangeLanguage';
import Modal from '@/components/Modal';
import style from '../styles/errorSttyle.module.css';
import Image from 'next/image';
import styled from 'styled-components';

const folder = '/';

const Container = styled.div`
 position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Header = styled.header`
  width: 100%;
  display: flex;
  position: absolute;
  padding: 60px 60px 0px 20px;
  justify-content: space-between;
  @media (max-width:900px){
    padding: 20px 20px 0px 20px;
  }
`
const error = () => {
  return (
    <>
      <Header>
        <div className={style.logo}>
          <Image src={folder + 'logo.svg'} alt={''} width={280} height={50} />
        </div>
        <div>
          <ChangeLanguage />
        </div>
      </Header>
    <Container>
      <video id="background-video" loop autoPlay muted className={style.video}>
        <source
          src="https://capital-city.s3.amazonaws.com/resources/public/videos/background-capital-city.mp4"
          type="video/mp4"
        />
      </video>
      <div
        style={{
          color: 'white',
        }}>
        <Modal />
      </div>
    </Container>
    </>
  );
};

export default error;
