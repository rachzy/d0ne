import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div style={{alignSelf: "center"}}>
    <div className={classes.loader}></div>
  </div>
  );
};

export default Loader;
