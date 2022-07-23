import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useFetch from './useFetch';
const queryClient = new QueryClient();

function Example() {
  const {isLoading, error, data} = useFetch('https://api.punkapi.com/v2/beers');

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  console.log(data);
  return (
    <div>
      <h1>{data.length} Beers</h1>
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
