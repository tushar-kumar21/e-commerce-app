import { CartNavbar } from '@/components/CartNavbar';
import { Footer } from '@/components/Footer';
import { useFirebase } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const Login = () => {

    const fb = useFirebase();
    const router = useRouter();
    const { signInWithGoogle, signInWithGithub, currentUser, getCurrentUser } = fb;

    useEffect(()=>{
     getCurrentUser()
     currentUser ? router.push("/Cart") : router.push("/Login")
     console.log("cshlfnaaam;mdas")
    },[currentUser])

    return (
        <>
            <CartNavbar />
            <main className='flex h-[550px] py-2 md:flex-col'>
                <aside className='bg-main flex flex-col justify-between w-[33%] p-5 py-10 md:grow md:w-full md:mb-4'>
                    <span>
                        <span className='text-3xl text-white'>Login</span><br />
                        <span className='text-lg text-gray-300'>Get access to your Orders, Wishlist and Recommendations.</span>
                    </span>
                    <img src="https://pluspng.com/img-png/e-commerce-png-ecommerce-537.png" alt="" className='mb-16' />
                </aside>
                <aside className='flex flex-col m-auto gap-3'>
                    <aside className='main-google-bg rounded-md p-1 cursor-pointer hover:shadow-[0px_8px_8px_grey] hover:scale-110 transition duration-300' onClick={signInWithGoogle}>
                    <div className='flex items-center bg-white rounded-md py-[2.5px]'>
                        <img src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png" className='w-13 h-8' alt="" />
                        <span className='text-xl font-bold google-bg'>Sign In With Google</span>
                    </div>
                    </aside>
                    <aside className='main-github-bg rounded-md p-1 cursor-pointer hover:scale-110 transition duration-300 hover:shadow-[0px_8px_8px_grey]' onClick={signInWithGithub}>
                    <div className='flex items-center bg-white rounded-md'>
                        <img src="https://pngimg.com/uploads/github/github_PNG40.png" alt="" className='w-13 h-9' />
                        <span className='text-xl font-bold github-bg'>Sign In With Github</span>
                    </div>
                    </aside>
                </aside>
            </main>
            <Footer />
        </>
    )
}

export default Login;