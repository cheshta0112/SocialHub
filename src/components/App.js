import { useEffect } from 'react';   //to call the getPosts function
import { getPosts } from '../api';

function App() {
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log('response', response);
    };

    fetchPosts();  //calling fetchpost func
  }, []);  //so that it won't repeat

  return (
    <div className="App">
      <h1>Hello world</h1>
    </div>
  );
}

export default App;
