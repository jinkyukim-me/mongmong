import {createContext} from 'react';


const LoginContext = createContext({
  value: {setIsLogined: null},
});

export { LoginContext };