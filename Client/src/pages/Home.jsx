import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
        <div className='h-screen bg-cover bg-center pt-8 w-full bg-[url(https://imgs.search.brave.com/8rp_B4UkU0zEl1EcVsJThgzlW6f8gxJQ_y7HgWwMzWc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy85/LzkxL01vZGVybl9C/cml0aXNoX0xFRF9U/cmFmZmljX0xpZ2h0/LmpwZw)] bg-red-400 flex justify-between flex-col'>
            <img className='w-16 ml-8' src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n" alt="" />
            <div className='bg-white py-8 px-4'>
                <h1 className='text-3xl font-bold'>Get Started with Uber</h1>
                <Link to="/userLogin" className='flex justify-center items-center w-full bg-black px-3 text-white py-3 mt-5 rounded-md'>Continue</Link>
            </div>
            
        </div>
    </>
  )
}

export default Home