import { BigNumber, ethers } from 'ethers';
import abi from '@/abi/abi.json';
import contract from '@/constants/contract';
import { getMaxPriorityFeePerGas } from './getFee';
import { Web3ResponseTypes } from '@/types/ResponseTypes';

const gasLimit = process.env.NEXT_PUBLIC_GAS_LIMIT;

export async function mint(provider: any, signer: any): Promise<Web3ResponseTypes> {
  let hasData = false;
  const maxPriorityFee = await getMaxPriorityFeePerGas(provider);
  const args = [
    {
      gasLimit: Number(gasLimit || 1864222),
      maxPriorityFeePerGas: maxPriorityFee?.toString(),
    },
  ];

  try {
    const contractLands = new ethers.Contract(contract.landsAddr, abi, signer);
    const txMintAsset = await contractLands.functions['mintLand'](...args);
    const result = await txMintAsset.wait();
    hasData = result && result.status === 1;

    if (!hasData) {
      return {
        data: [],
        hasData: false,
        hasError: 'Ocurrio un error con la compra del asset',
      };
    }

    return {
      data: getNftMinted(result),
      hasData,
      hasError: false,
    };
  } catch (error: any) {
    return {
      data: [],
      hasData: false,
      hasError: error,
    };
  }
}

/// @dev Only owner can mint massive
/// @param provider: Is the ether.js provider
/// @param signer: User's minting address
/// @param lands: Amount of lands minting at the user at the current position
/// @param address: Wallet to mint the amount of lands at the array position
export async function mintMassive(
  provider: any,
  signer: any,
  lands: Number[],
  address: String[]
): Promise<Web3ResponseTypes> {
  let hasData = false;
  const maxPriorityFee = await getMaxPriorityFeePerGas(provider);
  const args: Array<any> = [lands, address];

  args.push({
    gasLimit: Number(gasLimit || 1864222),
    maxPriorityFeePerGas: maxPriorityFee?.toString(),
  });

  try {
    const contractBuyAsset = new ethers.Contract(contract.landsAddr, abi, signer);
    const txMintLandMassive = await contractBuyAsset.functions['buyPackageNative'](
      ...args
    );
    const result = await txMintLandMassive.wait();
    hasData = result && result.status === 1;

    if (!hasData) {
      return {
        data: [],
        hasData: false,
        hasError: 'Ocurrio un error con la compra del asset',
      };
    }

    return {
      data: result,
      hasData,
      hasError: false,
    };
  } catch (error) {
    return {
      data: [],
      hasData: false,
      hasError: String(error),
    };
  }
}

function getNftMinted(tx: any) {
  /// @dev [1] = is the event mint
  /// @dev [2] = is the nft id minted
  let nftId = tx?.logs[1]?.topics[2];
  return parseInt(nftId, 16);
}
