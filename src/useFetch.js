import { useQuery } from "@tanstack/react-query";

const useFetch = (url) => {

  const { isLoading, error, data } = useQuery(['beerData'], () =>
    {
      let page = 1;
      let res = fetch(url + `?page=${page}&per_page=80`).then(res =>
        res.json()
      )
      return res;
    }
  );

  return { isLoading, error, data };
}

export default useFetch;
