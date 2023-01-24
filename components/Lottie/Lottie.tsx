import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import style from './LottieStyle.module.css';

const Lottie = ({ animation }: any) => {
  const container: any = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animation,
    });
    return () => {
      lottie.destroy();
    };
  }, [animation]);

  return <div className={style.container} ref={container} />;
};

export default Lottie;
