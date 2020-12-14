const cache = new Map();

export const getTweetsByDateTime = async (dateTime) => {
  // Only fetch from cache if not the "live" hour
  if (
    new Date(dateTime) < new Date().setMinutes(0, 0, 0) &&
    cache.has(dateTime)
  ) {
    return cache.get(dateTime);
  }
  const result = await fetch(`/tweets/${dateTime}`);
  const json = await result.json();
  if (new Date(dateTime) <= new Date().setMinutes(0, 0, 0)) {
    cache.set(dateTime, json);
  }

  return json;
};
