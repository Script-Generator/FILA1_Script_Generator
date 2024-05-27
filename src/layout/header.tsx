const Header = () => {

    const handleResetClick = () => {
        console.log("Button Reset clicked");
    };

    const handleModeClick = () => {
        console.log("Button Mode clicked");
    };

    return (
        <header className="fixed top-0 left-0 right-0 p-4 bg-white shadow-sm z-50">
            <div className="mx-auto flex justify-between">
                <div className="flex items-center gap-6">
                    <a href="/">
                        <h1 className="text-2xl font-bold text-start">Script Generator</h1>
                    </a>
                    <a href="https://github.com/Script-Generator/FILA1_Script_Generator">
                        <p>Documentation</p>
                    </a>
                </div>
                <div className="flex items-center gap-6">
                        <button onClick={handleResetClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"
                                 color="#000000" fill="none">
                                <path d="M16.3884 3L17.3913 3.97574C17.8393 4.41165 18.0633 4.62961 17.9844 4.81481C17.9056 5 17.5888 5 16.9552 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7.61156 21L6.60875 20.0243C6.16074 19.5883 5.93673 19.3704 6.01557 19.1852C6.09441 19 6.4112 19 7.04478 19H14.8058C18.779 19 22 15.866 22 12C22 10.5128 21.5233 9.13383 20.7105 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <button onClick={handleModeClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#000000" fill="none">
                                <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M11.9955 3H12.0045M11.9961 21H12.0051M18.3588 5.63599H18.3678M5.63409 18.364H5.64307M5.63409 5.63647H5.64307M18.3582 18.3645H18.3672M20.991 12.0006H21M3 12.0006H3.00898" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
