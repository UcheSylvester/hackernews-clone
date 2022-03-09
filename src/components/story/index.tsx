import "./index.scss";

export interface IStory {
  id: string;
  title: string;
  url: string;
}

const Story: React.FC<IStory> = ({ title, url }) => {
  return (
    <article className="story">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={url}
        className="story__title"
      >
        {title}
      </a>
    </article>
  );
};

export default Story;
