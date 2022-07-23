import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useFetch from './useFetch';
import BeerResponsiveBar from './components/ResponsiveBeerBar';

const queryClient = new QueryClient();

function BarGraph(props) {
  const {isLoading, error, data} = useFetch(props.url, 1, 5);

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  // Process the data to extract all beers
  const beers = [];
  console.log(data);
  data.forEach(({ value }) => {
    beers.push(...value);
  })
  console.log(beers);

  // Process the dates on beers data array
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
  const processedData = new Map();
  let totalAbv = 0;
  // Group by dates and find ABV for each date
  beers.forEach(beer => {
    totalAbv += beer.abv;
    const rawDate = beer.first_brewed.split('/');
    let newDate = null;
    if (rawDate.length === 1) {
      newDate = `Jan ${rawDate[0]}`;
    } else {
      newDate = `${monthMap.get(rawDate[0])} ${rawDate[1]}`;
    }
    // Find the new ABV
    if (processedData.has(newDate)) {
      const dateBar = processedData.get(newDate);
      dateBar.beerCount++;
      dateBar.abv += beer.abv;
    } else {
      // Add the new date to the map
      processedData.set(newDate, {
        beerCount: 1,
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
    if(a.date < b.date) return -1;
    if(a.date > b.date) return 1;
    return 0;
  }
  );

  return (
    <div>
      <h1>{beers.length} Beers</h1>
      <section id="beer-graph">
        <BeerResponsiveBar data={processedDataArray}/>
      </section>
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
