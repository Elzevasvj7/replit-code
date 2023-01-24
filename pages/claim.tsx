import ClaimBody from '@/components/ClaimPage';
import ClaimHeader from '@/components/ClaimPage/header';
import router from 'next/router';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import CBS from '../styles/CBS.module.css';

const claim = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { address, isConnected, isDisconnected } = useAccount();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!address) {
      router.push('/');
    }
  });
  return (
    <div className={CBS.content}>
      <ClaimHeader />
      <ClaimBody />
    </div>
  );
};

export default claim;
