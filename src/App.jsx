import Banner from './components/Banner';
import CourseList from './components/CourseList';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';

const url = "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php"
const queryClient = new QueryClient();

const Main = ({url}) => {
  const [data, isLoading, error] = useJsonQuery(url);

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  return(<div className='App'>
    <Banner title = {data.title}/>
    <div>{Object.entries(data).courses}</div>
    <CourseList courses = {data.courses}/>
  </div>);
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="main">
      <Main url = {url}/>
    </div>
  </QueryClientProvider>
);

export default App;

