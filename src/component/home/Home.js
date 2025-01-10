import React from 'react'
import './home.css'




import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Logo } from '../sidenavbar/SideNavbar';
import { Link } from 'react-router-dom';
import { Button } from 'antd';


export const Header = () => {
    return (
        <div className='containerr'>
            <div className='navlogin'>
                <div className='logo'>
                    <Logo />
                </div>
                <div className='auth'>
                    <div className='buttons'>
                        <div>
                            <PersonRemoveOutlinedIcon style={{ color: "#2C77B3", fontSize: "33px" }} />
                        </div>
                        <div className='buttoncontent'>
                            <Link to='/login' >Sign up</Link>
                            <button></button>
                        </div>
                    </div>
                    |
                    <div className='buttons'>
                        <div>
                            <LoginOutlinedIcon style={{ color: "#2C77B3", fontSize: "33px" }} />
                        </div>
                        <div>
                            <Link to='/login' >Log in</Link>
                            {/* <button to="/login"></button> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='linklogin'>
                <div className='links'>
                    <Link className='linkstag hover:bg-[#075A88] ' to='/'>Home</Link>
                    <Link className='linkstag hover:bg-[#075A88] ' to='/sellers'> Sellers</Link>
                    <Link className='linkstag hover:bg-[#075A88]' to='/products'> Find Product/Services</Link>
                </div>

                <div >
                    <Button >POST BUY REQUIRMENTS</Button>
                </div>
            </div>

        </div>
    )
}

const Home = () => {
    return (
        <>
            <Header />
        </>

    )
}

export default Home
