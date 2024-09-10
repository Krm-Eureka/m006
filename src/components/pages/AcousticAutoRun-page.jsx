const AcousticAutoRun = () => {
  return (
    <>
      <div className="content">
        <div className="card-content bg-gray-200 ml-4 my-4 rounded-md w-full h-fit">
          <div className="title bg-green-500 p-2 rounded-t-md font-bold">
            <p>
              Show Process Current of Auto EOLTStation {">>>"} SerialNumber?!!!!!!!!!
            </p>
          </div>
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
                <span>Total Status</span>
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

export default AcousticAutoRun;
