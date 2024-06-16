
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import './globals.css'




// https://stackoverflow.com/questions/78255009/react-router-v6-route-without-a-path  great article to refer to

//we can make parent routes without path to give them outlet property and make multiple layouts 



ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
    <App /> 
    </>
);
