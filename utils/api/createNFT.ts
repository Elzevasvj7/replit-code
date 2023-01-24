import axios from 'axios';

export interface IApiResponse {
  data: [] | {};
  hasError: boolean;
  isLoading: boolean;
}

interface ICreateNFT {
  nomenclature: string;
  token_id: number;
  area: number;
}

const uri = process.env.NEXT_PUBLIC_API! + '/create-nft';

export async function CreateNFT({
  nomenclature,
  token_id,
  area,
}: ICreateNFT): Promise<IApiResponse> {
  let isLoading = true;

  const options = {
    method: 'POST',
    url: uri,
    data: { nomenclature, token_id, area },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      isLoading = false;
      return {
        data: response.data,
        hasError: false,
        isLoading,
      };
    })
    .catch(function (error) {
      console.error(error);
      isLoading = false;
      return {
        data: error,
        hasError: false,
        isLoading,
      };
    });

  isLoading = false;

  return {
    data: [],
    hasError: false,
    isLoading,
  };
}
