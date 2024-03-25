import { BBC_NEWS, GUARDIAN_NEWS, NYTIMES_NEWS } from "../constants";

const convertData = (data) => {
  if (data.length === 0) return data;

  const transformedData = [];

  for (const { title, body } of data) {
    if (!body || body.length === 0) {
      continue;
    }

    let sourceData;

    if (title === BBC_NEWS) {
      sourceData = body.map(({ source, title, url, publishedAt }) => ({
        title,
        url,
        author: source.name,
        publishedAt,
      }));
    }

    if (title === GUARDIAN_NEWS) {
      sourceData = body.map(({ webTitle, webUrl, webPublicationDate }) => ({
        title: webTitle,
        url: webUrl,
        author: "The Guardian",
        publishedAt: webPublicationDate,
      }));
    }

    if (title === NYTIMES_NEWS) {
      sourceData = body.map((item) => ({
        title: item?.title || item?.headline?.main,
        url: item?.url || item?.web_url,
        author: "New York Times",
        publishedAt: item?.published_date || item?.pub_date,
      }));
    }
    transformedData.push(sourceData);
  }
  return transformedData;
};

export default convertData;
