'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Tabs } from './tabs';

export function Connected() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-[25px] px-[10px] py-[8px]">
          <Image
            src="/images/wallet/polkadot.png"
            alt="wallet"
            width={24}
            height={24}
          />
          <span className="text-[14px] font-normal text-[#242A2E]">
            dMT7L....qi42W
          </span>
          <Image
            src="/images/arrow-down.svg"
            alt="arrow"
            width={16}
            height={16}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0" align="end">
        <Tabs />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
