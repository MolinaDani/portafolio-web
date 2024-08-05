import { IoIosLink } from "react-icons/io";
import createIntersectionObserver from "@/functions/createIntersectionObserver.js";
import { useEffect, useState } from "react";
import "@/styles/ProjectsSection.css";
import data from "@/static/projects_data.json";

export default function ProjectsSection() {
  const [sel, setSel] = useState(0);

  function handleChange(index) {
    const dataContainer = document.querySelector(".project-data");
    const imageContainer = document.querySelector(".image-container");

    dataContainer.classList.add("is-change");
    imageContainer.classList.add("is-change");

    setTimeout(() => {
      setSel(index);
      dataContainer.classList.remove("is-change");

      setTimeout(() => {
        imageContainer.classList.remove("is-change");
      }, 300);
    }, 200);
  }

  useEffect(() => {
    const observer = createIntersectionObserver({
      threshold: 0.9,
      rootMargin: "0px",
    });

    observer.observe(document.querySelector(".projects-container"));
    observer.observe(document.querySelector(".project-data"));
  }, []);

  return (
    <section id="projects">
      <h2>Proyectos:</h2>

      <div className="projects-container">
        <div className="projects-list">
          <ul>
            {data.map((item, i) => (
              <li
                key={i}
                className={`${sel === i ? "selected" : ""}`}
                onClick={() => handleChange(i)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="image-container">
          <div
            className="project-image"
            style={{ backgroundImage: `url(${data[sel].image})` }}
          ></div>
        </div>
      </div>
      <div className="project-data">
        <h3>{data[sel].title}</h3>
        <a href={data[sel].url} target="_blank">
          <span>{data[sel].url}</span>
          <IoIosLink size={"15px"} className="url-icon" />
        </a>
        <p>{data[sel].description}</p>
        <ul className="tecnologies">
          {data[sel].technologies.map((item, i) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
