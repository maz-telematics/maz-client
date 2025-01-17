// transportSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Location {
    latitude: number;
    longitude: number;
  }
  
  // Тип для транспортного средства
  export interface Transport {
    latitude: any;
    longitude: any;
    name: any;
    location: any;
    organizationName: string;
    model: string;
    id: string;
    lastLocation: Location | null;
    status: string | null;
  }
  
  // Тип для ответа сервера с транспортными средствами
  export interface TransportResponse {
    transports: Transport[];
    name: string;
  }

// Тип состояния
interface TransportState {
  transports: TransportResponse[];
}

const initialState: TransportState = {
  transports: [],
};

const transportSlice = createSlice({
  name: 'transports',
  initialState,
  reducers: {
    setTransports: (state, action: PayloadAction<TransportResponse[]>) => {
      state.transports = action.payload;
    },
  },
});

export const { setTransports } = transportSlice.actions;

export default transportSlice.reducer;
