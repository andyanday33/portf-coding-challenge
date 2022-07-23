import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import BeerResponsiveBar from './components/ResponsiveBeerBar';

const queryClient = new QueryClient();

function BarGraph(props) {
  const {isLoading, error, data} = useFetch(props.url, 1, 5);
  const [finalData, setFinalData] = useState([]);

  const processData = (data, error) => {
    if(data && !error) {
      // Process the data to extract all beers
      const beers = [];
      console.log(data);
      data.forEach(({ value }) => {
        beers.push(...value);
      })
      console.log(beers);

      
      const processedData = new Map();
      let totalAbv = 0;
      // Group by dates and find ABV for each date
      beers.forEach(beer => {
        totalAbv += beer.abv;
        const rawDate = beer.first_brewed.split('/');
        let newDate = null;
        if (rawDate.length === 1) {
          newDate = `01/${rawDate[0]}`;
        } else {
          newDate = beer.first_brewed;
        }
        // Find the new ABV
        if (processedData.has(newDate)) {
          const dateBar = processedData.get(newDate);
          dateBar.abv += beer.abv;
        } else {
          // Add the new date to the map
          processedData.set(newDate, {
            abv: beer.abv,
          });
        }
      });

      // Find percentages
      processedData.forEach((value, key) => {
        value.abv = value.abv / totalAbv * 100;
        value.abv = value.abv.toFixed(2);
      });

      // Convert the map to an array
      const processedDataArray = [];
      processedData.forEach((value, key) => {
        processedDataArray.push({
          date: key,
          ...value,
          });
        }
      );

      // Sort the data by date
      processedDataArray.sort((a, b) => {
        const dateA = a.date.split('/');
        const dateB = b.date.split('/');
        // Compare years
        if(dateA[1] < dateB[1]) { 
          return -1;
        }
        if(dateA[1] > dateB[1]) {
          return 1;
        }
        // Compare months
        if(dateA[0] < dateB[0]) {
          return -1;
        }
        if(dateA[0] > dateB[0]) {
          return 1;
        }
        return 0;
      }
      );

      // Refactor the dates
      const monthMap = new Map();
      monthMap.set("01", "Jan");
      monthMap.set("02", "Feb");
      monthMap.set("03", "Mar");
      monthMap.set("04", "Apr");
      monthMap.set("05", "May");
      monthMap.set("06", "Jun");
      monthMap.set("07", "Jul");
      monthMap.set("08", "Aug");
      monthMap.set("09", "Sep");
      monthMap.set("10", "Oct");
      monthMap.set("11", "Nov");
      monthMap.set("12", "Dec");
      processedDataArray.forEach(data => {
        data.date = `${monthMap.get(data.date.split('/')[0])} ${data.date.split('/')[1]}`;
      });

      return processedDataArray;
    }
    return [];
  }

  useEffect(() => {
    setFinalData(processData(data, error));
  }, [data, error]);

  const changeData = () => {
    setFinalData([{date:'Jan 2019', abv: 10}, ...finalData]);
  }

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <section id="beer-graph">
        {finalData.length > 0 && <BeerResponsiveBar data={finalData}/>}
      </section>
      <button onClick={() => changeData()}>B</button>
    </div>
  );
}

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BarGraph url={`https://api.punkapi.com/v2/beers`}/>
      </QueryClientProvider>
    </>
    
  );
}
