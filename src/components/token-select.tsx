'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { TokenSelectDialog } from './token-select-dialog';
import { useNumberInput } from '@/hooks/number-input';
import { cn } from '@/lib/utils';

const mockTokens = [
  {
    symbol: 'USDT',
    name: 'Tether USD',
    icon: '/images/test3.svg',
    balance: '5,000.33',
    address: '0x4h716...12f4hfw'
  },
  {
    symbol: 'RING',
    name: 'Darwinia Network',
    icon: '/images/test3.svg',
    balance: '30.33',
    address: '0x4h716...12f4hhw'
  }
];
interface TokenSelectProps {
  token: {
    symbol: string;
    icon: string;
    balance: string;
  };
  onSelect?: () => void;
}

export function TokenSelect({ token, onSelect }: TokenSelectProps) {
  const [amount, setAmount] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState(mockTokens[0]);

  const { value, handleChange, handleBlur } = useNumberInput({
    // maxDecimals: 6,
    // maxValue: 1000000,
    minValue: 0,
    initialValue: '',
    onChange: (value) => console.log('Current value:', value)
  });

  function handleOpenDialog() {
    setIsDialogOpen(true);
  }

  return (
    <>
      <div className="flex items-center gap-[10px] rounded-[10px] bg-[#F2F3F5] p-[10px]">
        <div className="relative h-[40px] w-[40px]">
          <Image src={token.icon} alt={token.symbol} fill />
        </div>

        <div className="grid w-full grid-cols-2 items-center gap-[10px]">
          <div
            className="flex cursor-pointer flex-col items-start transition-opacity hover:opacity-80"
            onClick={handleOpenDialog}
          >
            <div className="flex items-center gap-[5px] leading-normal">
              <span className="text-[18px] font-bold">{token.symbol}</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <span className="text-[12px] font-normal leading-normal text-[#12161950]">
              Balance: {token.balance}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <input
              className={cn(
                'w-full bg-transparent text-right text-[18px] font-bold text-[#12161950] focus-visible:outline-none',
                'md:text-[24px]',
                value && 'text-[#121619]'
              )}
              placeholder="0.00"
              type="text"
              inputMode="decimal"
              pattern="[0-9]*"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-form-type="other"
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className="text-[12px] font-normal leading-normal text-[#12161950]">
              ≈ $0.00
            </span>
          </div>
        </div>
      </div>
      <TokenSelectDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSelect={(token) => {
          setSelectedToken(token);
          setIsDialogOpen(false);
        }}
        tokens={mockTokens}
      />
    </>
  );
}
