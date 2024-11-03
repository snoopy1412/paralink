'use client';

import { useState } from 'react';
import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { ChevronDown, X } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { Empty } from './empty';

const chains = [
  {
    name: 'AssetHub',
    icon: '/images/test1.svg',
    key: 1
  },
  {
    name: 'AssetHub',
    icon: '/images/test1.svg',
    key: 2
  },
  {
    name: 'AssetHub',
    icon: '/images/test1.svg',
    key: 3
  },
  {
    name: 'AssetHub',
    icon: '/images/test1.svg',
    key: 4
  },
  {
    name: 'AssetHub',
    icon: '/images/test1.svg',
    key: 5
  },
  {
    name: 'AssetHub',
    icon: '/images/test1.svg',
    key: 6
  },
  {
    name: 'AssetHub',
    icon: '/images/test1.svg',
    key: 7
  },
  {
    name: 'AssetHub',
    icon: '/images/test1.svg',
    key: 8
  }
];
export const ChainSelect = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <div
        className="flex w-[190px] cursor-pointer items-center gap-[10px] rounded-[var(--radius)] bg-[#F2F3F5] p-[10px] transition-opacity hover:opacity-80"
        onClick={handleClick}
      >
        <Image src="/images/test1.svg" alt="assets" width={24} height={24} />
        <div className="flex flex-1 flex-col items-start">
          <span className="text-[12px] font-normal text-[#12161950]">From</span>
          <span className="text-[14px] font-bold text-[#121619]">AssetHub</span>
        </div>

        <ChevronDown className="h-4 w-4" strokeWidth={2} />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[calc(100vw-20px)] gap-0 rounded-[var(--radius)] bg-white p-0 md:w-[320px]">
          <DialogHeader>
            <DialogTitle className="p-[20px] text-[14px] font-bold text-[#242A2E]">
              Select Chain
            </DialogTitle>
          </DialogHeader>
          <div className="w-full px-[20px]">
            <div className="h-[1px] w-full bg-[#12161910]"></div>
          </div>
          <div>
            <ScrollArea className="h-[300px]">
              <div className="pt-[20px]">
                {chains?.length ? (
                  chains?.map((chain, index) => (
                    <div
                      className={cn(
                        'flex cursor-pointer items-center gap-[10px] px-[20px] py-[10px] transition-all hover:bg-[#12161910] hover:opacity-80',
                        index === chains.length - 1 &&
                          'rounded-b-[var(--radius)]'
                      )}
                      key={chain.key}
                    >
                      <Image
                        src={chain.icon}
                        alt={chain.name}
                        width={34}
                        height={34}
                      />
                      <span className="text-[16px] font-bold text-[#121619]">
                        {chain.name}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center pt-[20px]">
                    <Empty label="No chains found" />
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
