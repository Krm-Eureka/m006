const HomePage = ({ isOpen }) => {
  return (
    <>
    
      <div className={`${
          isOpen ? "block lg:relative opacity-100" : "hidden opacity-0"
        }card-content bg-gray-200 m-4 rounded-md w-90% h-fit text-gray-900`}>
        <div className="title bg-green-500 p-2 rounded-t-md font-bold ">
          <p>HOME</p>
        </div>
        <div className="content p-4 items-center">
          <div className=" flex flex-between flex-wrap justify-start">
            <button className="bg-gray-400 hover:bg-gray-500 mr-2 mb-2 px-2 py-2 rounded-md block text-sm font-medium  hover:text-white">
            <div className="items-center px-2">
              <i className="text-xl fa-solid fa-house"></i>
              <span className="ml-2">HOME</span>
              </div>
            </button>
            <button className="bg-gray-400 hover:bg-gray-500 mr-2 mb-2 px-2 py-2 rounded-md block text-sm font-medium  hover:text-white ">
              <div className="items-center px-2">
                <i className="text-xl fa-solid fa-square-poll-vertical"></i>
                <span className="ml-2">Tracibility Status</span>
              </div>
            </button>
            <button className="bg-gray-400 hover:bg-gray-500 mr-2 mb-2 px-2 py-2 rounded-md block text-sm font-medium  hover:text-white ">
              <div className="items-center px-2">
                <i className="text-xl fa-solid fa-circle-play"></i>
                <span className="ml-2">AcousticAutoRun</span>
              </div>
            </button>
            <button className="bg-gray-400 hover:bg-gray-500 mr-2 mb-2 px-2 py-2 rounded-md block text-sm font-medium  hover:text-white ">
              <div className="items-center px-2">
                <i className="text-xl fa-solid fa-file-contract"></i>
                <span className="ml-2">AcousticManualRun</span>
              </div>
            </button>
            <button className="bg-gray-400 hover:bg-gray-500 mr-2 mb-2 px-2 py-2 rounded-md block text-sm font-medium  hover:text-white ">
              <div className="items-center px-2">
                <i className="text-xl fa-solid fa-file-audio"></i>
                <span className="ml-2">AcousticTestReport</span>
              </div>
            </button>
            <button className="bg-gray-400 hover:bg-gray-500 mr-2 mb-2 px-2 py-2 rounded-md block text-sm font-medium  hover:text-white ">
              <div className="items-center px-2">
                <i className="text-xl fa-solid fa-folder-tree"></i>
                <span className="ml-2">Tracibility Report</span>
              </div>
            </button>
            <button className="bg-gray-400 hover:bg-gray-500 mr-2 mb-2 px-2 py-2 rounded-md block text-sm font-medium  hover:text-white ">
              <div className="items-center px-2">
                <i className="text-xl fa-solid fa-gears"></i>
                <span className="ml-2">Setting</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
