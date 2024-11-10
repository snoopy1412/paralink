import { useAccount } from 'wagmi';
import { useWalletStore } from '@/store/wallet';
import useChainsStore from '@/store/chains';

interface WalletConnection {
  isConnected: boolean;
  evmAddress?: `0x${string}`;
  substrateAddress?: string;
  isWrongNetwork: boolean;
}

export function useWalletConnection(): WalletConnection {
  const fromChain = useChainsStore((state) => state.getFromChain());
  const { address, chainId } = useAccount();
  const { selectedAccount } = useWalletStore();

  if (!fromChain) return { isConnected: false, isWrongNetwork: false };

  if (fromChain.evmInfo) {
    const isWrongNetwork = chainId !== fromChain.evmInfo.evmChainId;
    return {
      isConnected: !!address && !isWrongNetwork,
      evmAddress: address,
      isWrongNetwork
    };
  }

  if (fromChain.substrateInfo) {
    return {
      isConnected: !!selectedAccount,
      substrateAddress: selectedAccount?.address,
      isWrongNetwork: false
    };
  }

  return { isConnected: false, isWrongNetwork: false };
}
