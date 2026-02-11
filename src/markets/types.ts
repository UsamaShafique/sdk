export type MarketStatus = 'Live' | 'New' | 'WaitingForResult' | 'UnderDispute' | 'UnderAppeal' | 'ClosingSoon' | 'InReview' | 'InEvaluation' | 'Closed' | 'Trading';

export type MarketSortBy =
    | 'Liquidity'
    | 'Volumn'
    | 'latest';

export interface GetMarketsParams {
    limit?: number;
    offset?: number;
    sortBy?: MarketSortBy;
    status?: MarketStatus;
}

export interface Market {
    id: string;
    title: string;
    totalVolume: string;
    status: MarketStatus;
    // add more fields as your API returns
}

export interface MarketOption {
    optionName: string;
}

export interface CreateMarketParams {
    authToken: string;
    question: string;
    isPrivate: boolean;
    contractAddress: `0x${string}`;
    poolTrxHash: `0x${string}`;
    ipfsURL: string;
    poolDescription: string;
    tags: string[];
    options: MarketOption[];
    startDate: string;    // ISO 8601
    endDate: string;      // ISO 8601
    liquidityMax: number;
}

export interface CreateMarketResponse {
    _id: string;
    question: string;
    isPrivate: boolean;
    tags: string[];
    startDate: string;
    endDate: string;
    options: MarketOption[];
    liquidityMax: number;
    contractAddress: `0x${string}`;
    poolTrxHash: `0x${string}`;
    ipfsURL: string;
    accessCode?: string;  // only for private markets
}
