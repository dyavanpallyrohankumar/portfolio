import React, { Component } from "react";
import "./Certifications.css";
import { motion } from "framer-motion";
import CertificationCard from "../certificationCard/CertificationCard";
import { materialTealTheme } from "../../theme";

class Certifications extends Component {
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
    return (
      <div className="main" id="certs">
        <div className="certs-header-div">
          <motion.h1
            className="certs-header"
            style={{ color: theme.text }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
          >
            Certifications
          </motion.h1>
        </div>
        <div className="certs-body-div">
          {certifications.certifications.map((cert) => {
            return <CertificationCard certificate={cert} theme={theme} />;
          })}
        </div>
      </div>
    );
  }
}

export default Certifications;
