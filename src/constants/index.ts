import { thegameAbi } from '@/data/thegameABI';

const contractAddress = '0xf9772ca577617c86ef33a5e4725da4b960190787' as const;

export const theGameContractConfig = {
  address: contractAddress,
  abi: thegameAbi,
};
