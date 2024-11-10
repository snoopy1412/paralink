'use client';
import Image from 'next/image';
import { useWalletConnection } from '@/hooks/use-wallet-connection';

import { Connected } from './connected';

export default function ConnectWallet() {
  const { isConnected } = useWalletConnection();

  return isConnected ? (
    <Connected />
  ) : (
    <div className="flex items-center gap-[5px] rounded-[10px] bg-white px-[10px] py-[8px] text-black transition-opacity hover:opacity-80 hover:shadow-sm">
      <div className="relative h-[18px] w-[18.645px]">
        <Image src="/images/connect-wallet.svg" alt="wallet" fill />
      </div>

      <span className="text-[14px] font-normal leading-[24px]">
        Connect Wallet
      </span>
    </div>
  );
}
