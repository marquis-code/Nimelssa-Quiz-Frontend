import { Link } from "react-router-dom";

const QuestionTypeHeader = () => {
    return (
        <>
        <div className="max-w-7xl mx-auto flex justify-end my-3">
            <div className="flex justify-center items-center space-x-5 rounded-lg shadow-sm border w-11/12 mx-auto md:w-8/12 lg:w-3/12 bg-green-600">
                    <div className="py-2 px-5">
                        <Link to='/create-mcq'>
                            <span className="font-sans font-semibold hover:underline hover:text-white">MCQ</span>
                        </Link>
                    </div>
                    <div className="py-2 px-5 ">
                        <Link to='/create-trueOrFalse'>
                            <span className="font-sans font-semibold hover:underline hover:text-white">True / False</span>
                        </Link>
                    </div>
            </div>
       </div>
        </>
    )
}

export default QuestionTypeHeader;