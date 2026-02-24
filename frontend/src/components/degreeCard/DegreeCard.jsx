import React, { Component } from "react";
import "./DegreeCard.css";
import { motion } from "framer-motion";
import { materialTealTheme } from "../../theme";

class DegreeCard extends Component {
  render() {
    const { degree } = this.props;   // ✅ restore this
    const theme = materialTealTheme;

    return (
      <div className="degree-card">
        {degree.logo_path && (
          <motion.div
            className="card-img"
            initial={{ opacity: 0, rotateY: -90 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                transform: "scale(0.9)",
              }}
              src={new URL(
                `../../assets/images/${degree.logo_path}`,
                import.meta.url
              ).href}
              alt={degree.alt_name}
            />
          </motion.div>
        )}

        <motion.div
          className="card-body"
          style={{ width: degree.logo_path ? "90%" : "100%" }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div
            className="body-header"
            style={{ backgroundColor: theme.headerColor }}
          >
            <div className="body-header-title">
              <h2 className="card-title" style={{ color: theme.text }}>
                {degree.title}
              </h2>
              <h3 className="card-subtitle" style={{ color: theme.text }}>
                {degree.subtitle}
              </h3>
            </div>

            <div className="body-header-duration">
              <h3 className="duration" style={{ color: theme.text }}>
                {degree.duration}
              </h3>
            </div>
          </div>

          <div className="body-content">
            {degree.descriptions.map((sentence, index) => (
              <p
                key={index}
                className="content-list"
                style={{ color: theme.text }}
              >
                {sentence}
              </p>
            ))}

            {degree.website_link && (
              <a
                href={degree.website_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="visit-btn"
                  style={{ backgroundColor: theme.headerColor }}
                >
                  <p className="btn" style={{ color: theme.text }}>
                    Visit Website
                  </p>
                </div>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    );
  }
}

export default DegreeCard;