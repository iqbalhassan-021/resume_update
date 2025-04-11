import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Skills = () => {
  const [services, setServices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Initialize numVisibleCards based on window width
  const getInitialVisibleCards = () => {
    if (typeof window === "undefined") return 4; // Fallback for SSR
    if (window.innerWidth <= 510) return 1;
    if (window.innerWidth <= 830) return 2;
    if (window.innerWidth <= 1120) return 3;
    return 4;
  };
  const [numVisibleCards, setNumVisibleCards] = useState(getInitialVisibleCards());
  const cardContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "serviceData"));
      const serviceData = querySnapshot.docs.map((doc) => doc.data());
      setServices(serviceData);
    };

    fetchData();
  }, []);

  // Update number of visible cards on resize
  useEffect(() => {
    const updateVisibleCards = () => {
      const newNumVisibleCards = getInitialVisibleCards();
      setNumVisibleCards(newNumVisibleCards);
      // Reset currentIndex to a valid multiple to avoid empty slides
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, services.length - newNumVisibleCards);
        // Round down to nearest multiple of newNumVisibleCards
        return Math.min(prev, Math.floor(maxIndex / newNumVisibleCards) * newNumVisibleCards);
      });
    };

    updateVisibleCards(); // Run on mount to ensure correct initial state
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, [services.length]);

  const handleNext = () => {
    if (currentIndex + numVisibleCards < services.length) {
      setCurrentIndex((prev) => prev + numVisibleCards);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - numVisibleCards);
    }
  };

  if (services.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="skill-container">
      <div className="body-cover">
        <div className="skills">
          <h1>
            I can collaborate with brands and agencies to create impactful results
          </h1>
          <div className="holder-div">
            <p>Skills</p>
            <div className="slider-button-holder">
              <button
                className="slider-button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous skill"
              >
                <i className="fa fa-angle-left"></i>
              </button>
              <button
                className="slider-button"
                onClick={handleNext}
                disabled={currentIndex + numVisibleCards >= services.length}
                aria-label="Next skill"
              >
                <i className="fa fa-angle-right"></i>
              </button>
            </div>
          </div>
          <div className="card-slider">
            <div
              className="card-track"
              ref={cardContainerRef}
              style={{
                transform: `translateX(-${(currentIndex / numVisibleCards) * 100}%)`,
              }}
            >
              {services.map((service, index) => (
                <div className="skill-card" key={index}>
                  <p>
                    <i className={service.icon}></i>
                  </p>
                  <p>{service.service}</p>
                  <p>{service.servicedesc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;