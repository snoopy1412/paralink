'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Wallets } from './wallets';
import { History } from './history';

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState<'wallet' | 'history'>('history');
  return (
    <div className="w-[calc(100vw-40px)] rounded-[10px] bg-white p-[10px] md:w-[300px]">
      <div className="flex w-full items-center justify-between text-[12px] text-[#FF0083]">
        <div
          className={cn(
            'w-1/2 cursor-pointer text-center leading-normal text-[#FF0083] transition-opacity hover:opacity-80',
            activeTab === 'wallet' && 'font-bold'
          )}
          onClick={() => setActiveTab('wallet')}
        >
          Wallet
        </div>
        <div
          className={cn(
            'w-1/2 cursor-pointer text-center leading-normal text-[#FF0083] transition-opacity hover:opacity-80',
            activeTab === 'history' && 'font-bold'
          )}
          onClick={() => setActiveTab('history')}
        >
          History
        </div>
      </div>
      <div className="my-[10px] h-[1px] w-full bg-[#F2F3F5]"></div>

      {activeTab === 'wallet' && <Wallets />}
      {activeTab === 'history' && <History />}
    </div>
  );
};
