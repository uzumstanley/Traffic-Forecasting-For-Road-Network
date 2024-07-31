// import {FaRoute} from "react-icons/fa6";
import {useLocation, Link} from "react-router-dom";

const Footer = () => {
    const currentLocation = useLocation().pathname.replace('/', '');
    const currentYear = new Date().getFullYear();
    return (
        <>
            <div className={`${currentLocation === 'map' ? 'hidden' : ''} bg-[#F5EFE6]`}>
                <div className="max-w-2xl mx-auto text-white py-2">
                    <div
                        className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
                        <p className="order-2 md:order-1 mt-8 md:mt-0"> &copy; The lazy Module, {currentYear} </p>
                        <div className="order-1 md:order-2">
                            <Link to='/about'>
                                <span className="px-2">About us</span>
                            </Link>
                            <Link to='/contact'>
                                <span className="px-2 border-l">Contact us</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;