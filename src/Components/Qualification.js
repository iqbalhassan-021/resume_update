import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Qualification = () => {
  const [qualification, setQualification] = useState([]); // Fixed variable name typo
  const [currentIndex, setCurrentIndex] = useState(0);
  // Initialize numVisibleCards based on window width
  const getInitialVisibleCards = () => {
    if (typeof window === "undefined") return 1; // Fallback for SSR
    if (window.innerWidth <= 510) return 1;
    if (window.innerWidth <= 830) return 2;
    if (window.innerWidth <= 1120) return 2;
    return 4;
  };
  const [numVisibleCards, setNumVisibleCards] = useState(getInitialVisibleCards());
  const cardContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "degreeData"));
      const qualificationData = querySnapshot.docs.map((doc) => doc.data());
      setQualification(qualificationData); // Fixed variable name consistency
    };

    fetchData();
  }, []);

  // Update number of visible cards on resize and mount
  useEffect(() => {
    const updateVisibleCards = () => {
      const newNumVisibleCards = getInitialVisibleCards();
      setNumVisibleCards(newNumVisibleCards);
      // Reset currentIndex to a valid multiple to avoid empty slides
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, qualification.length - newNumVisibleCards);
        return Math.min(prev, Math.floor(maxIndex / newNumVisibleCards) * newNumVisibleCards);
      });
    };

    updateVisibleCards(); // Run on mount to ensure correct initial state
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, [qualification.length]);

  const handleNext = () => {
    if (currentIndex + numVisibleCards < qualification.length) {
      setCurrentIndex((prev) => prev + numVisibleCards);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - numVisibleCards);
    }
  };

  if (qualification.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="skill-container qualification" style={{ backgroundColor: "#0D0D0D" }}>
      <div className="body-cover">
        <div className="skills">
          <h1>
            My qualifications enable me to deliver impactful results for SaaS companies and agencies.
          </h1>
          <div className="holder-div">
            <p>Qualifications</p>
            <div className="slider-button-holder">
              <button
                className="slider-button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous qualification"
              >
                <i className="fa fa-angle-left"></i>
              </button>
              <button
                className="slider-button"
                onClick={handleNext}
                disabled={currentIndex + numVisibleCards >= qualification.length}
                aria-label="Next qualification"
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
              {qualification.map((service, index) => (
                <div className="skill-card " key={index}>
                  <p>
                    <i className={service.icon}></i>
                  </p>
                  <p>{service.degree}</p>
                  <p>{service.univeristy}</p> {/* Typo in original: should be "university" */}
                  <p>{service.endingdate}</p>
                  <p>{service.desgreeDescription}</p> {/* Typo in original: should be "degreeDescription" */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qualification;