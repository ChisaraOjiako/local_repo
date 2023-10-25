import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { useJsonQuery } from './utilities/fetch';
import CourseMenu from './components/CourseMenu';
import Navigation from './components/Navigation';
import { BrowserRouter as Router } from 'react-router-dom'; 



const queryClient = new QueryClient();



const App = () => (
  <Router>
  <QueryClientProvider client={queryClient}>
    <Navigation />
    <div className="main">
      <CourseMenu/>
    </div>
  </QueryClientProvider>
  </Router>
);

export default App;
