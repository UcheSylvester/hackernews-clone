import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Story, { IStory } from "../../components/story";

export const BASE_URL = "https://hacker-news.firebaseio.com/v0";
export const SIZE_PER_PAGE = 20;

const HomePage = () => {
  const [storiesIds, setStoriesIds] = useState([]);
  const [stories, setStories] = useState<IStory[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getTotalStoriesIds = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/topstories.json`);
      setStoriesIds(response.data);
      setCurrentPage(1);
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
      setIsError(true);
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
      const stories: IStory[] = responses.map((response) => response.data);
      setStories(stories);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
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

  const renderContent = () => {
    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Something went wrong</div>;

    return stories?.map((story) => <Story key={story.title} {...story} />);
  };

  return (
    <main>
      <h1>HACKER NEWS</h1>

      {renderContent()}

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
