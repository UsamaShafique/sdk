import { API_BASE_URL } from '../config/api.js';
import { MARKET_SORT_BY, MARKET_STATUS } from './constants.js';
import { GetMarketsParams, Market } from './types.js';

export async function getMarkets(
    params: GetMarketsParams
): Promise<Market[]> {
    const query = new URLSearchParams();
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.offset) query.append('offset', params.offset.toString());
    if (params?.sortBy) query.append('sortBy', MARKET_SORT_BY[params.sortBy]);
    if (params?.status) query.append('status', MARKET_STATUS[params.status]);
    const res = await fetch(`${API_BASE_URL}/pools/public-pools?${query.toString()}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch markets: ${res.status}`);
    }

    const data = await res.json();
    return data;
}
