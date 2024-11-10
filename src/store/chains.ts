import { create } from 'zustand';
import type { ChainInfo } from '@/types/chains-info';
import type { XcAssetData } from '@/types/asset-registry';

export interface ChainInfoWithXcAssetsData extends ChainInfo {
  id: string;
  xcAssetsData?: XcAssetData[];
}

export type ChainsState = {
  chains: ChainInfoWithXcAssetsData[];
  fromChainId?: string;
  toChainId?: string;
};

export type ChainsActions = {
  setChains: (chains: ChainInfoWithXcAssetsData[]) => void;
  setFromChainId: (chainId: string) => void;
  setToChainId: (chainId: string) => void;
};

export type ChainsSelectors = {
  getChainById: (chainId?: string) => ChainInfoWithXcAssetsData | undefined;
  getFromChain: () => ChainInfoWithXcAssetsData | undefined;
  getToChain: () => ChainInfoWithXcAssetsData | undefined;
};

const useChainsStore = create<ChainsState & ChainsActions & ChainsSelectors>(
  (set, get) => ({
    chains: [],
    fromChainId: undefined,
    toChainId: undefined,
    setChains: (chains: ChainInfoWithXcAssetsData[]) => set({ chains }),
    setFromChainId: (chainId: string) => set({ fromChainId: chainId }),
    setToChainId: (chainId: string) => set({ toChainId: chainId }),
    getChainById: (chainId?: string) => {
      if (!chainId) return undefined;
      return get().chains.find((chain) => chain.id === chainId);
    },
    getFromChain: () => {
      const { chains, fromChainId } = get();
      return chains.find((chain) => chain.id === fromChainId);
    },
    getToChain: () => {
      const { chains, toChainId } = get();
      return chains.find((chain) => chain.id === toChainId);
    }
  })
);

export default useChainsStore;
