import "./index.scss";

const Story: React.FC<any> = ({ title, d }) => {
  return (
    <article>
      <p className="story__title">{title}</p>
    </article>
  );
};

export default Story;
