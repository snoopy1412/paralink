'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import { AddressInput } from '@/components/address-input';
import Alert from '@/components/alert';
import { ChainSelect } from '@/components/chain-select';
import { FeeBreakdown } from '@/components/fee-breakdown';
import { TokenSelect } from '@/components/token-select';
import { Button } from '@/components/ui/button';
import { TransactionDetail } from '@/components/transaction-detail';

const chains = [
  {
    id: 'assethub',
    name: 'AssetHub',
    icon: '/chains/assethub.png'
  },
  {
    id: 'darwinia',
    name: 'Darwinia',
    icon: '/chains/darwinia.png'
  }
  // 添加更多链
];

const mockTokens = [
  {
    symbol: 'USDT',
    name: 'Tether USD',
    icon: '/images/test3.svg',
    balance: '5,000.33',
    address: '0x4h716...12f4hfw'
  }
];

export default function Dashboard() {
  const [fromChain, setFromChain] = useState<string>();
  const [toChain, setToChain] = useState<string>();
  const [selectedToken, setSelectedToken] = useState(mockTokens[0]);

  return (
    <>
      <div className="container absolute left-0 right-0 top-[calc(var(--header-height)+10px)]">
        <Alert
          message={
            <p className="space-x-[10px]">
              <strong>Bridge Tokens with Paralink! </strong>
              <span>
                Paralink makes it easy to take your tokens interchain.
              </span>
              <a
                className="font-bold"
                href="https://github.com/ringecosystem/paralink/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get started now↗
              </a>
            </p>
          }
          closable={true}
        />
      </div>

      <div className="container mt-[120px] flex flex-col gap-[30px] md:mt-[100px]">
        <div className="mx-auto flex w-full flex-col gap-[20px] rounded-[var(--radius-lg)] bg-white p-[20px] shadow-sm md:w-[460px]">
          <div className="flex items-center gap-[10px]">
            <ChainSelect
              label="From"
              value={fromChain}
              chains={chains}
              onChange={setFromChain}
            />
            <div className="flex h-full items-center justify-center">
              <div className="flex cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-80">
                <Image
                  src="/images/tansfer.svg"
                  alt="assets"
                  width={24}
                  height={24}
                />
              </div>
            </div>

            <ChainSelect
              label="To"
              value={toChain}
              chains={chains}
              onChange={setToChain}
            />
          </div>

          <TokenSelect token={selectedToken} />

          <AddressInput />
          <FeeBreakdown
            amount={100}
            networkFee={0.01}
            crossChainFee={0.02}
            finalAmount={99.97}
          />
          <div className="h-[1px] w-full bg-[#F2F3F5]"></div>
          <Button className="w-full rounded-[10px] font-bold" color="primary">
            Confirm Transaction
          </Button>
        </div>
        {/* <TransactionDetail isOpen={true} onClose={() => {}} /> */}
      </div>
    </>
  );
}
