import instance from "./axiosConfig";

const apiGet = async (url) => instance.get(url);

export { apiGet };
