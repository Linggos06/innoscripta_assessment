import { BBC_NEWS, GUARDIAN_NEWS, NYTIMES_NEWS } from "../constants";

const prepareData = (response) => {
  const data = [];

  const sourceMapping = {
    [BBC_NEWS]: (value) => ({
      title: BBC_NEWS,
      body: value?.result?.data?.articles || [],
    }),
    [GUARDIAN_NEWS]: (value) => ({
      title: GUARDIAN_NEWS,
      body: value?.result?.data?.response?.results || [],
    }),
    [NYTIMES_NEWS]: (value) => ({
      title: NYTIMES_NEWS,
      body:
        value?.result?.data?.results ||
        value?.result?.data?.response?.docs ||
        [],
    }),
  };

  response.forEach(({ status, value }) => {
    if (status === "fulfilled") {
      const sourceHandler = sourceMapping[value.source];

      if (sourceHandler) {
        data.push(sourceHandler(value));
      }
    }
  });
  return data;
};

export default prepareData;
