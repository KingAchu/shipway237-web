import { writable } from 'svelte/store';

export type ServiceType = 'vehicle' | 'barrel' | 'procurement';
export type VehicleCondition = 'runs' | 'inoperable' | 'parts';
export type BarrelSize = '30gal' | '55gal' | '75gal' | '110gal';

export interface ClientInfo {
  full_name: string;
  email: string;
  phone: string;
  preferred_lang: 'en' | 'fr';
  country: string;
}

export interface VehicleDetails {
  vehicle_year: number | null;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_trim: string;
  vehicle_freetext: string;
  vin: string;
  condition: VehicleCondition | null;
}

export interface BarrelDetails {
  barrel_size: BarrelSize | null;
  quantity: number;
  contents_description: string;
}

export interface ProcurementDetails {
  item_description: string;
  item_url: string;
  quantity: number;
  budget_cad: number | null;
}

export interface CameroonAddress {
  recipient_name: string;
  recipient_phone: string;
  city: string;
  neighbourhood: string;
  landmark: string;
  full_description: string;
}

export interface BookingState {
  service_type: ServiceType | null;
  pickup_schedule_id: string;
  pickup_city: string;
  client: ClientInfo;
  vehicle: VehicleDetails;
  barrel: BarrelDetails;
  procurement: ProcurementDetails;
  cameroon_address: CameroonAddress;
  // Set after successful submission
  reference_no: string;
  order_id: string;
}

const initialState: BookingState = {
  service_type: null,
  pickup_schedule_id: '',
  pickup_city: '',
  client: {
    full_name: '',
    email: '',
    phone: '',
    preferred_lang: 'en',
    country: 'CA',
  },
  vehicle: {
    vehicle_year: null,
    vehicle_make: '',
    vehicle_model: '',
    vehicle_trim: '',
    vehicle_freetext: '',
    vin: '',
    condition: null,
  },
  barrel: {
    barrel_size: null,
    quantity: 1,
    contents_description: '',
  },
  procurement: {
    item_description: '',
    item_url: '',
    quantity: 1,
    budget_cad: null,
  },
  cameroon_address: {
    recipient_name: '',
    recipient_phone: '',
    city: '',
    neighbourhood: '',
    landmark: '',
    full_description: '',
  },
  reference_no: '',
  order_id: '',
};

export const booking = writable<BookingState>(structuredClone(initialState));

export function resetBooking() {
  booking.set(structuredClone(initialState));
}
