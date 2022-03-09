import { useEffect, useMemo, useState } from "react";
import Story from "../../components/story";

export const BASE_URL = "https://hacker-news.firebaseio.com/v0";
export const SIZE_PER_PAGE = 20;

const HomePage = () => {
  const [storiesIds, setStoriesIds] = useState([]);
  const [stories, setStories] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const getTotalStoriesIds = async () => {
    try {
      const response = await fetch(`${BASE_URL}/topstories.json`);
      const data = await response.json();
      setStoriesIds(data);
      setCurrentPage(1);
    } catch (error) {}
  };

  useEffect(() => {
    getTotalStoriesIds();
  }, []);

  const getStoriesByPage = async () => {
    try {
      const end = currentPage * SIZE_PER_PAGE;
      const start = end - SIZE_PER_PAGE;
      const storiesToGet = storiesIds.slice(start, end);

      const responses = await Promise.all(
        storiesToGet.map((id) => fetch(`${BASE_URL}/item/${id}.json`))
      );
      const stories: any[] = await Promise.all(
        responses.map((response) => response.json())
      );

      setStories(stories);
    } catch (error) {}
  };

  useEffect(() => {
    if (currentPage > 0) getStoriesByPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(storiesIds.length / SIZE_PER_PAGE);
    return Array.from({ length: totalPageCount }, (_, i) => i + 1);
  }, [storiesIds]);

  if (!storiesIds.length) return null;

  return (
    <main>
      {stories.map((story) => (
        <Story key={story.id} {...story} />
      ))}

      <div className="pagination">
        {paginationRange.map((page) => (
          <button
            className="pagination__button"
            key={page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </main>
  );
};

export default HomePage;
