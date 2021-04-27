import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import Calendar from './components/calendar/BookingCalendar'

// Query Client for quickly query the api and cache the results
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
})

function App() {
  return (<
    div className="App" >
    <QueryClientProvider client={queryClient}>
      <div className='siteHeader'>My Booking Calender </div>
      <Calendar />
    </QueryClientProvider>
  </div>
  );
}

export default App;