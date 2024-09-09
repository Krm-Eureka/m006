import ValeoLogo from "../assets/Valeo_Logo.png";

import SideNav from "./sideNav";

const SideBarLayout = () => {
  return (
    <>
      <div className="side-nav-container flex flex-col w-60 h-dvh bg-slate-400">
      <div className="logo">
        <img
          className="object-contain justify-center p-0 ml-4 my-2 h-20 w-50"
          src={ValeoLogo} alt="Valeo_Logo_VCDA-M006"
        />
        {/* <span>VCDA-M006</span> */}
        
      </div>

      <SideNav title="Home" i="fa-solid fa-house"/>
      <SideNav title="Tracibility Status" i="fa-solid fa-square-poll-vertical"/>
      <SideNav title="AcousticManualRun" i="fa-solid fa-file-contract"/>
      <SideNav title="AcousticTestReport"i="fa-solid fa-file-audio"/>
      <SideNav title="Tracibility Report" i="fa-solid fa-folder-tree"/>
      <SideNav title="Master Setting" i="fa-solid fa-gears"/>
      </div>
    </>
  );
};
export default SideBarLayout;
