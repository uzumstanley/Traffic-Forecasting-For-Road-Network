import { useState } from "react";

const Alert = () => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div role="alert" className="relative rounded border-s-4 border-red-500 bg-red-50 p-4">
            <div className="flex items-start justify-between text-red-800">
                <div className="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clipRule="evenodd"
                        />
                    </svg>

                    <strong className="block font-medium"> Something went wrong </strong>
                </div>

                <button
                    onClick={() => setVisible(false)}
                    className="text-gray-500 transition hover:text-gray-600"
                >
                    <span className="sr-only">Dismiss popup</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <p className="mt-2 text-sm text-red-700">
                We suspect it might be a connection issue. Double check and try again.
            </p>
        </div>
    );
};

export default Alert;
