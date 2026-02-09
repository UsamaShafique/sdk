import { ethers } from "ethers";

export const convertToWeiEthers = (
    value: string | bigint,
    decimals: number
): bigint => {
    return ethers.parseUnits(value.toString(), decimals);
};