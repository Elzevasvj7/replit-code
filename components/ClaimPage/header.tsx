import Image from 'next/image';
import ClaimStyle from '../../styles/ClaimStyle.module.css';
import ChangeLanguage from '../ChangeLanguage';
import { useDisconnect } from 'wagmi';

const folder = '/';

const ClaimHeader = () => {
  const { disconnect } = useDisconnect();

  return (
    <div className={ClaimStyle.HeaderContainer}>
      {/* <div className={Clai  mStyle.Navbar}> */}
      <div className={ClaimStyle.Logo}>
        <Image
          src={folder + 'Logo.svg'}
          alt="Logo Landian"
          width={230}
          height={50}
        />
      </div>
      <div className={ClaimStyle.btnsHeader}>
        <div className={ClaimStyle.btnsTranslate}>
          <ChangeLanguage />
        </div>
        <button className={ClaimStyle.btnsDisconnect}>
          <Image
            src={folder + 'Login.svg'}
            alt="Login Icon"
            width={42}
            height={42}
            onClick={() => disconnect()}
            className={ClaimStyle.img}
          />
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ClaimHeader;
