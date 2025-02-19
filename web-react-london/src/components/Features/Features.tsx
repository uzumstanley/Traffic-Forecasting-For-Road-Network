import {FaRoute} from "react-icons/fa6";
import {BsBuilding} from "react-icons/bs";
import {motion} from "framer-motion";

const Features = () => {
    return (

        <section className=''>
            <div className='flex justify-center'>
                <h1 className='text-5xl md:text-7xl font-bold  mt-6 text-[#12372A]'>Features</h1>
            </div>
            <motion.div
                initial={{opacity: 0.3, y: 130}}
                whileInView={{opacity: 1, y: 0}}
                transition={{
                    delay: 0.3,
                    duration: 1.0,
                    ease: "circInOut",
                }}
                className=""
            >
                <div className='flex flex-col justify-between sm:flex-row items-center px-80 py-20'>

                    {/*<motion.div className='flex flex-col items-center my-10 sm:my-0'>*/}
                    {/*    <h3 className='text-[#1A4D2E] text-2xl'>Find Classroom</h3>*/}
                    {/*    <SiGoogleclassroom size={120} color='#4F6F52'*/}
                    {/*                       className="my-6 hover:opacity-50 hover:scale-110 transition duration-300 ease-in-out"/>*/}
                    {/*</motion.div>*/}

                    <motion.div className='flex flex-col items-center'>
                        <h3 className='text-[#1A4D2E] text-2xl'>Find Place</h3>
                        <FaRoute size={120} color='#4F6F52'
                                 className="my-6 hover:opacity-50 hover:scale-110 transition duration-300 ease-in-out"/>
                    </motion.div>

                    <motion.div className='flex flex-col items-center'>

                        <h3 className='text-[#1A4D2E] text-2xl'>Find Buildings</h3>
                        <BsBuilding size={120} color='#4F6F52'
                                    className="my-6 hover:opacity-50 hover:scale-110 transition duration-300 ease-in-out"/>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
        ;
};

export default Features;