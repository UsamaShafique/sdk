import { apiRequest } from '../utils/apiRequest.js';
import { CreateMarketParams, CreateMarketResponse } from './types.js';

export async function createMarket(
    params: CreateMarketParams
): Promise<CreateMarketResponse> {
    const { authToken, ...body } = params;

    if (!authToken || typeof authToken !== 'string') {
        throw new Error('authToken is required');
    }

    if (!body.question || typeof body.question !== 'string' || !body.question.trim()) {
        throw new Error('question is required and must be a non-empty string');
    }

    if (typeof body.isPrivate !== 'boolean') {
        throw new Error('isPrivate must be a boolean');
    }

    if (!body.contractAddress || typeof body.contractAddress !== 'string') {
        throw new Error('contractAddress is required');
    }

    if (!body.poolTrxHash || typeof body.poolTrxHash !== 'string') {
        throw new Error('poolTrxHash is required');
    }

    if (!body.ipfsURL || typeof body.ipfsURL !== 'string' || !body.ipfsURL.trim()) {
        throw new Error('ipfsURL is required and must be a non-empty string');
    }

    if (!body.poolDescription || typeof body.poolDescription !== 'string' || !body.poolDescription.trim()) {
        throw new Error('poolDescription is required and must be a non-empty string');
    }

    if (!Array.isArray(body.tags)) {
        throw new Error('tags must be an array');
    }

    if (!Array.isArray(body.options) || body.options.length < 2) {
        throw new Error('options must be an array with at least 2 items');
    }

    for (const option of body.options) {
        if (!option.optionName || typeof option.optionName !== 'string' || !option.optionName.trim()) {
            throw new Error('Each option must have a non-empty optionName');
        }
    }

    const start = new Date(body.startDate);
    const end = new Date(body.endDate);

    if (!body.startDate || isNaN(start.getTime())) {
        throw new Error('startDate is required and must be a valid ISO date');
    }

    if (!body.endDate || isNaN(end.getTime())) {
        throw new Error('endDate is required and must be a valid ISO date');
    }

    if (end <= start) {
        throw new Error('endDate must be after startDate');
    }

    if (typeof body.liquidityMax !== 'number' || body.liquidityMax <= 0) {
        throw new Error('liquidityMax is required and must be a positive number');
    }

    const response = await apiRequest<{ data: CreateMarketResponse }>(
        '/pools/create-pool',
        {
            method: 'POST',
            authToken,
            body: body as unknown as Record<string, unknown>,
        }
    );

    return response.data;
}
