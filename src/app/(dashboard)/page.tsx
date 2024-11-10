'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { AddressInput } from '@/components/address-input';
import Alert from '@/components/alert';
import { FeeBreakdown } from '@/components/fee-breakdown';
import { TokenSelect } from '@/components/token-select';
import { Button } from '@/components/ui/button';
import { ConnectOrActionButton } from '@/components/connect-or-action-button';
// import { TransactionDetail } from '@/components/transaction-detail';
import {
  getDestinationParaChains,
  getSupportedParaChains,
  getTokenFromXcAsset
} from '@/lib/registry';
import { fetchAssetsInfo, fetchChainsInfo } from '@/services/fetch-assets';
import type { ChainInfoWithXcAssetsData } from '@/store/chains';
import { Asset } from '@/types/assets-info';
import useChainsStore from '@/store/chains';
import { fetchPolkadotAssetRegistry } from '@/services/fetch-asset-registry';
import { ChainSwitcher } from './_components/chain-switcher';
import Loading from './_components/loading';

import type { TokenWithBalance } from '@/types/token';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [assets, setAssets] = useState<Asset[]>([]);
  const [fromParachains, setFromParachains] = useState<
    ChainInfoWithXcAssetsData[]
  >([]);
  const [toParachains, setToParachains] = useState<ChainInfoWithXcAssetsData[]>(
    []
  );
  const [tokens, setTokens] = useState<TokenWithBalance[]>([]);
  const [selectedToken, setSelectedToken] = useState<TokenWithBalance>();
  const [amount, setAmount] = useState<string>('');

  const [recipientAddress, setRecipientAddress] = useState<string>('');

  const {
    chains,
    setChains,
    fromChainId,
    toChainId,
    setFromChainId,
    setToChainId
  } = useChainsStore(
    useShallow((state) => ({
      chains: state.chains,
      setChains: state.setChains,
      fromChainId: state.fromChainId,
      toChainId: state.toChainId,
      setFromChainId: state.setFromChainId,
      setToChainId: state.setToChainId
    }))
  );

  const fromChain = useChainsStore((state) => state.getFromChain());
  const toChain = useChainsStore((state) => state.getToChain());

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
    [setFromChainId, setToChainId]
  );

  const handleChangeFromChainId = useCallback(
    (id: string) => {
      setupCrossChainConfig(chains, id);
    },
    [chains, setupCrossChainConfig]
  );

  const handleClick = useCallback(() => {
    console.log('amount', amount);
  }, [amount]);

  const handleSwitch = useCallback(() => {
    if (!fromChainId || !toChainId) return;
    setSelectedToken(undefined);
    setAmount('');
    const newFromChainId = toChainId;
    const newToChainId = fromChainId;
    const newDestParachains = getDestinationParaChains(chains, newFromChainId);
    setToParachains(newDestParachains);
    setFromChainId(newFromChainId);
    setToChainId(newToChainId);
  }, [chains, fromChainId, setFromChainId, toChainId, setToChainId]);

  useEffect(() => {
    if (fromChain && toChainId) {
      const tokens = (fromChain?.xcAssetsData || [])
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
      if (tokens?.length) {
        setTokens(tokens);
        setSelectedToken(tokens[0]);
      }
    }
  }, [fromChain, toChainId, assets]);

  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
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
        setIsLoading(false);
      } catch (error) {
        console.warn(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
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
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div className="container flex flex-col gap-[30px] pt-[min(120px,15vh)] md:pt-[min(100px,12vh)]">
          <div className="mx-auto flex w-full flex-col items-center gap-6 rounded-[var(--radius)] bg-white p-6 text-center shadow-sm md:w-[460px] md:rounded-[var(--radius-lg)]">
            <div className="rounded-full bg-red-50 p-4">
              <svg
                className="h-8 w-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Failed to Load
              </h3>
              <p className="text-sm text-gray-500">
                Unable to fetch required data. Please check your network
                connection and try again.
              </p>
            </div>
            <Button onClick={() => window.location.reload()} variant="outline">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reload
            </Button>
          </div>
        </div>
      ) : (
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
            {/* <Button
              className="w-full rounded-[10px] font-bold"
              color="primary"
              onClick={handleClick}
            >
              Confirm Transaction
            </Button> */}
            <ConnectOrActionButton
              actionText="Confirm Transaction"
              onAction={handleClick}
            />
          </div>

          {/* <TransactionDetail isOpen={true} onClose={() => {}} /> */}
        </div>
      )}
    </>
  );
}
