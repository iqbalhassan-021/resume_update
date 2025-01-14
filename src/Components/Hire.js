import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Hire = () => {
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
    <div className="hire-container">
      <div className="body-cover">
        <div className="hire">
          <div className="me center">
            <i className="fa-sharp fa-solid fa-handshake"></i>
          </div>
          <h1>
            Looking to elevate your project with expert solutions? Hire me for
            top-notch development and innovative problem-solving!
          </h1>
          <div className="hire-tab">
            <a
              href={whatsappLink}
              className="primary-button hire-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a
              href={siteData.linkedin}
              className="primary-button hire-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hire;
