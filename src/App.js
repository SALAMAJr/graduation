import Footer from "./Footer";
import Cta from "./Home/Cta";
import FeaturedSwaps from "./Home/FeaturedSwaps";
import Hero from "./Home/Hero";
import HowItWorks from "./Home/HowItWorks";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Hero/>
      <HowItWorks/>
      <FeaturedSwaps/>
      <Cta/>
      <Footer/>
    </div>
  );
}

export default App;
