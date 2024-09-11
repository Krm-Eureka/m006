const MasterSetting = () => {
  return (
    <>
      <div className=" flex flex-wrap bg-gray-300 m-4 p-2 rounded-md w-90% h-fit">
        <div className="card-content bg-gray-200 m-2 rounded-md w-fit h-fit">
          <div className="title bg-green-500 p-2 rounded-t-md font-bold">
            <p>DMC CODE CONTENT</p>
          </div>
          <div className="content p-4 items-center">
            <div className=" flex flex-between flex-wrap justify-start">
              <div className="mr-2 mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  PLM Reference
                </label>
                <input
                  type="text"
                  id="PLM_Reference"
                  // value={}
                  className="w-40 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="PLM Reference"
                  //   disabled={props.disable === true? true: false}
                />
              </div>
              <div className="mr-2 mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  EBOM Reference
                </label>
                <input
                  type="text"
                  id="EBOM_Reference"
                  // value={}
                  className="w-40 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="EBOM Reference"
                  //   disabled={props.disable === true? true: false}
                />
              </div>
              <div className="mr-2 mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Line Machine
                </label>
                <input
                  type="text"
                  id="Line_Machine"
                  // value={}
                  className="w-40 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="LineMachine"
                  //   disabled={props.disable === true? true: false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-between flex-wrap justify-start">
          <div className="card-content bg-gray-200 ml-2 mr-0.5 my-2 rounded-md w-100 h-fit">
            <div className="title bg-green-500 p-2 rounded-t-md font-bold">
              <p>CURRENT SETTING</p>
            </div>
            <div className="content p-4 items-center">
              <div className=" flex flex-between flex-wrap justify-start">
                <div className="mr-2 mb-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Min-Limit
                  </label>
                  <input
                    type="text"
                    id="Min_Limit_crr"
                    // value={}
                    className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Min Limit"
                    //   disabled={props.disable === true? true: false}
                  />
                </div>
                <div className="mr-2 mb-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Max-Limit
                  </label>
                  <input
                    type="text"
                    id="Max_Limit_crr"
                    // value={}
                    className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Max Limit"
                    //   disabled={props.disable === true? true: false}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card-content bg-gray-200 ml-2 mr-0.5 my-2 rounded-md w-100 h-fit">
            <div className="title bg-green-500 p-2 rounded-t-md font-bold">
              <p>SENSITIVITY</p>
            </div>
            <div className="content p-4 items-center">
              <div className=" flex flex-between flex-wrap justify-start">
                <div className="mr-2 mb-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Min-Limit
                  </label>
                  <input
                    type="text"
                    id="Min_Limit_sen"
                    // value={}
                    className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Min Limit"
                    //   disabled={props.disable === true? true: false}
                  />
                </div>
                <div className="mr-2 mb-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Max-Limit
                  </label>
                  <input
                    type="text"
                    id="Max_Limit_sen"
                    // value={}
                    className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Max Limit"
                    //   disabled={props.disable === true? true: false}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card-content bg-gray-200 ml-2 mr-0.5 my-2 rounded-md w-100 h-fit">
            <div className="title bg-green-500 p-2 rounded-t-md font-bold">
              <p>THD</p>
            </div>
            <div className="content p-4 items-center">
              <div className=" flex flex-between flex-wrap justify-start">
                <div className="mr-2 mb-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Min-Limit
                  </label>
                  <input
                    type="text"
                    id="Min_Limit_thd"
                    // value={}
                    className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Min Limit"
                    //   disabled={props.disable === true? true: false}
                  />
                </div>
                <div className="mr-2 mb-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Max-Limit
                  </label>
                  <input
                    type="text"
                    id="Max_Limit_thd"
                    // value={}
                    className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Max Limit"
                    //   disabled={props.disable === true? true: false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="mx-4 bg-green-500 hover:bg-green-700 text-gray-900 hover:text-white font-semibold py-2 px-4 border rounded-lg">
          UpdateData
        </button>
      </div>
    </>
  );
};

export default MasterSetting;
