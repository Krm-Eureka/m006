
// import SideBarLayout from "./sideBar-component"; // import the sidebar layout

import HeaderLayout from "./Header-component.jsx";


const ContentLayout = () => {
 
  return (
    <>
      <div className="flex flex-col ">
      
        <HeaderLayout/>
        <div
          className={`bg-white flex-1 px-4 py-4 md:px-2 md:py-2 md:w-1000px transition-all duration-300 w-screen h-screen overflow-x-auto `}
        >
          
          {/* Render your content here */}
          {/* <ErrorPage/> */}
          {/* <LoginPage /> */}
          {/* <Setting /> */}
          {/* <TracibilityReport /> */}
          {/* <TracibilityStatus /> */}
          {/* <AcousticAutoRun /> */}
          {/* <AcousticManualRun /> */}
        </div>
      </div>
    </>
  );
};

export default ContentLayout;
