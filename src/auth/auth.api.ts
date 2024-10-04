import {userType} from "./auth";
import {axiosInstance} from "../../config";

export function fetchLoggedInUser() {
    return new Promise<{ data: userType }>((resolve) =>
        setTimeout(() => resolve({ data: {first_name: "Janet", last_name: 'Doe', id: 29939} }), 500)
    );
}

export function loginUser(data: any) {
    return new Promise(async (resolve, reject) => {
        try {
            const {data: {data: response}} = await axiosInstance.post('/login', data);
            resolve(response);
        } catch (e: any) {
            console.log(e.response.data.message);
            reject(e);
        }
    })
}
