import ValeoLogo from "../assets/Valeo_Logo.png";

import SideNav from "./sideNav";

const SideBarLayout = () => {
  return (
    <>
      <div className="sticky side-nav-container flex flex-col w-60 h-dvh bg-slate-300">
        <div className="logo">
          <img
            className="object-contain justify-center p-0  my-2 h-20 w-50"
            src={ValeoLogo}
            alt="Valeo_Logo_VCDA-M006"
          />
          {/* <span>VCDA-M006</span> */}
        </div>

        <SideNav title="Home" i="fa-solid fa-house" />
        <SideNav
          title="Tracibility Status"
          i="fa-solid fa-square-poll-vertical"
        />
        <SideNav title="Acoustic AutoRun" i="fa-solid fa-circle-play" />
        <SideNav title="Acoustic ManualRun" i="fa-solid fa-file-contract" />
        <SideNav title="AcousticTest Report" i="fa-solid fa-file-audio" />
        <SideNav title="Tracibility Report" i="fa-solid fa-folder-tree" />
        <SideNav title="Setting" i="fa-solid fa-gears" />
        <SideNav title="Logout" i="fa-solid fa-right-from-bracket" />
      </div>
    </>
  );
};
export default SideBarLayout;
