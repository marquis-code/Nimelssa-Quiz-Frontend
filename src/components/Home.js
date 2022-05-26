import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTestimonies } from '../apis/auth';
import { toast } from 'react-toastify';
import { ImQuotesLeft } from "react-icons/im";
import { FaTwitterSquare, FaLinkedinIn, FaInstagramSquare } from "react-icons/fa";
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { Helmet } from 'react-helmet';
import { FaBars } from "react-icons/fa";
import { FaHome, FaUserCircle, FaBoxOpen, FaShoppingCart } from "react-icons/fa";

const Home = () => {
    const navigate = useNavigate();
    const [allTestimonies, setAllTestimonies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllTestimonies().then((response) => {
            setAllTestimonies(response.data)
        }).catch((error) => {
            toast.error(error.response.data.errorMessage, { theme: 'colored' });
        })
    }, []);

    const HomePage = () => {
        const [showSidebar, setShowSidebar] = useState(true);

        const toggleSidebar = () => {
            setShowSidebar(!showSidebar);
        }
        return (
            <>
                <Helmet><title>Nimelssa Quiz | Home page</title> </Helmet>
                {/* <div className='flex justify-between items-center py-3 bg-green-600 px-2'>
                    <div className='flex items-center'>
                        <div className='mr-1'><img alt='nimelssaLogo' src='/favicon.ico' className='rounded-full shadow-sm w-6 h-6' /></div>
                        <div className='font-sans font-semibold text-white'>NIMELSSA</div>
                    </div>
                    {!showSidebar ? 
                    <div  className='font-sans font-semibold cursor-pointer' onClick={toggleSidebar}><FaBars /></div>
                    :
                    <div  className='font-sans font-semibold cursor-pointer' onClick={toggleSidebar}>x</div>
                    }
                </div>
                {showSidebar && (
                    <>
                        <div className='w-80 z-25 h-full bg-green-500 shadow-md bg-white px-1 fixed border-2 border-red-500'>
                            <ul className='relative'>
                                <li className='relative mt-3 flex justify-start items-center pl-6 rounded-lg hover:bg-gray-300 shadow-sm bg-gray-300 cursor-pointer'>
                                    <div><FaHome /></div>
                                    <div className='select-none flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-mono rounded  font-semibold text-gray-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>Dashboard</div>
                                </li>

                                <li className='relative my-3 flex justify-start items-center pl-6 rounded-lg hover:bg-gray-300 cursor-pointer'>
                                    <div><FaUserCircle /></div>
                                    <div className='select-none flex items-center py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-mono rounded  font-semibold text-gray-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>Your Profile </div>
                                </li>

                                <div className='flex justify-between items-center rounded-lg hover:bg-gray-300 cursor-pointer'>
                                    <div>
                                        <li className='relative flex justify-start items-center pl-6'>
                                            <div><FaBoxOpen /></div>
                                            <div className='select-none flex items-center py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-mono rounded  font-semibold text-gray-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>Orders</div>
                                        </li>
                                    </div>
                                    <div className='pr-6'>
                                        <div className='font-semibold bg-green-500 px-2 rounded-sm shadow-sm'>6</div>
                                    </div>
                                </div>

                                <div className='flex justify-between items-center rounded-lg hover:bg-gray-300 cursor-pointer'>
                                    <div>
                                        <li className='relative flex justify-start items-center pl-6'>
                                            <div><FaShoppingCart /></div>
                                            <div className='flex select-none items-center py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-mono rounded  font-semibold text-gray-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>Your Cart</div>
                                        </li>
                                    </div>
                                    <div className='pr-6'>
                                        <div className='font-semibold bg-orange-500 px-2 rounded-sm shadow-sm'>6</div>
                                    </div>
                                </div>

                            </ul>
                        </div>
                    </>
                )} */}
                {/*  */}
                <div className='lg:flex items-center'>   
                    <div className='w-6/12'>
                        <div className='w-screen h-screen lg:hidden'><img src='./background.jpg' className='object-cover w-screen h-screen opacity-25' alt='home' /></div>
                        <div className='z-20 absolute bottom-5 px-3 pb-16 lg:pb-0 md:pb-0 lg:mb-24'>
                            <h1 className='lg:text-6xl md:text-6xl text-5xl text-green-700 font-bold font-sans tracking-wide select-none'>NIMELSSA Virtual Quiz</h1>
                            <p className='font-semibold font-sans text-xl text-green-900 select-none pt-3'>Studying Medical Laboratory Science from a new angle.</p>
                            <div className='flex pt-10'>
                                <div className='text-white select-none bg-gradient-to-l from-yellow-500 to-yellow-300 hover:bg-gradient-to-r font-semibold mr-2 w-full md:w-9/12 flex justify-center items-center py-3 px-10 rounded-lg shadow-sm select-none cursor-pointer' onClick={() => { navigate('/signin') }}>Get Started</div>
                            </div>
                        </div>
                    </div>
                    <div className='w-6/12 hidden lg:flex'><img src='./bg5.jpg' className='' alt='home' /></div>
                </div>


                <div className='lg:flex items-center flex flex-col lg:flex-row'>
                    <div className='lg:w-6/12 order-first lg:pl-10 px-3 py-6'>
                        <h1 className='lg:text-5xl font-bold text text-green-700 tracking-wide mb-6 select-none text-3xl md:text-5xl'>We help develop your mind and skills</h1>
                        <p className='text-md leading-loose text-green-900 select-none font-semibold lg:text-lg font-sans'>Any successful career starts with a good education. Together with us, you will have deeper knowledge of the subjects that will be especially useful for you when climbing the career ladder.
                       </p>
                        <div className='flex py-6'>
                            <div className='text-white select-none bg-gradient-to-l from-yellow-500 to-yellow-300 hover:bg-gradient-to-r font-semibold mr-2 md:w-9/12 flex justify-center items-center py-3 px-10 rounded-lg shadow-sm select-none cursor-pointer' onClick={() => { navigate('/signin') }}>Get Started</div>
                        </div>
                    </div>
                    <div className='lg:w-6/12 order-last hidden lg:flex'>
                        <div><img src='./bg3.jpeg' className='w-full select-none' alt='home' /></div>
                    </div>
                </div>
                <div className='py-10 bg-gray-100'>
                    <div className='pl-5 lg:pl-16'>
                        <div className='text-3xl md:text-4xl font-semibold select-none lg:px-0'>Stories</div>
                        <p className='pt-1'>These are some testimonials from our winners.</p>
                    </div>
                    <div className='w-11/12 mx-auto md:flex justify-between flex-wrap items-center'>
                        {allTestimonies.map((singleTestimony) => {
                            const { _id, username, level, comment, fileName } = singleTestimony;
                            return (
                                <div key={_id} className='rounded-lg shadow-md p-10 mb-3 mt-6 border md:w-5/12'>
                                    <div className='text-green-700'><ImQuotesLeft /></div>
                                    <div className='italic tracking-wider leading-loosed mb-6 select-none'>{comment}</div>
                                    <div className='flex items-center'>
                                        <div><img src={`/uploads/${fileName}`} alt='nimelssaite' className='object-cover h-14 w-14 rounded-full mr-3' /></div>
                                        <div>
                                            <h1 className='font-semibold text-md font-sans md:text-xl uppercase select-none'>{username}</h1>
                                            <p className=' font-sans select-none'>{level} Level</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='bg-gray-300 py-10 '>
                    <div className='md:pl-48 lg:w-7/12 py-6'>
                        <div className='text-3xl font-semibold select-none mb-1 select-none text-center md:text-left'>Meet The Team</div>
                        <p className='tracking-wider select-none  text-center md:text-left'>"Individuals can and do make a difference, but it takes a team to really mess things up"</p>
                    </div>

                    <div className='w-11/12 mx-auto md:flex justify-between flex-wrap items-center'>
                        <div className='rounded-lg shadow-md p-10 mb-3 mt-6 border md:w-5/12'>
                            <div className='text-green-700'><ImQuotesLeft /></div>
                            <div className='italic tracking-wider leading-loosed mb-6 select-none'>
                            I am glad to be THE team lead of the NIMELSSA academic team 2021/2022 academic session.
                            My goal is to develop every Nimelssaite academically and also to be great pillars of our honourable profession.
                            </div>
                            <div className='flex items-center'>
                                <div><img src='./leadMember.jpg' alt='nimelssaite' className='object-cover h-14 w-14 rounded-full mr-3' /></div>
                                <div className='w-full px-3'>
                                    <p className='font-semibold text-sm font-sans uppercase select-none '>SAMUEL BASSEY</p>
                                    <p className=' font-sans select-none'>300 Level</p>
                                </div>
                            </div>
                        </div>

                        <div className='rounded-lg shadow-md p-10 mb-3 mt-6 border md:w-5/12'>
                            <div className='text-green-700'><ImQuotesLeft /></div>
                            <div className='italic tracking-wider leading-loosed mb-6 select-none'>
                            I am glad to be a member of the NIMELSSA academic team, it has increased my engagement in academic related activities.
                            </div>
                            <div className='flex items-center'>
                                <div><img src='./member1.jpg' alt='nimelssaite' className='object-cover h-14 w-14 rounded-full mr-3' /></div>
                                <div className='w-full px-3'>
                                    <p className='font-semibold text-sm font-sans uppercase select-none '>OLANIPEKUN JESUTOFUNMI</p>
                                    <p className=' font-sans select-none'>200 Level</p>
                                </div>
                            </div>
                        </div>

                        
                        <div className='rounded-lg shadow-md p-10 mb-3 mt-6 border md:w-5/12'>
                            <div className='text-green-700'><ImQuotesLeft /></div>
                            <div className='italic tracking-wider leading-loosed mb-6 select-none'>
                                    leading-relaxed tracking-wider select-none text-center
                                    I have been a member of the academic committee for the past five years (200 level - till date) and all 
                                    that i can say is that i am really greatful for the experience i've gained working with other members 
                                    of the team. My goal is to provide guidance to my peers and also to those in junior classes on exam preparations.
                            </div>
                            <div className='flex items-center'>
                                <div><img src='./member2.jpg' alt='nimelssaite' className='object-cover h-14 w-14 rounded-full mr-3' /></div>
                                <div className='w-full px-3'>
                                    <p className='font-semibold text-sm font-sans uppercase select-none '>UMELO QUINCY</p>
                                    <p className=' font-sans select-none'>500 Level</p>
                                </div>
                            </div>
                        </div>

                        
                        <div className='rounded-lg shadow-md p-10 mb-3 mt-6 border md:w-5/12'>
                            <div className='text-green-700'><ImQuotesLeft /></div>
                            <div className='italic tracking-wider leading-loosed mb-6 select-none'>
                            I am happy to be a member of the academic team, this has helped me achieve my 
                                goal to help boost academic excellence in the department and help people see 
                                themselves for the success stories they are through building good habits.
                            </div>
                            <div className='flex items-center'>
                                <div><img src='./background.jpg' alt='nimelssaite' className='object-cover h-14 w-14 rounded-full mr-3' /></div>
                                <div className='w-full px-3'>
                                    <p className='font-semibold text-sm font-sans uppercase select-none '>VIAN</p>
                                    <p className=' font-sans select-none'>400 Level</p>
                                </div>
                            </div>
                        </div>
                    </div>
                 
                </div> 


                 <div className="lg:flex justify-evenly bg-green-700 py-6 text-left">
                    <div className='w-10/12 max-w-full my-0 mx-auto md:flex justify-between'>
                        <div className="">
                            <p className="text-white font-medium font-sans text-lg select-none">About NIMELSSA</p>
                            <p className="tracking-widest font-bold my-4 text-gray-900 font-sans text-sm my-3 cursor-pointer select-none">Overview</p>
                            <p className="tracking-widest font-bold my-4 text-gray-900 font-sans text-sm my-3 cursor-pointer select-none">The President</p>
                            <p className="tracking-widest font-bold my-4 text-gray-900 font-sans text-sm my-3 cursor-pointer select-none">Excos, Alumni, Community</p>
                            <p className="tracking-widest font-bold my-4 text-gray-900 font-sans text-sm my-3 cursor-pointer select-none">Sponsors</p>
                        </div>
                        <div className="">
                            <p className="text-white font-medium font-sans text-lg select-none">Products</p>
                            <p className="tracking-widest font-bold my-4 text-gray-900 font-sans text-sm my-3 cursor-pointer select-none">
                               <a href='https://nimelssascope.wordpress.com/'>
                                 The NUEB
                              </a>
                            </p>
                            <p className="tracking-widest font-bold my-4 text-gray-900 font-sans text-sm my-3 cursor-pointer select-none">NIMELSSA Fit</p>
                            <p className="tracking-widest font-bold my-4 text-gray-900 font-sans text-sm my-3 cursor-pointer select-none">
                            <a href='http://bit.ly/nimelssavirtuallibary'>
                                 NIMELSSA Libary
                              </a>
                            </p>
                        </div>
                        <div className="">
                            <p className="text-white font-sans font-medium text-lg select-none">Follow us</p>
                            <p className="tracking-widest font-semibold my-4 text-white font-sans font-light text-sm my-3 cursor-pointer select-none">
                                <a href='https://twitter.com/Nimelssa_unilag/'>
                                    <FaTwitterSquare size={28} />
                                </a>
                            </p>
                            <p className="tracking-widest font-semibold my-4 text-white font-sans font-light text-sm my-3 cursor-pointer select-none" onClick={() => { 'https://www.instagram.com/Nimelssaunilag/' }}>
                                <a href='https://www.instagram.com/Nimelssaunilag/'>
                                    <FaInstagramSquare size={28} />
                                </a>
                            </p>
                            <p className="tracking-widest font-semibold my-4 text-white font-sans font-light text-sm my-3 cursor-pointer select-none"><FaLinkedinIn size={28} /></p>
                        </div>
                    </div>
                </div> 
                <div className="bg-green-700 border-t-2 border-green-900 py-4 flex justify-center items-center">
                    <p className="text-white font-semibold select-none text-sm lg:text-base tracking-wide text-center select-none">@ 2022 NIMELSSA academic team. All rights reserved</p>
                </div>
            </>
        )
    }

    useEffect(() => {
        let interval = setTimeout(() => { setLoading(false) }, 3000);
        return () => {
            if (interval) {
                clearInterval(interval);
                interval = 0;
            }
        }
    }, [])

    return loading ? (
        <>
            <div className='flex justify-center items-center h-screen w-screen bg-gray-100'>
                <div className=''>
                    <span className='mr-1'><ClimbingBoxLoader size={15} color='green' loading={loading} /></span>
                    <p className='font-semibold'>Welcome to NIMELSSA Quiz</p>
                </div>
            </div>
        </>
    ) : (<HomePage />)
}

export default Home;
