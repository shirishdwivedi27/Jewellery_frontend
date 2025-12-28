// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import './index.css'
// // import App from './App.jsx'
// // import { AuthProvider } from './auth/AuthContext'
// // import { PolarisProvider } from '@shopify/polaris'
// // import '@shopify/polaris/build/esm/styles.css'

// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //     <PolarisProvider>
// //       <AuthProvider>
// //         <App />
// //       </AuthProvider>
// //     </PolarisProvider>
// //   </StrictMode>,
// // )

// import React from "react";
// import { createRoot } from "react-dom/client";
// import { AppProvider } from "@shopify/polaris";
// import "@shopify/polaris/build/esm/styles.css";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./auth/AuthContext";

// createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <AppProvider i18n={{}}>
//       <AuthProvider>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </AuthProvider>
//     </AppProvider>
//   </React.StrictMode>
// );

import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);