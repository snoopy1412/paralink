'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useWalletConnection } from '@/hooks/use-wallet-connection';
import { convertToEvmRpcUrls } from '@/lib/utils';
import useChainsStore from '@/store/chains';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useWagmiChainStore } from '@/store/wagmiChain';
import { PolkadotWalletConnectDialog } from '@/components/polkadot-wallet-connect';
import { useState } from 'react';

interface ConnectOrActionButtonProps {
  actionText: string;
  onAction: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  color?: 'primary' | 'secondary' | 'default';
  loadingText?: string;
  connectText?: string;
  disabled?: boolean; // 额外的禁用控制
}

export function ConnectOrActionButton({
  actionText,
  onAction,
  isDisabled = false,
  isLoading = false,
  className,
  color = 'primary',
  loadingText = 'Pending...',
  connectText = 'Connect Wallet',
  disabled = false
}: ConnectOrActionButtonProps) {
  const fromChain = useChainsStore((state) => state.getFromChain());
  const [isPolkadotWalletDialogOpen, setIsPolkadotWalletDialogOpen] =
    useState(false);
  const { isConnected } = useWalletConnection();
  const { setChain } = useWagmiChainStore();
  const { openConnectModal } = useConnectModal();

  const handleClick = () => {
    if (isLoading) return;
    if (!isConnected) {
      if (fromChain?.evmInfo) {
        if (!fromChain?.providers) return;
        const rpcUrls = convertToEvmRpcUrls(fromChain?.providers);

        setChain({
          id: Number(fromChain?.evmInfo?.evmChainId),
          name: fromChain?.name ?? '',
          nativeCurrency: {
            name: fromChain?.evmInfo?.symbol ?? '',
            symbol: fromChain?.evmInfo?.symbol ?? '',
            decimals: fromChain?.evmInfo?.decimals ?? 18
          },
          rpcUrls
        });
        openConnectModal?.();
      } else if (fromChain?.substrateInfo) {
        setIsPolkadotWalletDialogOpen(true);
      }
      return;
    }
    onAction();
  };

  const getButtonText = () => {
    if (isLoading) return loadingText;
    if (!isConnected) return connectText;
    return actionText;
  };

  const isButtonDisabled = disabled || isLoading || (isConnected && isDisabled);

  return (
    <>
      <Button
        className={cn('w-full rounded-[10px] font-bold', className)}
        color={color}
        onClick={handleClick}
        disabled={isButtonDisabled}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {getButtonText()}
      </Button>
      <PolkadotWalletConnectDialog
        isOpen={isPolkadotWalletDialogOpen}
        onClose={() => setIsPolkadotWalletDialogOpen(false)}
      />
    </>
  );
}
