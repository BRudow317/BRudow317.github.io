// import {useContext} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { ResumePage } from './pages/ResumePage/ResumePage';
import { DemoPage } from './pages/DemoPage/DemoPage';
import { GoogleAddressPage } from './pages/GoogleAddressPage/GoogleAddressPage';
import { MessageCenterPage } from './pages/MessageCenterPage/MessageCenterPage';
import { Layout } from './layouts/Layout.jsx';
import { ROUTES } from './constants/routes.js';

// Themes 
import { BreakpointProvider} from './context/BreakpointContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/ColorTokens.css';

export  { App };

function App() {
  return (
    <ThemeProvider>
    <BreakpointProvider>
    <BrowserRouter>  
      <Routes>
        {/* Parent Route controls the Site Layout */}
        <Route path="/" element={<Layout />}>
          {/* Index element controls the default page */}
          <Route index element={<HomePage />} />
          <Route path={ROUTES.RESUME} element={<ResumePage />} />
          <Route path={ROUTES.MESSAGE_CENTER} element={<MessageCenterPage />} />
          <Route path={ROUTES.GOOGLEADDRESS} element={<GoogleAddressPage />} />
          <Route path={ROUTES.DEMO} element={<DemoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </BreakpointProvider>
    </ThemeProvider>
  );
}
