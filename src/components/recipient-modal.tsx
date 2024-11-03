'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from './ui/dialog';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface WalletAddress {
  address: string;
  chainId: string;
}

interface RecipientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: WalletAddress) => void;
  selectedChain?: string;
}

export function RecipientModal({
  isOpen,
  onClose,
  onSave,
  selectedChain
}: RecipientModalProps) {
  const [address, setAddress] = useState('');
  const [isError, setIsError] = useState(false);

  function handleSave() {
    // 这里应该添加地址验证逻辑
    // if (!isValidAddress(address, selectedChain)) {
    //   setIsError(true);
    //   return;
    // }

    onSave({ address, chainId: selectedChain || '' });
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100vw-20px)] gap-0 rounded-[20px] p-[20px] md:w-[460px]">
        <DialogHeader>
          <DialogTitle className="text-[14px] font-bold text-[#121619]">
            Send To
          </DialogTitle>
          {/* <DialogClose /> */}
        </DialogHeader>
        <div className="my-[20px] h-[1px] w-full bg-[#12161910]"></div>

        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center gap-[10px] rounded-[10px] bg-[#F2F3F5] p-[10px]">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter recipient address"
              className={cn(
                'w-full bg-transparent text-[14px] font-bold text-[#242A2E] placeholder:text-[#12161950] focus-visible:outline-none',
                isError && 'text-[#FF2D20]'
              )}
            />
          </div>

          {isError && (
            <p className="text-[12px] font-normal leading-normal text-[#000]">
              Wallet address is invalid for selected destination chain{' '}
              <span className="text-[#FF0083]">Darwinia</span>.
            </p>
          )}

          <div className="flex gap-4">
            <Button
              onClick={handleSave}
              disabled={!address || isError}
              className="flex-1 font-bold"
            >
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={onClose}
              className="flex-1 bg-[#FF00831A] font-bold text-[#FF0083] transition-opacity hover:bg-[#FF00831A] hover:opacity-80"
            >
              Cancel
            </Button>
          </div>

          <div className="flex items-center gap-[20px] rounded-[10px] bg-[#FF00831A] p-[20px]">
            <div className="grid grid-cols-2 gap-[10px]">
              <Image
                src="/images/wallet/metamask.png"
                width={46}
                height={46}
                alt="MetaMask"
              />
              <Image
                src="/images/wallet/polkadot.png"
                width={46}
                height={46}
                alt="Polkadot"
              />
              <Image
                src="/images/wallet/other.png"
                width={46}
                height={46}
                alt="Other"
              />

              <Image
                src="/images/wallet/plus.svg"
                width={46}
                height={46}
                alt="Add"
              />
            </div>

            <div className="flex flex-col gap-[10px]">
              <p className="text-[14px] font-normal leading-[24px] text-[#242A2E]">
                Connect your wallet to select a destination address
              </p>
              <Button
                variant="secondary"
                onClick={onClose}
                className="flex-1 bg-[#FF00831A] font-bold text-[#FF0083] transition-opacity hover:bg-[#FF00831A] hover:opacity-80"
              >
                Connect Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
