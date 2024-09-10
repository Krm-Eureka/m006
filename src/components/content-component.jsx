import AcousticAutoRun from "./pages/AcousticAutoRun-page";
import AcousticManualRun from "./pages/AcousticManualRun-Page";
// import ErrorPage from "./pages/Error-Page";
import HomePage from "./pages/Home-Page";
// import LoginPage from "./pages/Login-Page";
import Setting from "./pages/Setting-Page";
import TracibilityReport from "./pages/TracibilityReport-Page"
import TracibilityStatus from "./pages/TracibilityStatus-Page";
const ContentLayout = () => {
  return (
    <>
      <div className="content-container bg-white w-full">
        <div>
          <h4 className="px-4 text-black-600 my-4 font-medium ">
            <p>Stellantis OMNI Microphone Assemblyline</p>
          </h4>
        </div>
        {/* <ErrorPage/> */}
        {/* <LoginPage /> */}
        <HomePage />
        <Setting/>
        <TracibilityReport/>
        <TracibilityStatus/>
        <AcousticAutoRun />
        <AcousticManualRun />
      </div>
    </>
  );
};

export default ContentLayout;
