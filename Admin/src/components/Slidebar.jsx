import { useState } from "react";
import { Link } from 'react-router-dom';
import image from '../assets/admin.png'
// Icons
import {
  RiHome3Line,
  // RiPieChartLine,
  RiMore2Fill,
  RiCloseFill,
} from "react-icons/ri";

function Sidebar() { 
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div
        className={`bg-gray-900 h-full fixed lg:static w-[40%] md:w-[40%] lg:w-full transition-all z-50 duration-300 ${
          showMenu ? "left-0" : "-left-full"
        }`}
      >
        {/* Profile */}
        <div className="flex flex-col items-center justify-center p-8 gap-2 h-[30vh]">
          <img
            src={image}
            className="w-20 h-20 object-cover rounded-full ring-2 ring-gray-300"
          />
          <h1 className="text-xl text-white font-bold">ADMINISTRADOR</h1>
          <h1 className="text-xs text-white font-bold">Eduardo Cajas</h1>
        </div>
        {/* Nav */}
        <div className="bg-blue-500 p-8 rounded-tr-[100px] h-[70vh]  flex flex-col justify-between gap-8">
          <nav className="flex flex-col gap-8">
            <Link to={'/equipos'}>
              <h1
                className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-gray-900/50 transition-colors"
              >
                <RiHome3Line /> Equipos
              </h1>
            </Link>
            <Link to={'/horarios'}>
              <h1
                className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-gray-900/50 transition-colors"
              >
                <RiHome3Line /> Horarios
              </h1>
            </Link>

            {/* <Link to={'/reportes'}>
              <h1
                className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-gray-900/50 transition-colors"
              >
                <RiPieChartLine /> Reportes
              </h1>
            </Link> */}
          </nav>
        </div>
      </div>
      {/* Button mobile */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="lg:hidden fixed right-4 bottom-4 text-2xl bg-gray-900 p-2 rounded-full text-white z-50"
      >
        {showMenu ? <RiCloseFill /> : <RiMore2Fill />}
      </button>
    </>
  ); 
}

export default Sidebar;