import { IoIosLink } from "react-icons/io";
import createIntersectionObserver from "../functions/createIntersectionObserver";
import { useEffect, useState } from "react";
import "../styles/ProjectsSection.css";

const PROJECTS_DATA = [
  {
    title: "Tu Farmacia Avanzada - E-Commerce",
    image: "/projects/tufarmaciavanzada.webp",
    url: "https://www.tufarmaciavanzada.com",
    description:
      'Sistema de comercio electronico desarrollado para la empresa "Tu Farmacia Avanzada", modulos de carrito de compras, panel administrativo y autenticación con Google.',
    tecnologies: ["Next.js", "Tailwind CSS", "MySQL", "Cloudinary"],
  },
  {
    title: "Generador de voz con IA",
    image: "/projects/test.png",
    url: "",
    description:
      "Proyecto donde podrás generar voces a partir de texto utilizando inteligencia artificial, más de 10 modelos de voces para elegir y finalmente poder descargar un audio .MP3 con el resultado.",
    tecnologies: ["Astro", "Tailwind CSS"],
  },
];

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
            {PROJECTS_DATA.map((item, i) => (
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
            style={{ backgroundImage: `url(${PROJECTS_DATA[sel].image})` }}
          ></div>
        </div>
      </div>
      <div className="project-data">
        <h3>{PROJECTS_DATA[sel].title}</h3>
        <a href={PROJECTS_DATA[sel].url} target="_blank">
          <span>Ir al sitio</span>
          <IoIosLink size={"15px"} className="url-icon" />
        </a>
        <p>{PROJECTS_DATA[sel].description}</p>
        <ul className="tecnologies">
          {PROJECTS_DATA[sel].tecnologies.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
