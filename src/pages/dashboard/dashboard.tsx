import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <section className="flex overflow-x-hidden overflow-y-auto">
      <div id="overlay-menu" className="flex-0">
        <Button
          type="button"
          id="burger-menu"
          onClick={toggleMenu}
          variant={"secondary"}
          className="text-black focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </Button>
        <div>
          <div className={isMenuOpen ? "active" : "w-0"}>
            <div className="relative">
              <div className="flex justify-between items-end"></div>
            </div>
            <div id="sidebar" className="h-screen bg-gray-200">
              {/* <!-- Sidebar --> */}
              <div className="md:flex md:flex-shrink-0">
                <div className="flex flex-col w-full">
                  <div className="flex-1 flex flex-col overflow-y-auto">
                    <Button className="m-2">
                      <Link to={"/paiements"}>Tableau</Link>
                    </Button>
                    <Button className="m-2">
                      <Link to={"/profil"}>Profil</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="content" className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-4">
          <p>Hello</p>
          <p>Jello</p>
          <p>World</p>
          <p>Nono</p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
