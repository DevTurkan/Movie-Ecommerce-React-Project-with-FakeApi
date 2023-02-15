import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {Notify} from 'pages/Notification'

enum StatusCode {
    Unauthorized = 401,
    Forbidden = 403,
    TooManyRequests = 429,
    InternalServerError = 500,
}


const headers: Readonly<Record<string, string | boolean>> = {
    Accept: "application/json",
    'Content-Language' : 'az'
};


// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
    try {

        /*const auth_token=getUserAuthTokenVerified();
        if (auth_token != null) {
            config.headers.auth_token  = `${auth_token}`;
        }*/

        return config;
    } catch (error) {
        throw new Error(error);
    }
};

class Http {
    private instance: AxiosInstance | null = null;

    private get http(): AxiosInstance {
        return this.instance != null ? this.instance : this.initHttp();
    }

    initHttp() {
        const http = axios.create({
            baseURL: process.env.API_URL,
            headers : headers,
            withCredentials: false,
        });

        http.interceptors.request.use(injectToken, (error) => Promise.reject(error));

        http.interceptors.response.use(
            (response) => response,
            (error) => {
                const { response } = error;
                return this.handleError(response);
            }
        );

        this.instance = http;
        return http;
    }

    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        return this.http.request(config);
    }

    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.get<T, R>(url, config);
    }

    post<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.post<T, R>(url, data, config);
    }

    put<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.put<T, R>(url, data, config);
    }

    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.delete<T, R>(url, config);
    }

    // Handle global app errors
    // We can handle generic app errors depending on the status code
    private handleError(error: { data?: any; status?: any; }) {
        // console.log('................................', error, error.status)

        const { status } = error;
        // console.log('................................ sttaus', error, error.data.messages[0].MESSAGE)

        switch (status) {
            case StatusCode.InternalServerError: {
                if(error.data && error.data.messages) {
                    Notify( error.data.messages[0].MESSAGE)
                } else {
                    Notify(error.data)
                }
                break;
            }
            case StatusCode.Forbidden: {
                // Handle Forbidden
                if(error.data.messages[0]) {
                    Notify( error.data.messages[0].MESSAGE)
                }
                break;
            }
            case StatusCode.Unauthorized: {

                break;
            }
            case StatusCode.TooManyRequests: {
                // Handle TooManyRequests
                if(error.data.messages[0]) {
                    Notify( error.data.messages[0].MESSAGE)
                }
                break;
            }
        }

        return Promise.reject(error);
    }
}

export const http = new Http();
