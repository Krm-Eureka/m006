const HomePage = () => {
  return (
    <>
      <div className="card-content bg-slate-500 m-4 rounded-md w-full h-fit">
        <div className="title bg-green-500 p-2 rounded-t-md font-bold">
          <p>HOME</p>
        </div>
        <div className="content p-4 items-center">
          <div
            className="search-card flex flex-between flex-wrap"
            action=""
          >
            <button className="bg-red-500 mr-2 mb-2 px-2 py-2 rounded-md block text-sm font-medium text-gray-900 dark:text-white">
               <i className="fa-solid fa-house"></i> <span>HOME</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
