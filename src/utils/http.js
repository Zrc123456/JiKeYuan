import axios from "axios";

const http = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // console.log(config);
    const jekeyuan = JSON.parse(window.localStorage.getItem("jiKeYuan"));

    if (jekeyuan) {
      config.headers["Authorization"] = "Bearer " + jekeyuan.token;
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { http };
