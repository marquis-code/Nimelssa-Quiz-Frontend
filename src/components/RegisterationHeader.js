import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterationHeader = () => {
    const [showUnderline, setShowUnderline] = useState(true);

    const toggleShowUnderline = () => {
        setShowUnderline(!showUnderline)
    }

    return (
        <>
        <div className="max-w-7xl mx-auto flex justify-end my-3">
            <div className="flex justify-center items-center space-x-5 rounded-lg shadow-sm border md:w-8/12 w-11/12 mx-auto lg:w-6/12 bg-green-600">
                    <div className="py-2 px-5">
                        <Link to='/signup'>
                            <span className="font-sans font-semibold hover:underline hover:text-white">Signup</span>
                        </Link>
                    </div>
                    <div className="py-2 px-5" onClick={toggleShowUnderline}>
                        <Link to='/signin'>
                            <span className="font-sans font-semibold underline text-white">Login</span>
                        </Link>
                    </div>
            </div>
       </div>
        </>
    )
}

export default RegisterationHeader;