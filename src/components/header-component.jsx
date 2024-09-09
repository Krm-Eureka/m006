import ValeoLogo from "../assets/Valeo_Logo.png";

const HeaderLayout = () => {
  return (
    <div className=" header-container  flex flex-row justify-between items-center space-x-3 w-screen">
      <div className="logo flex flex-row flex-none w-fit h-fit">
        <img
          className="object-contain justify-center p-0 ml-4 h-20 w-30"
          src={ValeoLogo}
          alt="Valeo_Logo"
        />
        {/* <div className="bgr_botton items-center p-2">
          <button className="group h-6 w-6  p-0 m-0 bg-transparent">
            <div className="grid justify-items-center gap-1.5 ">
              <span className="h-1 w-6 rounded-fit bg-black transition group-hover:rotate-45 group-hover:translate-y-2.5"></span>
              <span className="h-1 w-6 rounded-fit bg-black group-hover:scale-x-0 transition"></span>
              <span className="h-1 w-6 rounded-fit bg-black group-hover:-rotate-45 group-hover:-translate-y-2.5"></span>
            </div>
          </button>
        </div> */}
      </div>
      {/* <div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, qui.
        </p>
      </div> */}
      <div className="w-fit h-fit">
        <p>{}</p>
      </div>
      <div className="about">
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
  );
};

export default HeaderLayout;
