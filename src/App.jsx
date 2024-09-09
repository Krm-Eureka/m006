// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import SideBarLayout from "./components/sideBar-component";
import ContentLayout from "./components/content-component";
// import HeaderLayout from "./components/Header-component";

function App() {
  // const [count, setCount] = useState(0);
  const bgr = 1;
  return (
    <>
    <div className="container w-lg h-fit">
    {/* <header className=" flex w-screen h-fit p-2 bg-gray-200 justify-between ">
          <HeaderLayout />
        </header> */}
        
        <main className="items-start w-lg h-fit">
          <div className="body-layout flex flex-row">
          {/* <SideBarLayout/> */}
            {bgr === 1 ? <SideBarLayout /> : <div></div>}
            <ContentLayout />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
