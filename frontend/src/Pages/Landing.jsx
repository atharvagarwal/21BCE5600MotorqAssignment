import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Landing = () => {
  return (
    <>
      <Navbar></Navbar>
      <div
        className="flex justify-center p-6 lg:px-24 lg:py-12 flex-wrap lg:flex-nowrap"
        id="home"
      >
        <div className="flex flex-col justify-center">
          <h1 className="font-medium leading-tight text-xl p-2 text-center md:text-6xl lg:text-left mt-0 mb-2 text-black">
            Request Manager
          </h1>

          <p className="font-small leading-tight text-center text-24 mt-0 mb-2 text-black p-2 md:text-left md:text-3xl">
            This web app helps to<br></br>
            manage and approve all the requests made by several people in an
            organization.
          </p>
        </div>
        <img
          src="Home.png"
          className="lg:w-1/2 mb-10 md:w-1/3 mt-20 w-1/2"
        ></img>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Landing;
