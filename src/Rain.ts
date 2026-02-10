import { GetMarketsParams, Market, CreateMarketParams, CreateMarketResponse } from './markets/types.js';
import { getMarkets } from './markets/getMarkets.js';
import { createMarket } from './markets/createMarket.js';
import { ApproveTxParams, EnterLimitOptionTxParams, EnterOptionTxParams, RawTransaction } from './tx/types.js';
import { buildEnterOptionRawTx, buildLimitBuyOrderRawTx } from './tx/buildRawTransactions.js';
import { buildApproveRawTx } from './tx/buildApprovalRawTx.js';

export class Rain {

  async getPublicMarkets(params: GetMarketsParams): Promise<Market[]> {
    return getMarkets(params);
  }

  async createMarket(params: CreateMarketParams): Promise<CreateMarketResponse> {
    return createMarket(params);
  }

  buildApprovalTx(params: ApproveTxParams): RawTransaction | Error {
    return buildApproveRawTx(params);
  }

  buildBuyOptionRawTx(params: EnterOptionTxParams): RawTransaction {
    return buildEnterOptionRawTx(params);
  }

  buildLimitBuyOptionTx(
    params: EnterLimitOptionTxParams
  ): RawTransaction {
    return buildLimitBuyOrderRawTx(params);
  }

}
