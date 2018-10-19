const fetch = {
  fetchAllFoods: () => {
    const fetchMenuUrl = `${localAPI}/menu`;

    return fetch(fetchMenuUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=UTF-8',
        'x-access-token': userToken,
      },
    });
  },
};
