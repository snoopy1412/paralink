import { useDisconnectWallet } from '@/hooks/disconnect-wallet';
import { toShortAddress } from '@/lib/utils';
import { useWalletStore } from '@/store/wallet';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import ClipboardIconButton from '../clipboard-icon-button';
import { useAccount } from 'wagmi';

export const Wallets = () => {
  const { address } = useAccount();
  const { disconnectWallet } = useDisconnectWallet();
  const { selectedAccount, disconnect } = useWalletStore();
  return (
    <div className="flex flex-col gap-[10px]">
      {!!address && (
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[5px]">
            <Image
              src="/images/wallet/metamask.png"
              alt="wallet"
              width={20}
              height={20}
            />
            <span className="text-[14px] font-bold leading-normal text-[#242A2E]">
              EVM
            </span>
          </div>
          <div className="flex w-full items-center justify-between rounded-[10px] bg-[#F2F3F5] px-[10px] py-[5px] text-[12px] font-normal leading-normal">
            <div className="flex items-center gap-[5px]">
              <span className="font-mono text-[12px] font-normal tabular-nums leading-normal text-[#242A2E]">
                {toShortAddress(address as `0x${string}`)}
              </span>
              <ClipboardIconButton
                text={address as `0x${string}`}
                size={14}
                className="cursor-pointer opacity-50 transition-opacity hover:opacity-80"
              />
            </div>
            <LogOut
              size={14}
              color="#121619"
              onClick={() => disconnectWallet(address as `0x${string}`)}
              className="cursor-pointer opacity-50 transition-opacity hover:opacity-80"
            />
          </div>
        </div>
      )}

      {!!selectedAccount && (
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[5px]">
            <Image
              src="/images/wallet/polkadot.png"
              alt="wallet"
              width={20}
              height={20}
            />
            <span className="text-[14px] font-bold leading-normal text-[#242A2E]">
              POLKADOT
            </span>
          </div>
          <div className="flex w-full items-center justify-between rounded-[10px] bg-[#F2F3F5] px-[10px] py-[5px] text-[12px] font-normal leading-normal">
            <div className="flex items-center gap-[5px]">
              <span className="font-mono text-[12px] font-normal tabular-nums leading-normal text-[#242A2E]">
                {toShortAddress(selectedAccount?.address || '')}
              </span>
              <ClipboardIconButton
                text={selectedAccount?.address}
                size={14}
                className="cursor-pointer opacity-50 transition-opacity hover:opacity-80"
              />
            </div>
            <LogOut
              size={14}
              color="#121619"
              onClick={() => disconnect()}
              className="cursor-pointer opacity-50 transition-opacity hover:opacity-80"
            />
          </div>
        </div>
      )}
    </div>
  );
};
