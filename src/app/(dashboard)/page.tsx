'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AddressInput } from '@/components/address-input';
import Alert from '@/components/alert';
import { FeeBreakdown } from '@/components/fee-breakdown';
import { TokenSelect } from '@/components/token-select';
import { Button } from '@/components/ui/button';
// import { TransactionDetail } from '@/components/transaction-detail';

import { useShallow } from 'zustand/react/shallow';

import '@/assets/registry';
import {
  getDestinationParaChains,
  getSupportedParaChains,
  getTokenFromXcAsset
} from '@/assets/registry';
import { fetchAssetsInfo, fetchChainsInfo } from '@/services/fetch-assets';
import type { ChainInfoWithXcAssetsData } from '@/store/chains';
import { Asset } from '@/types/assets-info';
import useChainsStore from '@/store/chains';
import { fetchPolkadotAssetRegistry } from '@/services/fetch-asset-registry';
import { ChainSwitcher } from './_components/chain-switcher';

import type { TokenWithBalance } from '@/types/token';

export default function Dashboard() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [fromParachains, setFromParachains] = useState<
    ChainInfoWithXcAssetsData[]
  >([]);
  const [toParachains, setToParachains] = useState<ChainInfoWithXcAssetsData[]>(
    []
  );
  const [fromChainId, setFromChainId] = useState<string>('');
  const [toChainId, setToChainId] = useState<string>('');
  const [selectedToken, setSelectedToken] = useState<TokenWithBalance>();
  const [amount, setAmount] = useState<string>('');
  const [recipientAddress, setRecipientAddress] = useState<string>('');

  const { chains, setChains } = useChainsStore(
    useShallow((state) => ({
      chains: state.chains,
      setChains: state.setChains
    }))
  );

  const fromChain = useMemo(() => {
    return chains?.find((v) => v.id === fromChainId);
  }, [chains, fromChainId]);

  const toChain = useMemo(() => {
    return chains?.find((v) => v.id === toChainId);
  }, [chains, toChainId]);

  const setupCrossChainConfig = useCallback(
    (chains: ChainInfoWithXcAssetsData[], initialFromId?: string) => {
      const fromChains = chains?.filter((v) => v.xcAssetsData?.length);
      const fromChainId = initialFromId ? initialFromId : fromChains?.[0]?.id;
      const toChains = getDestinationParaChains(chains, fromChainId);
      const toChainId = toChains?.[0]?.id ?? '';

      setFromParachains(fromChains);
      setFromChainId(fromChainId);
      setToParachains(toChains);
      setToChainId(toChainId);
      return {
        fromChains,
        fromChainId,
        toChains,
        toChainId
      };
    },
    []
  );

  const handleChangeFromChainId = useCallback(
    (id: string) => {
      setupCrossChainConfig(chains, id);
    },
    [chains, setupCrossChainConfig]
  );

  const handleSwitch = useCallback(() => {
    const newFromChainId = toChainId;
    const newToChainId = fromChainId;
    const newDestParachains = getDestinationParaChains(chains, newFromChainId);
    setToParachains(newDestParachains);
    setFromChainId(newFromChainId);
    setToChainId(newToChainId);
  }, [chains, fromChainId, toChainId]);

  const tokens = useMemo<TokenWithBalance[]>(() => {
    if (fromChain && toChainId) {
      return (fromChain?.xcAssetsData || [])
        ?.filter((v) => v?.paraID?.toString() === toChainId)
        .map((v) => {
          const data = getTokenFromXcAsset({
            xcAssetData: v,
            assets: assets
          });
          return {
            symbol: data?.symbol,
            icon: data?.icon ?? '/images/default-token.svg',
            name: data?.name ?? data?.symbol
          };
        });
    }
    return [];
  }, [fromChain, toChainId, assets]);

  useEffect(() => {
    if (tokens?.length) {
      setSelectedToken(tokens[0]);
    }
  }, [tokens]);

  useEffect(() => {
    const initData = async () => {
      const polkadotAsset = await fetchPolkadotAssetRegistry();
      const supportedParaChains = await getSupportedParaChains(polkadotAsset);
      const chainAssets = await fetchChainsInfo();
      const assetsInfo = await fetchAssetsInfo();

      const supportedChains = supportedParaChains
        ?.map((chain) => {
          const chainAsset = chainAssets?.find(
            (v) => v.substrateInfo?.paraId?.toString() === chain.id
          );
          return chainAsset
            ? {
                ...chainAsset,
                id: chain?.id?.toString(),
                xcAssetsData: chain?.xcAssetsData
              }
            : null;
        })
        ?.filter((v) => !!v);

      setChains(supportedChains);
      setAssets(assetsInfo);
      setupCrossChainConfig(supportedChains);
    };
    initData();
  }, [setChains, setupCrossChainConfig]);

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

      <div className="container flex flex-col gap-[30px] pt-[min(120px,15vh)] md:pt-[min(100px,12vh)]">
        <div className="mx-auto flex w-full flex-col gap-[20px] rounded-[var(--radius)] bg-white p-[15px] shadow-sm md:w-[460px] md:rounded-[var(--radius-lg)] md:p-[20px]">
          <ChainSwitcher
            fromChainId={fromChainId}
            fromChain={fromChain}
            toChainId={toChainId}
            toChain={toChain}
            fromParachains={fromParachains}
            toParachains={toParachains}
            onChangeFromChain={handleChangeFromChainId}
            onChangeToChain={setToChainId}
            onSwitch={handleSwitch}
          />

          <TokenSelect
            token={selectedToken}
            onChangeToken={setSelectedToken}
            onChangeAmount={setAmount}
            tokens={tokens}
          />

          <AddressInput
            value={recipientAddress}
            chain={toChain}
            onChange={setRecipientAddress}
          />
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
