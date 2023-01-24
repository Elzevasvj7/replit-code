import ChangeLanguage from '@/components/ChangeLanguage';
import { useIsMounted } from '@/hooks/useIsMounted';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import router from 'next/dist/client/router';
import Image from 'next/image';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import loginStyle from '../styles/loginStyle.module.css';
import dataInfo from '@/canvas/dataInfo';
import logo from '../public/logo_capital.svg'
const folder = '/Assets/images/';

const Home = () => {
  const { address, isConnected, isDisconnected } = useAccount();
  const mounted = useIsMounted();
  const { t } = useTranslation('global');

  useEffect(() => {
    let Lucho = false;
    if (address) {
      dataInfo.find((data, index) => {
        if (data.addressId === address) {
          Lucho = true;
        } else {
          false;
        }
        if (Lucho) {
          router.push('/claim');
        } else {
          router.push('/error');
        }
      });
    }
  });

  return (
    <div className={loginStyle.container}>
      <div className={loginStyle.containerBackground}>
        <ChangeLanguage />
      </div>
      <div>
        <div className={loginStyle.contentImg}>
          <video
            id="background-video"
            loop
            autoPlay
            muted
            className={loginStyle.video}>
            <source
              src="https://capital-city.s3.amazonaws.com/resources/public/videos/background-capital-city.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className={loginStyle.degradado}></div>
      </div>
      <div className={loginStyle.contentDescription}>
        <div className={loginStyle.title} >
          <Image src={logo} alt='' className={loginStyle.logo_city}/> 
          <p >{t('login.subTitle')}</p>
        </div>
        <div className={loginStyle.conexion} style={{height:'30%'}}>
          <div>
            <Image src={folder + 'arrow.svg'} alt="flecha" width={50} height={50} />
            <p >{t('login.description')}</p>
          </div>
          <ConnectButton label={`${t('login.btnConnect')} `} />
        </div>
        <div className={loginStyle.logo} style={{height:'30%'}}>
          <Image
            src={folder + 'logo.svg'}
            alt="logo"
            className={loginStyle.img}
            width={50}
            height={50}
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
