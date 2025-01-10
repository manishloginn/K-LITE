import { Link } from 'react-router-dom';
import "./sidenavm.css"

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SettingsIcon from '@mui/icons-material/Settings';


export const Logo = () => {
    return (
        <Link to='/'>
            <div className="flex items-center space-x-2">
                <div className="text-4xl font-extrabold text-blue-600 bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-full shadow-md">
                    K
                </div>
                <span className="text-4xl font-bold text-gray-800">
                    - Lite
                </span>
            </div>
        </Link>
    )
}

const SideNavbar = () => {
    return (
        <div className="w-76 h-full bg-slate-50 text-black p-6 shadow-2xl">
            {/* <h2 className="text-2xl font-bold text-center mb-8">K - Lite</h2> */}
            <Logo />





            <nav className='sidenav '>
                <ul className="space-y-4 ">
                    <li className=' hover:bg-blue-800 hover:text-white px-4 transition duration-300 rounded'  >

                        < DashboardOutlinedIcon style={{ fontSize: "30px" }} />
                        <Link
                            to="/seller/dashboard"
                            className="block py-2 px-4 "
                        >
                            Dashboard
                        </Link>

                    </li>
                    <li className=' hover:bg-blue-800 hover:text-white px-4 transition duration-300 rounded' >
                        < ChatOutlinedIcon style={{ fontSize: "30px" }} />

                        <Link
                            to="/chatbot"
                            className="block py-2 px-4"
                        >
                            Chatbot
                        </Link>
                    </li>
                    <li className=' hover:bg-blue-800 hover:text-white px-4 transition duration-300 rounded' >
                        < Groups2OutlinedIcon style={{ fontSize: "30px" }} />
                        <Link
                            to="/setup/shop-details"
                            className="block py-2 px-4"
                        >
                            Lead Generation
                        </Link>
                    </li>
                    <li className=' hover:bg-blue-800 hover:text-white px-4 transition duration-300 rounded' >
                        < ContactsOutlinedIcon style={{ fontSize: "30px" }} />
                        <Link
                            to="/seller/crm/opportunities"
                            className="block py-2 px-4"
                        >
                            Lead Management
                        </Link>
                    </li>
                    <li className=' hover:bg-blue-800 hover:text-white px-4 transition duration-300 rounded' >
                        < FilterAltOutlinedIcon style={{ fontSize: "30px" }} />
                        <Link
                            to="/seller/setup/my-devices"
                            className="block py-2 px-4"
                        >
                            Lead Automation
                        </Link>
                    </li>
                    <li className=' hover:bg-blue-800 hover:text-white px-4 transition duration-300 rounded' >
                        < AppsOutlinedIcon style={{ fontSize: "30px" }} />
                        <Link
                            to="/seller/integrations-connect"
                            className="block py-2 px-4"
                        >
                            App Store
                        </Link>
                    </li>
                    <li className=' hover:bg-blue-800 hover:text-white px-4 transition duration-300 rounded' >
                        < PermIdentityOutlinedIcon style={{ fontSize: "30px" }} />
                        <Link
                            to="/user/dashboard"
                            className="block py-2 px-4  "
                        >
                            Login As buyers
                        </Link>
                    </li>
                    <li className=' hover:bg-blue-800 hover:text-white px-4 transition duration-300 rounded' >
                        < SettingsIcon style={{ fontSize: "30px" }} />
                        <Link
                            to="/user/logindashboard"
                            className="block py-2 px-4  "
                        >
                            Settings
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SideNavbar;
