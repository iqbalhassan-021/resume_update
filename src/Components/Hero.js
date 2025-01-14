import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Hero = () => {
  const [siteData, setSiteData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "siteData"));
      const data = querySnapshot.docs[0].data(); // Assuming there's only one document
      setSiteData(data);
    };

    fetchData();
  }, []);

  if (!siteData) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  const whatsappLink = `https://wa.me/${siteData.phone}`;

  return (
    <div className="hero-container">
      <div className="body-cover">
        <div className="hero">
          <div
            className="me"
            style={{ backgroundImage: `url('${siteData.siteImage}')` }}
          ></div>
          <p>
            Hi, I'm {siteData.siteName} <i className="fa-solid fa-hand"></i>
          </p>
          <h1>Building digital products, brands and experience.</h1>
          <a href={whatsappLink} className="primary-button" target="_blank" rel="noopener noreferrer">
            Hire Me
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
