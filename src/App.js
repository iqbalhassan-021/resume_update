import React from "react";
import Header from "./Components/Header";
import Hero from "./Components//Hero";
import Companies from "./Components//Companies";
import Skills from "./Components//Skills";
import Hire from "./Components//Hire";
import Footer from "./Components/Footer";
import Work from "./Components/Work";

const App = () => (
  <div className="container">
    <Header />
    <Hero />
    <Companies />
    <Skills />
    <Work/>
    <Hire />
    <Footer />

  </div>
);

export default App;
