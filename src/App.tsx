import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";
import "./i18n";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/layout";
import { TeamSlider } from "./components/slider";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="app-wrapper">
          <Navbar />
          <TeamSlider />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
