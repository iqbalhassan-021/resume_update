import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Work = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "saasData"));
      const projectData = querySnapshot.docs.map((doc) => doc.data());
      setProjects(projectData);
    };

    fetchData();
  }, []);

  if (projects.length === 0) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div className="skill-container">
      <div className="body-cover">
        <div className="skills">
          <h1  data-aos="fade-up">
          I can collaborate with SaaS companies and agencies to deliver impactful results, driving innovation and enhancing user experiences.
          </h1>
          <div className="grid-4x">
            {projects.map((project, index) => (
              <div className="skill-card" key={index}  data-aos="fade-up">
                <p>
                  <i className="fa-solid fa-project-diagram"></i>
                </p>
                <p>{project.projectName}</p>
                <p>{project.projectDescription}</p>
                <a href={project.link} target="_blank" >
                  View Project
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
