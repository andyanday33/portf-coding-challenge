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

  beers.forEach(beer => {
    const date = beer.first_brewed.split('/');
    console.log(date);
    if (date.length == 1) {
      beer.first_brewed = `Jan ${date[0]}`;
    } else {
      beer.first_brewed = `${monthMap.get(date[0])} ${date[1]}`;
    }
  })

  return (
    <div>
      <h1>{beers.length} Beers</h1>
      <section id="beer-graph">
        <BeerResponsiveBar data={beers}/>
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
