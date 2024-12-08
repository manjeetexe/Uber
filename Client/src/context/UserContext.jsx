import React, { createContext } from 'react'

export const UserContextData = createContext()

const UserContext = ({children}) => {



    const [userData, setUserData] = useState({
        fullname: {
          firstname: '',
          lastname: '',
        },
        email: '',
        password: '',
      });


      
  return (
    <div>
        <UserContextData.Provider value={{userData, setUserData }}>
          {children}
        </UserContextData.Provider>
        {children}
    </div>
  )
}

export default UserContext