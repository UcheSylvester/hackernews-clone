const fetchWithRetry = async (url: string, retries = 3) => {
  let response = await fetch(url);

  if (!response.ok && retries !== 0) {
    response = await fetchWithRetry(url, retries - 1);
  }

  return response;
};

export const getRequest = async (url: string) => {
  const response = await fetchWithRetry(url);
  return response.json();
};
