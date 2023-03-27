import React, { useContext, useState } from 'react'

const TokenContext = React.createContext();

export const useToken = () => {
  return useContext(TokenContext);
}

export const TokenProvider = ({children}) => {
	const [token, setToken] = useState(null);
	
	return (
    <TokenContext.Provider value={[token, setToken]}>
      {children}
    </TokenContext.Provider>
  )
};
