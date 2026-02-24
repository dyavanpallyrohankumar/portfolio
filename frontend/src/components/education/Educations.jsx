import React, { Component } from "react";
import "./Educations.css";
import DegreeCard from "../degreeCard/DegreeCard.jsx";
import { motion } from "framer-motion";
import { materialTealTheme } from "../../theme.jsx";
class Educations extends Component {
  render() {
    const theme = materialTealTheme;

    const degrees = {
      degrees: [
        {
          id: 1,
          title: "Indian Institute of Information Technology Kurnool",
          subtitle: "B.Tech. in Computer Engineering",
          logo_path: "react.svg",
          alt_name: "IIITDM Kurnool",
          duration: "2016 - 2020",
          descriptions: [
            "⚡ I have studied basic software engineering subjects like DS, Algorithms, DBMS, OS, CA, AI etc.",
            "⚡ Apart from this, I have done courses on Deep Learning, Data Science, Cloud Computing and Full Stack Development.",
            "⚡ I was selected for Merit cum Means Scholarship which is given to top 10% of students in college. I have received award from respected director for consistently best performance in academics.",
          ],
          website_link: "http://iiitk.ac.in",
        },
        {
          id: 2,
          title: "Indiana University Bloomington",
          subtitle: "M.S. in Computer Science",
          logo_path: "react.svg",
          alt_name: "Indiana University Bloomington",
          duration: "2021 - 2023",
          descriptions: [
            "⚡ I have taken varity of courses related to Artificial Intelligence which correspond to Explainable AI, Graph Machine Learning, Computer Vision etc.",
            "⚡ Apart from this, I have also done research assistantship. As part of it, I have worked on creating new algorithms in Graph ML and Network Science.",
            "⚡ During my time at university, I was also associated with multimedia department. As part of it, I have worked on some documentry films and interviews.",
          ],
          website_link: "https://www.indiana.edu/",
        },
      ],
    };
    return (
      <div className="main" id="educations">
        <div className="educations-header-div">
          <motion.h1
            className="educations-header"
            style={{ color: theme.text }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
          >
            Degrees Received
          </motion.h1>
        </div>
        <div className="educations-body-div">
          {degrees.degrees.map((degree) => {
            return <DegreeCard degree={degree} theme={theme} />;
          })}
        </div>
      </div>
    );
  }
}

export default Educations;
