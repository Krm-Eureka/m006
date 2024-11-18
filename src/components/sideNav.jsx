import PropTypes from "prop-types";
const SideNav = (props) => {

  return (
    <>
      <div className=" nav flex items-center py-2 px-4 w-60 cursor-pointer text-gray-800 hover:bg-slate-700 hover:text-white">
        <i className={props.i}></i>
        <p className="px-2">{props.title}</p>
      </div>
    </>
  );
};
SideNav.propTypes = {
  title: PropTypes.string.isRequired,
  i: PropTypes.string,
};
export default SideNav;
