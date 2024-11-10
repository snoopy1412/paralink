'use server';
import type { ChainInfo } from '@/types/chains-info';
import type { Asset } from '@/types/assets-info';

export async function fetchChainsInfo(): Promise<ChainInfo[]> {
  const res = await fetch('https://content.subwallet.app/api/list/chain');
  const data = await res.json();
  return data;
}

export async function fetchAssetsInfo(): Promise<Asset[]> {
  const res = await fetch('https://content.subwallet.app/api/list/chain-asset');
  const data = await res.json();
  return data;
}
