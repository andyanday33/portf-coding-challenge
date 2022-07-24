import { useQuery } from "@tanstack/react-query";

/**
 * Fetches data from an API and returns a promise that resolves with the data.
 * Merges multiple pages inside API responses.
 * 
 * @param {string} url API endpoint to fetch data from 
 * @param {number} startPage starting page of the API response
 * @param {number} endPage ending page of the API response
 * @returns An object containing: 
 * A promise of all the data between startPage and endPage (including endPage)
 * in a single array.
 * An error if the request failed. 
 * And a boolean indicating
 * whether the request is in progress.
 */
const useFetch = (url, startPage, endPage) => {

  const { isLoading, error, data } = useQuery(['beerData'], () =>
    {
      let pages = [];
      for(let page = startPage; page <= endPage; page++) {
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
