const mergeData = (data) => {
  if (data.length === 0) return data;
  if (data.length === 1) return data[0];

  const mergedData = [];

  const lengths = data.map((arr) => arr.length);
  const maxValue = Math.max(...lengths);

  for (let i = 0; i < maxValue; i++) {
    const arr = [];
    if (data[0][i]) arr.push(data[0][i]);
    if (data[1][i]) arr.push(data[1][i]);
    if (data[2]?.[i]) arr.push(data[2][i]);
    mergedData.push(...arr);
  }
  return mergedData;
};

export default mergeData;
