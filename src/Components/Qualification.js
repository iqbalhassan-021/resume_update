import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Qualification = () => {
  const [qualification, setqualification] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "degreeData"));
      const qualification = querySnapshot.docs.map((doc) => doc.data());
      setqualification(qualification);
    };

    fetchData();
  }, []);

  if (qualification.length === 0) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div className="skill-container qualification">
      <div className="body-cover">
        <div className="skills ">
          <h1  data-aos="fade-up">
          My qualifications enable me to deliver impactful results for SaaS companies and agencies.
          </h1>
          <div className="grid-4x">
            {qualification.map((service, index) => (
              <div className="skill-card" key={index}  data-aos="fade-up">
                <p>
                  <i className={service.icon}></i>
                </p>
            
                <p>{service.degree}</p>
                <p>{service.univeristy}</p>
                <p>{service.endingdate}</p>
                <p>{service.desgreeDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qualification;
