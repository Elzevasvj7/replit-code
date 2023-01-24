export interface ResponseTypes {
  status: boolean;
  msg: string;
  data: any;
}

export interface Web3ResponseTypes {
  data: any;
  hasData: boolean;
  hasError: boolean | string | Object;
}
