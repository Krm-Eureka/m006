import PropTypes from "prop-types";
const SideNav = (props) => {
  console.log(props);

  return (
    <>
      <div className=" nav flex items-center  py-2 px-8 w-full cursor-pointer hover:bg-slate-700 hover:text-white">
        <i className={props.i}></i>
        <p className="px-2">{props.title}</p>
      </div>
    </>
  );
};
SideNav.propTypes = {
  title: PropTypes.string.isRequired,
  i: PropTypes.string,
  // type: PropTypes.string.isRequired,
};
export default SideNav;
