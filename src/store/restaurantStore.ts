import { create } from 'zustand';


export interface Restaurant {
 address_complete: string;
  logo: string;
  restaurant_id: string;
  restaurant_name: string;
}


interface RestaurantState {
restaurants: Restaurant[];
fetchRestaurants: () => Promise<void>;
}


export const useRestaurantStore = create<RestaurantState>((set) => ({
restaurants: [],
fetchRestaurants: async () => {
const res = await fetch('https://staging.fastor.ai/v1/m/restaurant?city_id=118&&');
  const data = await res.json();
  console.log(data,"fff")
set({ restaurants: data.data?.results
 });
},
}));