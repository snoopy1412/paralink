import { create } from 'zustand';
import type { ChainInfo } from '@/types/chains-info';
import type { XcAssetData } from '@/types/asset-registry';

export interface ChainInfoWithXcAssetsData extends ChainInfo {
  id: string;
  xcAssetsData?: XcAssetData[];
}

export type ChainsState = {
  chains: ChainInfoWithXcAssetsData[];
};

export type ChainsActions = {
  setChains: (chains: ChainInfoWithXcAssetsData[]) => void;
};

const useChainsStore = create<ChainsState & ChainsActions>((set) => ({
  chains: [],
  setChains: (chains: ChainInfoWithXcAssetsData[]) => set({ chains })
}));

export default useChainsStore;
