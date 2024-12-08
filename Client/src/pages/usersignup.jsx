import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserSignup = () => {
  const [userData, setUserData] = useState({
    fullname: {
      firstname: '',
      lastname: '',
    },
    email: '',
    password: '',
  });

  const handleFirstnameChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      fullname: {
        ...prevState.fullname,
        firstname: e.target.value,
      },
    }));
  };

  const handleLastnameChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      fullname: {
        ...prevState.fullname,
        lastname: e.target.value,
      },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', userData);
    // Add your signup logic here
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
      <img
          className="w-20 "
          src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n"
          alt="Logo"
        />
        <h1 className='text-3xl font-medium mb-12 text-green-400'>Register here</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div>
              <h1 className="text-lg mb-2">First Name</h1>
              <input
                name="firstname"
                value={userData.fullname.firstname}
                onChange={handleFirstnameChange}
                placeholder="Firstname"
                className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border-2 w-full text-lg placeholder:text-base"
                type="text"
              />
            </div>
            <div>
              <h1 className="text-lg mb-2">Last Name</h1>
              <input
                name="lastname"
                value={userData.fullname.lastname}
                onChange={handleLastnameChange}
                placeholder="Lastname"
                className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border-2 w-full text-lg placeholder:text-base"
                type="text"
              />
            </div>
          </div>

          <h3 className="text-lg mb-2">What's your email?</h3>
          <input
            required
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="example@gmail.com"
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border-2 w-full text-lg placeholder:text-base"
          />
          <h3 className="text-lg mb-2">Enter Password</h3>
          <input
            required
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            placeholder="password"
            className="bg-[#eeeeee] rounded mb-8 px-4 py-2 border-2 w-full text-lg placeholder:text-base"
          />
          <button
            type="submit"
            className="bg-[#111] font-bold text-white rounded px-4 py-2 w-full text-xl placeholder:text-base"
          >
            Signup
          </button>
        </form>
        <p className="text-center text-base mt-4">
          Already have an account?{' '}
          <Link to="/userLogin" className="text-blue-400">
            signup
          </Link>
        </p>
      </div>
      <div>
        <p>
          This site protected by reCAPTCHA and the <span className='border-b-[1px] border-black'> google privacy policy</span> and <span className='border-b-[1px] border-black'>Terms of services apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;