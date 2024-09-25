import PropTypes from "prop-types";

const CardSetting = ({
  title,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
  disable,
}) => {
  return (
    <>
      <div className="card-content bg-gray-200 ml-2 mr-0.5 my-2 rounded-md w-72 h-fit">
        <div className="title bg-green-500 p-2 rounded-t-md font-bold text-gray-700">
          <p>{title.toUpperCase()}</p>
        </div>
        <div className="content p-2 items-center">
          <div className=" flex flex-between flex-wrap justify-start">
            <div className="mr-2 mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Min-Limit
              </label>
              <input
                disabled={disable}
                type="text"
                id="Min_Limit_crr"
                value={minValue}
                className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Min Limit"
                onChange={(e) => setMinValue(e.target.value)}
                //   disabled={props.disable === true? true: false}
              />
            </div>
            <div className="mr-2 mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Max-Limit
              </label>
              <input
              disabled={disable}
                type="text"
                id="Max_Limit_crr"
                value={maxValue}
                className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Max Limit"
                onChange={(e) => setMaxValue(e.target.value)}
                //   disabled={props.disable === true? true: false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CardSetting.propTypes = {
  title: PropTypes.string.isRequired,
  disable: PropTypes.bool.isRequired,
  minValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  maxValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  setMinValue: PropTypes.func.isRequired,
  setMaxValue: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default CardSetting;
