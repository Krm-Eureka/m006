import HomePage from "./components-views/Home-Page";
import MasterSetting from "./components-views/MasterSetting";
const ContentLayout = () => {
  return (
    <>
      <div className="content-container bg-white w-full">
        <div>
          <h4 className="px-4 text-black-600 my-4 font-medium ">
            <p>Stellantis OMNI Microphone Assemblyline</p>
          </h4>
        </div>

        <HomePage />
        <MasterSetting/>
      </div>
    </>
  );
};

export default ContentLayout;
