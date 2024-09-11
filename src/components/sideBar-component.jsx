// import { useState } from "react";
import PropTypes from "prop-types";
import ValeoLogo from "../assets/Valeo_Logo.png";
import SideNav from "./sideNav";

const SideBarLayout = ({ isOpen }) => {
  return (
    <>
      <div
        className={`${
          isOpen ? "block lg:relative opacity-100" : "hidden opacity-0"
        } flex-col w-60 h-dvh bg-slate-300 fixed  transition-all duration-1000 ease-in-out`}
        aria-hidden={!isOpen}
      >
        <div className="logo">
          <img
            className="object-contain justify-center p-0 my-2 h-20 w-50"
            src={ValeoLogo}
            alt="Valeo_Logo_VCDA-M006"
          />
        </div>
        <SideNav title="Home" i="fa-solid fa-house" />
        <SideNav
          title="Traceability Status"
          i="fa-solid fa-square-poll-vertical"
        />
        <SideNav title="Acoustic AutoRun" i="fa-solid fa-circle-play" />
        <SideNav title="Acoustic ManualRun" i="fa-solid fa-file-contract" />
        <SideNav title="AcousticTest Report" i="fa-solid fa-file-audio" />
        <SideNav title="Traceability Report" i="fa-solid fa-folder-tree" />
        <SideNav title="Setting" i="fa-solid fa-gears" />
        <SideNav title="Logout" i="fa-solid fa-right-from-bracket" />
      </div>
    </>
  );
};
SideBarLayout.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
export default SideBarLayout;
