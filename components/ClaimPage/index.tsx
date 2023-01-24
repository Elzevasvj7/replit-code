import Scene from '@/canvas/Scene';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import carg from '../../public/animationsJson/carg.json';
import { useProvider, useSigner, useAccount } from 'wagmi';
import { chainSelected } from '@/constants/chain';
import ModalR from '../ModalR';
import Lottie from '@/components/Lottie/Lottie';
import { mint } from '@/utils/web3/Mint';
import sad from '../../public/animationsJson/sad.json';
import { GetNfts } from '@/utils/web3/getNft';
import { useTranslation } from 'react-i18next';
import { dataInfo, IDataInfo } from '../../canvas/dataInfo';
import { CreateNFT, IApiResponse } from '@/utils/api/createNFT';
import state from '../../canvas/Status';
import CBS from '/styles/CBS.module.css';

const folder = '/';

const ClaimBody = () => {
  const chainId: any =
    chainSelected[Number(process.env.NEXT_PUBLIC_MAINNET_TESTNET || 1)].id;

  const sdkURL = process.env.NEXT_PUBLIC_CC_SDK!;
  const { address, isConnected } = useAccount();

  const [stateModalLoading, setStateModalLoading] = useState(false);
  const [stateModalError, setStateModalError] = useState(false);

  const [isLoadingMyNFT, setIsLoadingMyNFT] = useState(false);
  const [stateText, setStateText] = useState(false);
  const [stateWelcome, setStateWelcome] = useState(true);
  const [hasNfts, setHasNfts] = useState<any>();
  const { data: signer } = useSigner(chainId);
  const provider = useProvider(chainId);
  const { t } = useTranslation('global');
  const [url, setUrl] = useState(sdkURL);

  const handler = () => {
    dataInfo.map((data, index) => {
      if (data.addressId === address) {
        setUrl(`${sdkURL}/${data.idProyect}.zip`);
      }
    });
  };

  const handleMint = async () => {
    /// @dev Encuentra el nft
    const userProyects: any = dataInfo.find(
      (_nft: IDataInfo) => _nft.addressId === String(address)
    );

    if (!userProyects) {
      console.log('No se encontro la wallet en la waitlist');
      setStateModalError(true);
    }

    if (userProyects) {
      const {
        data: dataMint,
        hasData: hasDataMint,
        hasError: hasErrorMint,
      }: any = await mint(provider, signer);

      if (!hasDataMint || hasErrorMint) {
        console.log('Ocurrio un error al mintear el nft');
        setStateModalError(true);
      }

      if (dataMint && !hasErrorMint) {
        /// @dev crea el nft en el backend
        const {
          data: dataCreateNFT,
          hasError: hasErrorCreateNFT,
          isLoading: isLoadingCreateNFT,
        }: IApiResponse = await CreateNFT({
          // nomenclature: userProyects?.idProyect!,
          nomenclature: 'CCM1B2L5',
          token_id: dataMint,
          area: userProyects?.area!,
        });

        if (hasErrorCreateNFT) {
          console.log('Ocurrio un error al crear el nft');
          setStateModalError(true);
        }

        if (dataCreateNFT && !hasErrorCreateNFT && !isLoadingCreateNFT) {
          // success transaction
          setStateModalLoading(false);
          setStateText(true);
          setStateWelcome(false);
          handleGetNft();
        }
      }
    }
  };

  const handleGetNft = async () => {
    const { data, hasData, hasError } = await GetNfts(signer, address);
    console.log(data, hasData, hasError);
    if (!hasData) {
      setHasNfts(false);
      setIsLoadingMyNFT(false);
    }

    if (data && hasData) {
      setHasNfts(true);
      setIsLoadingMyNFT(false);
    }
  };

  useEffect(() => {
    setIsLoadingMyNFT(true);
    if (isConnected && signer && !hasNfts) {
      handleGetNft();
      handler();
    }
  }, [isConnected, signer, hasNfts]);

  return (
    <>
      <ModalR stati={stateModalLoading}>
        <div>
          <Lottie animation={carg} />
        </div>
        <div>
          <p>{t('claim.modalProcessing')}</p>
        </div>
      </ModalR>
      <ModalR stati={stateModalError}>
        <div>
          <Lottie animation={sad} />
        </div>
        <div>
          <p>{t('claim.modalError')}</p>
        </div>
        <br />
        <div>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              setStateModalLoading(true);
              setStateModalError(false);
              handleMint();
            }}>
            {t('claim.btnAgain')}
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              setStateWelcome(true);
              setStateModalLoading(false);
              setStateModalError(false);
            }}>
            {t('claim.btnReturn')}
          </button>
        </div>
      </ModalR>
      <div className={CBS.container}>
        <div className={CBS.Background}>
          <Image
            className={CBS.ImageBackground}
            src={folder + 'Rectangle.svg'}
            width={50}
            height={50}
            alt=""
          />
        </div>
        <div className={CBS.InfoSection}>
          <h1>CAPITAL CITY</h1>
          <p className={CBS.Subtitle}>{t('claim.subTitle')}</p>

          <div className={CBS.SecondSubtitles}>
            <div
              style={{
                ...(stateWelcome && !hasNfts && !isLoadingMyNFT
                  ? { display: 'block' }
                  : { display: 'none' }),
              }}>
              <h3>{t('claim.titleWelcome')}</h3>
              <p className={CBS.Message}>{t('claim.description')}</p>
              <div
                className={CBS.containerBtnClaim}
                onClick={() => {
                  setStateModalLoading(!stateModalLoading);
                  state.zoom = true;
                }}>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={handleMint}>
                  <Image
                    className={CBS.IconArrow}
                    src={folder + 'Arrow.svg'}
                    width={50}
                    height={50}
                    alt=""
                  />
                  {t('claim.btnMint')}
                </button>
              </div>
            </div>
            <div
              style={{
                ...(stateText || hasNfts
                  ? { display: 'block' }
                  : { display: 'none' }),
              }}>
              <p className={CBS.Message}>{t('claim.download')}</p>
              <div className={CBS.containerBtnClaim}>
                <button type="button" className="btn btn-light">
                  <Image
                    className={CBS.IconArrow}
                    src={folder + 'ArrowDown.svg'}
                    width={50}
                    height={50}
                    alt=""
                  />
                  <Link
                    className="text-black btn btn-outline-light"
                    href={url}
                    target="_blank">
                    {t('claim.btnDownload')}
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={CBS.MapSection}>
          <div className={CBS.SFeaturedImage}>
            <Image
              className={CBS.MapImg}
              src={folder + 'Capital_map1x4.png'}
              width={50}
              height={50}
              alt=""
            />
            <Scene className={CBS.MapImgCavas} />
          </div>
          <div className={CBS.ColorsContainer}>
            <div className={CBS.ColorItems}>
              <Image
                className={CBS.ColorIcons}
                src={folder + 'circulo-azul.png'}
                width={50}
                height={50}
                alt="ColorIcon"
              />
              <p className={CBS.ColorText}>{t('claim.colorBlue')}</p>
            </div>
            <div className={CBS.ColorItems}>
              <Image
                className={CBS.ColorIcons}
                src={folder + 'circulo-gris-claro.png'}
                width={50}
                height={50}
                alt="ColorIcon"
              />
              <p className={CBS.ColorText}>{t('claim.colorWhite')}</p>
            </div>
            <div className={CBS.ColorItems}>
              <Image
                className={CBS.ColorIcons}
                src={folder + 'circulo-gris.png'}
                width={50}
                height={50}
                alt="ColorIcon"
              />
              <p className={CBS.ColorText}>{t('claim.colorGray')}</p>
            </div>
            <div className={CBS.ColorItems}>
              <Image
                className={CBS.ColorIcons}
                src={folder + 'circulo-verde.png'}
                width={50}
                height={50}
                alt="ColorIcon"
              />
              <p className={CBS.ColorText}>{t('claim.colorGreen')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClaimBody;

