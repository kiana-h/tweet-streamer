export const getTweetsByDateTime = (dateTime) => {
  return fetch(`/tweets/${dateTime}`, {
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
};
