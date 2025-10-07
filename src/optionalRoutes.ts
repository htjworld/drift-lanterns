import type { ComponentType } from "react";

type LazyMod = { default: ComponentType<any> };

// CreditPage를 '있을 수도/없을 수도' 있는 선택 파일로 매핑
const creditMods = import.meta.glob<LazyMod>("./CreditPage.tsx");

// 존재 여부
export const hasCredit: boolean = "./CreditPage.tsx" in creditMods;

// lazy()에서 사용할 로더 (타입을 Promise<LazyMod>로 보장)
export const loadCredit = (): Promise<LazyMod> =>
  creditMods["./CreditPage.tsx"]
    ? creditMods["./CreditPage.tsx"]!()
    : Promise.resolve({ default: () => null });