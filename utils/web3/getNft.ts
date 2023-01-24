import ERC721 from '@/abi/abi.json';
import { ethers } from 'ethers';
import { Web3ResponseTypes } from '@/types/ResponseTypes';

const contractAddr = process.env.NEXT_PUBLIC_LANDS_ADDR || '';

export async function GetNfts(
  signer: any,
  wallet: any
): Promise<Web3ResponseTypes> {
  try {
    const contractERC721 = new ethers.Contract(contractAddr, ERC721, signer);
    const txTokenOfOwner = await contractERC721.balanceOf(wallet);
    const nftBalance = Number(txTokenOfOwner);

    if (nftBalance <= 0) {
      return {
        data: [],
        hasData: false,
        hasError: false,
      };
    }
    return {
      data: nftBalance,
      hasData: true,
      hasError: false,
    };
  } catch (error: any) {
    console.error(error);
    return {
      data: [],
      hasData: false,
      hasError: error,
    };
  }
}
