const AcousticManualRun = () => {
  return (
    <>
      <div className="content">
        <div className="card-content bg-gray-200 ml-4 my-4 rounded-md w-full h-fit">
          <div className="title bg-green-500 p-2 rounded-t-md font-bold">
            <p>Show Process Current of Manual EOLTStation {">>>"}</p>
          </div>
          <div className="p-4">
            <form action="">
              <label htmlFor="Serial_Code" className="font-bold">
                Serial Code :{" "}
              </label>
              <input
                id="Serial_Code"
                type="text"
                className="rounded-md w-80 h-8 mx-2"
              />
              <button className="mx-2 mt-4 py-2 px-4 font-semibold bg-blue-500 hover:bg-blue-700 text-gray-900 hover:text-white h-fit w-fit border border-blue-500 rounded-btn">
                RUN
              </button>
            </form>
            <div className="content flex flex-between p-4 items-center">
              <div className=" flex flex-between flex-wrap justify-start">
                <div className="box bg-slate-300 p-4 mr-2 rounded-lg w-40">
                  <i className="fa-solid fa-microphone mr-4 "></i>
                  <span>AcousticTest</span>
                </div>
              </div>
              {/* <div className=" justify-start">
                <div className="box bg-slate-300 p-4 mr-2 rounded-lg w-40">
                <i className="fa-solid fa-bolt mr-4"></i>
                  <span>Current</span>
                </div>
              </div> */}
              <div className=" justify-start">
                <div className="box bg-slate-300 p-4 mr-2 rounded-lg w-40">
                  <i className="fa-solid fa-map-pin mr-4 "></i>
                  <span>LaserMark</span>
                </div>
              </div>
              <div className="  justify-start">
                <div className="box bg-slate-300 p-4 mr-2 rounded-lg w-40">
                  <i className="fa-solid fa-qrcode mr-4 "></i>
                  <span>QRCode</span>
                </div>
              </div>
              <div className="  justify-start">
                <div className="box bg-slate-300 p-4 mr-2 rounded-lg w-40">
                  <i className="fa-solid fa-border-all mr-4 "></i>
                  <span>Total</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="card-content bg-gray-200 ml-4 my-2 rounded-md w-fit h-fit">
            <div className="title bg-green-500 p-2 rounded-t-md font-bold">
              <p>Show Data Run Sumary</p>
            </div>
            <div className="content flex flex-between p-4 items-center">
              <div className=" flex flex-between flex-wrap justify-start">
                {/* <div className="box bg-slate-300 p-4 mr-2 rounded-lg w-40">
                  <i className="fa-solid fa-microphone mr-4 "></i>
                  <span>AcousticTest</span>
                </div> */}
              </div>
            </div>
          </div>
          <div className="card-content bg-gray-200 ml-4 my-2 rounded-md w-fit h-fit">
            <div className="title bg-green-500 p-2 rounded-t-md font-bold">
              <p>Last Data Status</p>
            </div>
            <div className="content flex flex-between p-4 items-center">
              <div className=" flex flex-between flex-wrap justify-start">
                {/* <div className="box bg-slate-300 p-4 mr-2 rounded-lg w-40">
                  <i className="fa-solid fa-microphone mr-4 "></i>
                  <span>AcousticTest</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcousticManualRun;
