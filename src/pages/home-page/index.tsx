import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Story from "../../components/story";

export const BASE_URL = "https://hacker-news.firebaseio.com/v0";
export const SIZE_PER_PAGE = 20;

const HomePage = () => {
  const [storiesIds, setStoriesIds] = useState([]);
  const [stories, setStories] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getTotalStoriesIds = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/topstories.json`);
      setStoriesIds(response.data);
      setCurrentPage(1);

      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTotalStoriesIds();
  }, []);

  const getStoriesByPage = async () => {
    setIsLoading(true);
    try {
      const end = currentPage * SIZE_PER_PAGE;
      const start = end - SIZE_PER_PAGE;
      const storiesToGet = storiesIds.slice(start, end);

      const responses = await Promise.all(
        storiesToGet.map((id) => axios.get(`${BASE_URL}/item/${id}.json`))
      );
      const stories: any[] = responses.map((response) => response.data);
      setStories(stories);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage > 0) getStoriesByPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(storiesIds.length / SIZE_PER_PAGE);
    return Array.from({ length: totalPageCount }, (_, i) => i + 1);
  }, [storiesIds]);

  return (
    <main>
      <h1>HACKER NEWS</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        stories.map((story) => <Story key={story.title} {...story} />)
      )}

      <nav className="pagination">
        {paginationRange.map((page) => (
          <button
            className="pagination__button"
            key={page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </nav>
    </main>
  );
};

export default HomePage;
