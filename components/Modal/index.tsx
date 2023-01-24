import router from 'next/router';
import { useTranslation } from 'react-i18next';
import AnimationJson from '../../public/animationsJson/rayo.json';
import ButtonComponent from '../ButtonComponent';
import Lottie from '../Lottie/Lottie';
import style from './modalStyle.module.css';
import { useDisconnect } from 'wagmi';

const ModalComponent = () => {
  const { t } = useTranslation('global');

  const { disconnect } = useDisconnect();

  const HandlerDisco = () => {
    disconnect();
    router.push('/');
  };
  return (
    <div>
      <div className={style.modal}>
        <Lottie animation={AnimationJson} />
        <div>
          <p>{t('error.title')}</p>
        </div>
        <div className={style.button}>
          <ButtonComponent onClick={() => HandlerDisco()}>
            {t('error.btn')}
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
