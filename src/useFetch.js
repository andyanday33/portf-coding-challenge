import { useQuery } from "@tanstack/react-query";

const useFetch = (url, minPage, maxPage) => {

  const { isLoading, error, data } = useQuery(['beerData'], () =>
    {
      let pages = [];
      for(let page = minPage; page <= maxPage; page++) {
        pages.push(fetch(url + `?page=${page}&per_page=80`).then(res =>
          res.json()
        ));
      }
      const res = Promise.allSettled(pages)
      
      return res;
    }
  );

  return { isLoading, error, data };
}

export default useFetch;
