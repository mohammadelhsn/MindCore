import { CssBaseline, ThemeProvider } from '@mui/material';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { lightTheme, darkTheme } from './data/Theme';
import { useState, useMemo } from 'react';
import Welcome from './pages/Welcome';
import Header from './components/Header';
import Footer from './components/Footer';
import LogIn from './pages/Login';
import SignUpPage from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import SettingsPage from './pages/Settings';
import ManageAccount from './pages/ManageAccount';
import './App.css';
import LearnPage from './pages/Learn';
import NewJournalPage from './pages/NewJournalEntry';

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
      return prevMode; // no change if same mode selected
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
        <Header />
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/settings" element={<SettingsPage mode={mode} toggleColorMode={toggleColorMode} />} />
          <Route path="/manageAccount" element={<ManageAccount />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="newEntry" element={<NewJournalPage />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
