/** ======= REACT & REACT ROUTER ======= */
import { useState, useMemo } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

/** ======= MUI COMPONENTS ======= */
import { CssBaseline, ThemeProvider } from '@mui/material';

/** ======= PAGES ======= */
import Welcome from './pages/Welcome';
import LogIn from './pages/Login';
import SignUpPage from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import SettingsPage from './pages/Settings';
import ManageAccount from './pages/ManageAccount';
import LearnPage from './pages/Learn';
import NewJournalPage from './pages/NewJournalEntry';
import ViewEntry from './pages/ViewJournal';

/** ======= CUSTOM COMPONENTS ======= */
import Header from './components/Header';
import Footer from './components/Footer';
import GlobalSnackbar from './components/GlobalSnackbar';

/** ======= CONTEXTS ======= */
import AuthProvider from './contexts/AuthContext';
import { FeedbackProvider } from './contexts/FeedbackContext';

/** ======= STYLES ======= */
import './App.css';
import { lightTheme, darkTheme } from './data/Theme';

/** ======= FONTS ======= */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/** The app */
function App() {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('colorMode');
    return stored === 'dark' ? 'dark' : 'light';
  });
  const toggleColorMode = (newMode: 'light' | 'dark') => {
    setMode((prevMode) => {
      if (prevMode !== newMode) {
        localStorage.setItem('colorMode', newMode);
        return newMode;
      }
      return prevMode;
    });
  };
  const theme = useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode]
  );
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FeedbackProvider>
          <GlobalSnackbar />
          <AuthProvider>
            <Header />
            <Routes>
              <Route path='/' element={<Welcome />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path="/settings" element={<SettingsPage mode={mode} toggleColorMode={toggleColorMode} />} />
              <Route path="/manageAccount" element={<ManageAccount />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/newEntry" element={<NewJournalPage />} />
              <Route path="/viewEntry/:id" element={<ViewEntry />} />
            </Routes>
            <Footer />
          </AuthProvider>
        </FeedbackProvider>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
