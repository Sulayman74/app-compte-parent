import Login from "../login/login";

const Home = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-evenly w-full h-screen sm:h-full bg-blue-500">
          <Login />
        </div>
        <div
          id="right-side"
          className=" hidden sm:flex flex-col items-center justify-evenly w-full h-screen">
          <div className="sidebar-right">
            <p className="h1 text-center uppercase">Compte Bilan app</p>
            <p>Ne perdez plus le compte de vos dons</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
