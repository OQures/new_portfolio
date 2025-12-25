import { BrowserRouter } from 'react-router-dom';
import {
  About,
  Contact,
  Hero,
  Navbar,
  Services,
  Footer,
} from './components';

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-white">
        <div>
          <Navbar />
          <Hero />
        </div>

        <div className="bg-gray-50">
          <About />
        </div>

        <div className="bg-white">
          <Services />
        </div>

        <div className="relative z-0 bg-gray-50">
          <Contact />
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
