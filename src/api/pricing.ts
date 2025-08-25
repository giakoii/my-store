import apiClient from "@/libraries/apiClient";

interface PricingData {
    name: string;
    price: number;
    createAt: string;
}

export const PricingApi = {
    selectPricings: (data: PricingData) => apiClient.post('/pricing', data),
}