import React, { Component } from "react";
import Educations from "../../education/Educations";
import Certifications from "../../certifications/Certifications";
import EducationImg from "./EducationImg";
import CompetitiveSites from "../../competitiveSites/CompetitiveSites";
// import { certifications } from "../../portfolio";
import "./EducationComponent.css";
import { motion } from "framer-motion";
import { materialTealTheme } from "../../../theme"




class Education extends Component {
  render() {
    const theme = materialTealTheme;
    const certifications = {
      certifications: [
        {
          title: "Machine Learning",
          subtitle: "- Andrew Ng",
          logo_path: "react.svg",
          certificate_link:
            "https://www.coursera.org/account/accomplishments/verify/22MTSSC5WDTM",
          alt_name: "Stanford University",
          color_code: "#8C151599",
        },
        {
          title: "Deep Learning",
          subtitle: "- Andrew Ng",
          logo_path: "react.svg",
          certificate_link:
            "https://www.coursera.org/account/accomplishments/specialization/H8CPSFXAJD2G",
          alt_name: "deeplearning.ai",
          color_code: "#00000099",
        },

        {
          title: "Kuberenetes on GCP",
          subtitle: "- Qwiklabs",
          logo_path: "react.svg",
          certificate_link:
            "https://google.qwiklabs.com/public_profiles/e4d5a92b-faf6-4679-a70b-a9047c0cd750",
          alt_name: "GCP",
          color_code: "#4285F499",
        },
        {
          title: "Cryptography",
          subtitle: "- Saurabh Mukhopadhyay",
          logo_path: "react.svg",
          certificate_link:
            "https://drive.google.com/open?id=1z5ExD_QJVdU0slLkp8CBqSF3-C3g-ro_",
          alt_name: "NPTEL",
          color_code: "#FFBB0099",
        },
        {
          title: "Cloud Architecture",
          subtitle: "- Qwiklabs",
          logo_path: "react.svg",
          certificate_link:
            "https://google.qwiklabs.com/public_profiles/5fab4b2d-be6f-408c-8dcb-6d3b58ecb4a2",
          alt_name: "GCP",
          color_code: "#4285F499",
        },
      ],
    };


    const competitiveSites = {
      competitiveSites: [
        {
          siteName: "LeetCode",
          iconifyClassname: "simple-icons:leetcode",
          style: {
            color: "#F79F1B",
          },
          profileLink: "https://leetcode.com/layman_brother/",
        },
        {
          siteName: "HackerRank",
          iconifyClassname: "simple-icons:hackerrank",
          style: {
            color: "#2EC866",
          },
          profileLink: "https://www.hackerrank.com/layman_brother",
        },
        {
          siteName: "Codechef",
          iconifyClassname: "simple-icons:codechef",
          style: {
            color: "#5B4638",
          },
          profileLink: "https://www.codechef.com/users/ashutosh_1919",
        },
        {
          siteName: "Codeforces",
          iconifyClassname: "simple-icons:codeforces",
          style: {
            color: "#1F8ACB",
          },
          profileLink: "http://codeforces.com/profile/layman_brother",
        },
        {
          siteName: "Hackerearth",
          iconifyClassname: "simple-icons:hackerearth",
          style: {
            color: "#323754",
          },
          profileLink: "https://www.hackerearth.com/@ashutosh391",
        },
        {
          siteName: "Kaggle",
          iconifyClassname: "simple-icons:kaggle",
          style: {
            color: "#20BEFF",
          },
          profileLink: "https://www.kaggle.com/laymanbrother",
        },
      ],
    };


    return (
      <div className="education-main">
        {/* <Header theme={this.props.theme} /> */}
        <div className="basic-education">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
          >
            <div className="heading-div">
              <div className="heading-img-div">
                <EducationImg theme={theme} />
              </div>

              <div className="heading-text-div">
                <h1 className="heading-text" style={{ color: theme.text }}>
                  Education
                </h1>

                <h3 className="heading-sub-text" style={{ color: theme.text }}>
                  Basic Qualification and Certifcations
                </h3>

                <CompetitiveSites logos={competitiveSites.competitiveSites} />
              </div>
            </div>
          </motion.div>
          <Educations theme={this.props.theme} />
          {certifications.certifications.length > 0 ? (
            <Certifications theme={this.props.theme} />
          ) : null}
        </div>
        {/* <Footer theme={this.props.theme} />
        <TopButton theme={this.props.theme} /> */}
      </div>
    );
  }
}

export default Education;
