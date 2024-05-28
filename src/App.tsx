import './App.css';
import MainPage from './pages/MainPage.tsx';
import { ThemeProvider } from '@/components/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
