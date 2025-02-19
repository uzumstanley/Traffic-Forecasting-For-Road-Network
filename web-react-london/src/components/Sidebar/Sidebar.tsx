import {useState} from 'react';
import './Sidebar.css';
import Form from '../Form/Form';
import { FaRoute } from 'react-icons/fa6';

const Sidebar = ({position = 'left', theme = 'light'}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle the state of the sidebar
    const toggleSidebar = () => setIsOpen(!isOpen);

    // Construct class names based on state and props
    const sidebarClasses = `sidepanel z-[100000000000] sidepanel-${position} ${isOpen ? 'opened' : 'closed'} ${theme === 'dark' ? 'sidepanel-dark' : ''}`;

    return (
        <div className={sidebarClasses}>
            <div className="sidepanel-inner-wrapper">
                <div className="sidepanel-content-wrapper">
                    <div className="sidepanel-content sm:mt-2 mt-24 ">
                        {/* Your sidebar content here */}

                        <div className='flex flex-col items-center sm:my-0'>
                            <FaRoute size={100} color='#4F6F52'
                                     className="my-6 hover:opacity-50 hover:scale-110 transition duration-300 ease-in-out"/>

                        </div>
                        <Form/>

                    </div>
                </div>
            </div>
            <div className="sidepanel-toggle-container">
                <button onClick={toggleSidebar} className="sidepanel-toggle-button">
                </button>
            </div>
        </div>
    );
};

export default Sidebar;