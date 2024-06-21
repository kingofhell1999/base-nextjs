import axios from "axios";

let axiosInstance = null;

function getInstance() {
    if (axiosInstance != null) {
        return axiosInstance;
    }
    axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_APP_API_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });
    //hook interceptor cài ở đây
    axiosInstance.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            const status = error.response.status;
            switch (status) {
                case 400:
                    console.log(
                        "Bad Request. cú pháp yêu cầu không đúng định dạng, khung thông báo yêu cầu không hợp lệ hoặc định tuyến yêu cầu lừa đảo"
                    );
                    break;
                case 401:
                    console.log(
                        "Unauthorized . the client phải tự xác thực để nhận được phản hồi được yêu cầu"
                    );
                    break;
                case 403:
                    console.log("Forbidden.Khách hàng không có quyền truy cập vào nội dung");
                    break;
                case 404:
                    console.log("Not Found.Máy chủ không thể tìm thấy tài nguyên được yêu cầu");
                    break;
                default:
                    break;
            }
            throw error;
            // return Promise.reject(error);
        }
    );
    return axiosInstance;
}

function get(endpointApiUrl, payload = {}, config = {}) {
    return getInstance().get(endpointApiUrl, {
        params: payload,
        ...config,
    });
}

function post(endpointApiUrl, payload = {}, config = {}) {
    return getInstance().post(endpointApiUrl, payload, config);
}

function put(endpointApiUrl, payload = {}, config = {}) {
    return getInstance().put(endpointApiUrl, payload, config);
}

function del(endpointApiUrl, payload = {}, config = {}) {
    return getInstance().delete(endpointApiUrl, payload, config);
}

function patch(endpointApiUrl, payload = {}, config = {}) {
    return getInstance().patch(endpointApiUrl, payload, config);
}

export const Axios = {
    axiosInstance,
    get,
    post,
    put,
    del,
    patch
};
