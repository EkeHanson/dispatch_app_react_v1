import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals.js';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
// import Landingpage from './Components/Landpage/Landingpage';
import Lotery from './Components/Lottry/Lotery.jsx';
import Ownerslogin from './Components/Ownerlogin/Ownerslogin.jsx';
import Ownerslog from './Components/Overview/Ownerslog.jsx';
import Adminslogin from './Components/Adminlogin/Adminslogin.jsx';
import Ownerregister from './Components/Ownerregister/Ownerregister.jsx';
import Rider from './Components/Riderpage/Rider.jsx';
import Lottery from './Components/Lotery/Lottery.jsx';
import Addorder from './Components/Addneworder/Addorder.jsx';
import Adminpage2 from './Components/Adminpage2/Adminpage2.jsx';
import Adminpage2Edit from './Components/Adminpage2Edit/Adminpage2Edit.jsx';
import Confirmpage from './Components/Confirmation/Confirmpage.jsx';
import Establish from './Components/Establishment/Establish.jsx';
import Mainregistration from './Components/Mainregistration/Mainregistration.jsx';
import Adminregister from './Components/Register/Adminregister.jsx'
// import Managerpage from './Components/Managerpage/Managerpage';
import ManagerLog from './Components/ManagerLog/ManagerLog.jsx';
import Riderlogin from './Components/Riderlogin/Riderlogin.jsx';
import Managmentlog from './Components/Managementlog/Managmentlog.jsx';
import Managerpage from './Components/Managerpage/Managerpage.jsx';
import Ridercompo from './Components/Ridercomponent/Ridercompo.jsx';
import Managerlinkmodal from './Components/Copymanagermodal/Managerlinkmodal.jsx';
// import Confirmlink from './Components/Confirmastionlink/Confirmlink';
// import Approved from './Components/Pending/Approved';

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
      path: "/main-register",
      element: <Mainregistration/>,
    },
    {
      path: "/Login",
      element: <Lotery />,
    },
 
    {
      path: "/log-owner",
      element: <Ownerslog />,
    },
    {
      path: "/log-manager",
      element: <ManagerLog />,
    },
    {
      path: "/Admin-login",
      element: <Adminslogin />,
    },
    {
      path: "/owner-login",
      element: <Ownerslogin />,
     
    },
    {
      path: "/rider-login",
      element: <Rider />,
    },
    {
      path: "/Add-more",
      element: <Lottery />,
    },
    {
      path: "/add-order",
      element: <Addorder/>,
    },
    {
      path: "/create-company",
      element: <Adminpage2/>,
    },
    {
      path: "/edit-company-detail",
      element: <Adminpage2Edit/>,
    },
    {
      path: "/confirm",
      element: <Confirmpage/>,
    },
    {
      path: "/rider-page",
      element: <Rider/>,
    },
    {
      path: "/rider-page-1",
      element: <Establish/>,
    },
    {
      path: "/rider-page-2",
      element: <Rider/>,
    },
    {
      path: "/manager-page",
      element: <Managmentlog/>,
    },
  
    {
      path: "/riders-details",
      element: <Riderlogin/>,
    },
    {
      path: "/riders-form",
      element: <Lottery/>,
    },
    {
      path: "/admin-page",
      element: <Managerpage/>,
    },
    {
      path: "/slide-rider",
      element: <Ridercompo/>,
    },
    {
      path: "/register-login",
      element: <Adminregister/>,
    },
    {
      path: "/owner-register",
      element: <Ownerregister/>,
    },
    {
      path: "/managercopy-modal",
      element: <Managerlinkmodal/>,
    },
   
  
   
   
 
    
   
  ]);
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
