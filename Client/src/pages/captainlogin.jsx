import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const captainLogin = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      // Handle input changes
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      // Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Add logic to send data to the backend or perform validation
      };
    
      return (
        <>
          <div className="p-7 flex flex-col justify-between h-screen">
            <div>
              <img
                className="w-20 mb-7"
                src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n"
                alt=""
              />
              <form onSubmit={handleSubmit}>
                <h3 className="text-lg mb-2">What's your email?</h3>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email} // Two-way binding
                  onChange={handleInputChange}
                  placeholder="example@gmail.com"
                  className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border-2 w-full text-lg placeholder:text-base"
                />
                <h3 className="text-lg mb-2">Enter Password</h3>
                <input
                  required
                  type="password"
                  name="password"
                  value={formData.password} // Two-way binding
                  onChange={handleInputChange}
                  placeholder="password"
                  className="bg-[#eeeeee] rounded mb-8 px-4 py-2 border-2 w-full text-lg placeholder:text-base"
                />
                <button className="bg-[#111] font-bold text-white rounded px-4 py-2 w-full text-xl placeholder:text-base">
                  Login
                </button>
              </form>
              <p className="text-center text-base mt-4">
                Joint a fleet?{' '}
                <Link to="/captainSignup" className="text-blue-400">
                  Create new Account
                </Link>
              </p>
            </div>
            <div>
              <Link
                to="/userLogin"
                className="bg-orange-500 flex items-center justify-center font-bold text-white rounded px-4 py-3 w-full text-xl placeholder:text-base"
              >
                Signup as User
              </Link>
            </div>
          </div>
        </>
      );
    
  
}

export default captainLogin