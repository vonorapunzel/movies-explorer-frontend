import "./Title.css";

const Title = ({ title }) => {
  return(
    <div className="title">
      <h2 className="title__head">{title}</h2>
    </div>
  )
};

export default Title;
