export interface ILangs {
  languages: "es" | "en";
}

export interface IUser {
  user: {
    id: number;
    avatar: string | null;
    name: string;
    email: string;
    dni: string | null;
    influencer_id: number | null;
    is_active: boolean;
    phone: string;
    role: "Admin" | "Influencer";
    content_code: string | null;
    is_first_entry: boolean;
  };
}

export interface IDetailsPagoMovil {
  dni: string;
  phone: string;
  bank: string;
  name: string;
}

export interface IDetailsZelle {
  name: string;
  email: string;
  bank: undefined;
  dni: undefined;
}

export interface IPrizes {
  name: string;
  days_to_award: number;
  prize_position: number;
}

export interface IAd {
  url: string | null
}

export interface IRaffles {
  id: number;
  ad: IAd;
  combos: null;
  raffle_type: "Infinito" | "Triple" | "Terminal";
  has_winners: boolean;
  init_date: string;
  expired_date: string | null;
  price_unit: number;
  draw_type: "Infinito" | "Progresiva" | "Fecha límite";
  tickets_count: number;
  status: "En venta" | "Finalizando" | "Cerrado";
  title: string;
  winners: boolean;
  prizes: IPrizes[] | null;
  money: "USD" | "VES" | "COP";
  limit: number;
  social_influencer_id: number;
  created_at: string;
  updated_at: string
}
