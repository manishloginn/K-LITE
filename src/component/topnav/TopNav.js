import React from 'react'
import "./top-nav.css"


import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const TopNav = () => {
    return (
        <div className='shadow-xl top-nav'>

            <div>
                <MenuOutlinedIcon style={{color:"blue", fontSize:"29px"}} />
            </div>
            <div className='tagsss'>
                <div>
                    <button>Email credit</button>
                </div>
                <div>
                    <NotificationsIcon />
                </div>
                <div>
                    <button>Request Form</button>
                </div>
                <div>
                    <button>Quick Action</button>
                </div>
                <div>
                    <spam> <PersonRoundedIcon /> </spam>
                    <button>Manish</button>
                </div>
            </div>

        </div>
    )
}

export default TopNav
