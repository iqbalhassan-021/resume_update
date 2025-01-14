import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Companies = () => {
  const [companyImages, setCompanyImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "companyData"));
      const images = querySnapshot.docs.map((doc) => doc.data().companysrc);
      setCompanyImages(images);
    };

    fetchData();
  }, []);

  if (companyImages.length === 0) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div className="companies-container">
      <div className="body-cover">
        <div className="companies">
          <div className="grid-5x">
            {companyImages.map((img, index) => (
              <div className="center" key={index}>
                <img src={img} alt={`Company ${index + 1}`} className="companies-img" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
