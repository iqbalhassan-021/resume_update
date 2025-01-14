import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Skills = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "serviceData"));
      const serviceData = querySnapshot.docs.map((doc) => doc.data());
      setServices(serviceData);
    };

    fetchData();
  }, []);

  if (services.length === 0) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div className="skill-container">
      <div className="body-cover">
        <div className="skills">
          <h1>
            I can collaborate with brands and agencies to create impactful results
          </h1>
          <div className="grid-4x">
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
  );
};

export default Skills;
