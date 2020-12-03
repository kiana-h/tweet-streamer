const cache = new Map();

export const getTweetsByDateTime = async (dateTime) => {
  // Only fetch from cache if not the "live" hour
  if (
    new Date(dateTime) <= new Date().setMinutes(0, 0, 0) &&
    cache.has(dateTime)
  ) {
    return cache.get(dateTime);
  }
  const result = await fetch(`/tweets/${dateTime}`, {
    // method: "GET",
    // mode: "cors",
    // cache: "no-cache",
    // credentials: "same-origin",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // redirect: "follow",
    // referrerPolicy: "no-referrer",
  });
  const json = await result.json();
  cache.set(dateTime, json);
  return json;
};
