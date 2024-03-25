import Header from "./Header";
import Filters from "./Filters";
import NewsFeed from "./NewsFeed";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="news-feed_container">
          <Filters />
          <NewsFeed />
        </div>
      </main>
    </>
  );
}

export default App;
