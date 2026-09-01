export type ScreenId = 1 | 2 | 3 | 4;

export interface ScreenConfig {
  id: ScreenId;
  tag: string;
  title: string;
  subtitle?: string;
  swipeLabel: string;
}

export interface QualifierAnswer {
  businessModel: string;
  revenueTier: string;
  currentBottleneck: string;
  adSpend: string;
}
