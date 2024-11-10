import type { ChainInfoWithXcAssetsData } from '@/store/chains';
import type { ChainConfig, XcAssetData } from '@/types/asset-registry';
import type { Asset } from '@/types/assets-info';

interface ParachainAsset {
  paraID: number;
  symbol: string;
  decimals: number;
  nativeChainID: string | null;
  xcmV1MultiLocation: string;
  asset: string | { ForeignAsset: string };
  assetHubReserveLocation: string;
  originChainReserveLocation: string;
}

export interface ParachainInfo {
  id: string;
  name: string;
  tokens: string[];
  xcAssetsData?: ParachainAsset[];
}

export function getSupportedParaChains(polkadot: ChainConfig) {
  return Object.entries(polkadot)?.map(([id, data]) => ({
    id,
    ...data
  }));
}

export function getDestinationParaChains(
  chains: ChainInfoWithXcAssetsData[],
  sourceParaId: string
) {
  if (!chains?.length) return [];
  const sourceChain = chains?.find((v) => v.id === sourceParaId) as
    | ChainInfoWithXcAssetsData
    | undefined;
  if (!sourceChain) return [];

  const destParaIds = new Set(
    sourceChain?.xcAssetsData?.map((x) => x.paraID?.toString()) ?? []
  );
  return chains.filter((v) => destParaIds.has(v.id));
}

export interface XcAssetWithMatch extends XcAssetData {
  icon?: string;
  name?: string;
}

export function getTokenFromXcAsset({
  xcAssetData,
  assets
}: {
  xcAssetData: XcAssetData;
  assets: Asset[];
}): XcAssetWithMatch {
  const { nativeChainID, symbol } = xcAssetData;

  const possibleSlugs = [
    `${nativeChainID}-NATIVE-${symbol}`,
    `${nativeChainID}-LOCAL-${symbol}`,
    `${nativeChainID}-ERC20-${symbol}`,
    `${nativeChainID}-ERC721-${symbol}`
  ];

  const matchedAsset = assets?.find((asset) => {
    const isSlugMatch = possibleSlugs.some((slug) =>
      asset.slug?.toLowerCase().startsWith(slug.toLowerCase())
    );
    const isSymbolMatch = asset.symbol?.toLowerCase() === symbol.toLowerCase();
    return isSlugMatch || isSymbolMatch;
  });

  const icon = matchedAsset
    ? matchedAsset?.icon
    : assets?.find((v) => v.symbol === symbol)?.icon;

  return {
    ...xcAssetData,
    name: matchedAsset?.name ?? undefined,
    icon: icon ?? undefined
  };
}

// // 使用示例 - 以2046链(darwinia)的xcAssetsData为例:
// const darwiniaXcAssets = registry['2046'].xcAssetsData
// // 获取DOT的图标
// const dotAsset = darwiniaXcAssets[0]
// /* dotAsset 数据:
// {
//   "paraID": 0,
//   "nativeChainID": "polkadot",
//   "symbol": "DOT",
//   "decimals": 10,
//   "xcmV1MultiLocation": "{\"v1\":{\"parents\":1,\"interior\":{\"here\":null}}}",
//   "asset": "1029",
//   "assetHubReserveLocation": "{\"parents\":\"1\",\"interior\":{\"X1\":{\"Parachain\":\"1000\"}}}",
//   "originChainReserveLocation": "{\"Parents\":\"1\",\"Interior\":{\"Here\":\"\"}}"
// }
// */

// const dotIcon = getTokenIconFromXcAsset({
//   xcAssetData: dotAsset,
//   assets
// })
// // => "https://media-resources.subwallet.app//2/polkadot_63b5dd41ef.png"

// // 获取USDT的图标
// const usdtAsset = darwiniaXcAssets[1]
// /* usdtAsset 数据:
// {
//   "paraID": 1000,
//   "nativeChainID": "statemint",
//   "symbol": "ahUSDT",
//   "decimals": 6,
//   "xcmV1MultiLocation": "{\"v1\":{\"parents\":1,\"interior\":{\"x3\":[{\"parachain\":1000},{\"palletInstance\":50},{\"generalIndex\":1984}]}}}",
//   "asset": "1027",
//   "assetHubReserveLocation": "{\"parents\":\"1\",\"interior\":{\"X1\":{\"Parachain\":\"1000\"}}}"
// }
// */

// const usdtIcon = getTokenIconFromXcAsset({
//   xcAssetData: usdtAsset,
//   assets
// })
// // => "https://media-resources.subwallet.app/usdc_e38d9014d6.png"
