import HomePage from "./HomePage";
const ContentLayout = () => {
  return (
    <>
      <div className="content-container bg-white w-full">
        <div>
          <h4 className="px-4 text-black-600 my-2 ">
            <p>Stellantis OMNI Microphone Assemblyline</p>
          </h4>
        </div>

        <HomePage />
      </div>
    </>
  );
};

export default ContentLayout;
