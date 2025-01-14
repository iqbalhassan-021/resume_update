import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Header = () => {
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

  return (
    <div className="header sticky">
      <div className="body-cover">
        <div className="navbar">
          <a href="#">
            <div className="nav-tab logo">
              <div className="circle center">
                <p>IH</p>
              </div>
              <h3>{siteData.siteName}</h3>
            </div>
          </a>
          <div className="nav-tab nav-button">
            <a href={siteData.linkedin} target="_blank" rel="noopener noreferrer">
              <p>
                <i className="fa-brands fa-linkedin"></i>
              </p>
            </a>
            <p className="space">/</p>
            <a href={siteData.github} target="_blank" rel="noopener noreferrer">
              <p>
                <i className="fa-brands fa-github"></i>
              </p>
            </a>
            <p className="space">/</p>
            <a href={siteData.instagram} target="_blank" rel="noopener noreferrer">
              <p>
                <i className="fa-brands fa-instagram"></i>
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
