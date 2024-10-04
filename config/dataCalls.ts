import { backendUrl} from "./__url"
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
}
});
axiosInstance.interceptors.response.use(
  (response: any) => response,
  (error:any) => {
    if (error.response.status === 404)   
 {
      // Handle 404 error, e.g., display a custom error message or redirect
      console.error('404 Not Found: The requested resource could not be found.');
      //window.location.href = '/404';
     throw new Error()
      // You can add more specific error handling logic here
    }
    return Promise.reject(error);
  }
);
