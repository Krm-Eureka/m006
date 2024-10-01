import PropTypes from "prop-types";

const StatusBox = ({ name, status }) => {
  return (
    <div className={`status-box ${status.className}`}>
      <p>{name}</p>
      <p>{status.text}</p>
    </div>
  );
};

StatusBox.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.shape({
    text: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
  }).isRequired,
};

export default StatusBox;
