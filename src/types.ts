export interface CardParameters {
  logo: string;
  ticker: string;
  company_name: string;
  card_number: string;
  revenue: string;
  year: string;
  colors: string[];
  signature?: string;
}

export interface BRollParameters {
  topic: string;
  style: string;
  palette: string;
}

export interface IconSetParameters {
  use_case: string;
  style: string;
  color_scheme: string;
  custom_instructions: string;
  icons: string;
}

export type GeneratorType = 'trading-card' | 'b-roll' | 'icon-set';