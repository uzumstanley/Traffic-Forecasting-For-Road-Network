import React, {useState} from 'react';

const ModalComponent = ({message}: { message: string }) => {
    // State to manage modal visibility
    const [modalOpen, setModalOpen] = useState(false);

    // Function to close the modal on Escape key press
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setModalOpen(false);
        }
    };

    // Register event listener for Escape key press
    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className={`relative w-auto h-auto ${modalOpen ? 'z-40' : ''}`}>
            {/* Button to open the modal */}
            <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors bg-white border rounded-md hover:bg-neutral-100 active:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-200/60 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
            >
                Open
            </button>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed top-0 left-0 z-[99] flex items-center justify-center w-screen h-screen">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 w-full h-full bg-white backdrop-blur-sm bg-opacity-70"
                        onClick={() => setModalOpen(false)}
                    ></div>
                    {/* Modal content */}
                    <div
                        className="relative w-full py-6 bg-white border shadow-lg px-7 border-neutral-200 sm:max-w-lg sm:rounded-lg">
                        <div className="flex items-center justify-between pb-3">
                            <h3 className="text-lg font-semibold">Modal Title</h3>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="absolute top-0 right-0 flex items-center justify-center w-8 h-8 mt-5 mr-5 text-gray-600 rounded-full hover:text-gray-800 hover:bg-gray-50"
                            >
                                <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div className="relative w-auto pb-8">
                            <p>{message}</p>
                        </div>
                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                            <button
                                onClick={() => setModalOpen(false)}
                                type="button"
                                className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-100 focus:ring-offset-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setModalOpen(false)}
                                type="button"
                                className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-white transition-colors border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 bg-neutral-950 hover:bg-neutral-900"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalComponent;
