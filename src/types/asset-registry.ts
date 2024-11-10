export interface Registry {
  [chainName: string]: ChainConfig;
}

export interface ChainConfig {
  [paraId: string]: ParaChainConfig;
}

export interface ParaChainConfig {
  tokens: string[];
  assetsInfo: {
    [assetId: string]: string; // 资产ID到资产符号的映射
  };
  foreignAssetsInfo: {
    [key: string]: ForeignAssetInfo;
  };
  poolPairsInfo: {
    [pairId: string]: PoolPairInfo;
  };
  specName: string;
  xcAssetsData?: XcAssetData[];
}

export interface ForeignAssetInfo {
  symbol: string;
  name: string;
  multiLocation: string;
  assetHubReserveLocation: string;
  originChainReserveLocation: string;
}

export interface PoolPairInfo {
  lpToken: string;
  pairInfo: string; // JSON字符串,包含pair的具体配置
}

export interface XcAssetData {
  paraID: number;
  nativeChainID: string;
  symbol: string;
  decimals: number;
  xcmV1MultiLocation: string;
  asset: {
    ForeignAsset: string;
  };
  assetHubReserveLocation: string;
}
