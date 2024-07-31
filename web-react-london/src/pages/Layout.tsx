import {useState, useEffect} from 'react';
import Footer from "@/components/Footer/Footer.tsx";
import NavBar from "@/components/NavBar/NavBar.tsx";
import {Outlet, useLocation} from "react-router-dom";
import LoadingIndicator from '@/components/LoadingIndicator';
import {Toaster} from "react-hot-toast";

const Layout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const currentLocation = useLocation().pathname.replace('/', '');

    useEffect(() => {
        // Simulate a fetch or loading process
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        // Show loading indicator while content is loading
        return <LoadingIndicator/>;
    }

    // Render  layout content once loading is complete
    return (
        <div className={`${currentLocation === 'contact' ? 'bg-[#F5EFE6]' : ''}`}>
            <Toaster position="top-right"
                     reverseOrder={false}
                     toastOptions={{
                         style: {
                             paddingInline: 30,
                             paddingBlock: 20,
                             zIndex: 1000000000
                         }

                     }}
            />
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layout;
