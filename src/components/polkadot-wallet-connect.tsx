'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import Image from 'next/image';

interface PolkadotWalletOption {
  id: string;
  name: string;
  icon: string;
}

const walletOptions: PolkadotWalletOption[] = [
  {
    id: 'talisman',
    name: 'Talisman',
    icon: '/images/wallet/talisman.png'
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    icon: '/images/wallet/polkadot.png'
  },
  {
    id: 'subwallet',
    name: 'Subwallet',
    icon: '/images/wallet/subwallet.png'
  }
];

interface PolkadotWalletConnectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWallet: (walletId: string) => void;
}

export function PolkadotWalletConnectDialog({
  isOpen,
  onClose,
  onSelectWallet
}: PolkadotWalletConnectDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[400px] w-[calc(100vw-20px)] rounded-[10px]">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-[20px]">
          {walletOptions.map((wallet) => (
            <div
              key={wallet.id}
              onClick={() => onSelectWallet(wallet.id)}
              className="flex w-full cursor-pointer items-center gap-[20px] rounded-[10px] bg-[#F2F3F5] p-[20px] transition-opacity hover:opacity-80"
            >
              <div className="relative h-[54px] w-[54px]">
                <Image
                  src={wallet.icon}
                  alt={wallet.name}
                  fill
                  className="rounded-full"
                />
              </div>
              <span className="text-[18px] font-bold">{wallet.name}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
