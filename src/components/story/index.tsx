import "./index.scss";

const Story: React.FC<any> = ({ title }) => {
  return (
    <div>
      <p className="story__title">{title}</p>

      <div className="story__details"></div>
    </div>
  );
};

export default Story;
