import { apiGet } from "./axios/axiosUtils";

const fetchData = async (urls) => {
  const requests = urls.map(({ source, url }) =>
    apiGet(url)
      .then((result) => ({ result, source }))
      .catch((reason) => ({ reason, source }))
  );
  return await Promise.allSettled(requests);
};

export default fetchData;
