import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { useJsonQuery } from './utilities/fetch';
import { useState } from "react";
import CourseMenu from './components/CourseMenu';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="main">
      <CourseMenu/>
    </div>
  </QueryClientProvider>
);

export default App;
