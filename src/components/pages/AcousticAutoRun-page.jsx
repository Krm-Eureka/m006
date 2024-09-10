const AcousticAutoRun = () => {
  return (
    <>
      <div className="content">
      <div className=" text-gray-700 bg-gray-300 m-4 rounded-md w-90% h-fit">
          <div className="title bg-green-500 p-2 rounded-t-md font-bold">
            <p>
              Show Process Current of Auto EOLTStation {">>>"} SerialNumber?!!!!!!!!!
            </p>
          </div>
          <div className="content flex flex-between p-4 items-center">
            <div className=" flex flex-between flex-wrap justify-start">
              <div className="box flex bg-slate-300 p-4 mr-2 rounded-lg w-40">
                <i className="fa-solid fa-microphone mr-4 text-3xl justify-center mt-2"></i>
                <div className="flex flex-col text-center align-middle">
                  <p>AcousticTest</p>
                  <p>PASS</p>
                </div>
              </div>
            </div>
            <div className=" justify-start">
              <div className="box flex bg-slate-300 p-4 mr-2 rounded-lg w-40">
                <i className="fa-solid fa-bolt mr-4 text-3xl justify-center mt-2"></i>
                <div className="flex flex-col text-center align-middle">
                  <p>Current</p>
                  <p>PASS</p>
                </div>
              </div>
            </div>
            <div className=" justify-start">
              <div className="box flex bg-slate-300 p-4 mr-2 rounded-lg w-40">
                <i className="fa-solid fa-map-pin mr-4 text-3xl justify-center mt-2"></i>
                <div className="flex flex-col text-center align-middle">
                  <p>LaserMark</p>
                  <p>PASS</p>
                </div>
              </div>
            </div>
            <div className="  justify-start">
              <div className="box flex bg-slate-300 p-4 mr-2 rounded-lg w-40">
                <i className="fa-solid fa-qrcode mr-4 text-3xl justify-center mt-2"></i>
                <div className="flex flex-col text-center align-middle">
                  <p>QRCode</p>
                  <p>PASS</p>
                </div>
              </div>
            </div>
            <div className="  justify-start">
              <div className="box flex bg-slate-300 p-4 mr-2 rounded-lg w-40">
                <i className="fa-solid fa-border-all mr-4 text-3xl justify-center mt-2"></i>
                <div className="flex flex-col text-center align-middle">
                  <p>Total Status</p>
                  <p>PASS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
        <div className=" text-gray-700 bg-gray-300 m-4 rounded-md  h-fit">
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
          <div className=" text-gray-700 bg-gray-300 m-4 rounded-md h-fit">
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
