import axios from "axios";

interface LoginData {
    username: string;
    password: string;
    grant_type: string;
    phoneNumber: string;
}

export const AuthApi = {
    login: async (data: LoginData) => {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_AUTH_URL + '/connect/token',
            new URLSearchParams({
                username: data.username,
                password: data.password,
                grant_type: data.grant_type,
                phoneNumber: data.phoneNumber,
            }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        if (response.data) {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            localStorage.setItem("expires_in", response.data.expires_in.toString());
        }
        return response.data;
    }
}