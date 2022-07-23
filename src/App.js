import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useFetch from './useFetch';
const queryClient = new QueryClient();

function Example() {
  const {isLoading, error, data} = useFetch('https://api.punkapi.com/v2/beers', 1, 5);

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  // Process the data to extract all beers
  const beers = [];
  console.log(data);
  data.forEach(({ value }) => {
    beers.push(...value);
  })
  console.log(beers);

  return (
    <div>
      <h1>{beers.length} Beers</h1>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}
