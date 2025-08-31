import httpRequest from "@/api/httpRequest";

interface PricingData {
    name: string;
    price: number;
    createAt: string;
}

export const PricingApi = {
    selectPricings: (data: PricingData) => httpRequest.post('/pricing', data),
}