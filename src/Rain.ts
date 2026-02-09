import { GetMarketsParams, Market } from './markets/types.js';
import { getMarkets } from './markets/getMarkets.js';
import { ApproveTxParams, EnterLimitOptionTxParams, EnterOptionTxParams, RawTransaction } from './tx/types.js';
import { buildEnterOptionRawTx, buildLimitBuyOrderRawTx } from './tx/buildRawTransactions.js';
import { buildApproveRawTx } from './tx/buildApprovalRawTx.js';

export class Rain {

  async getPublicMarkets(params: GetMarketsParams): Promise<Market[]> {
    return getMarkets(params);
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
