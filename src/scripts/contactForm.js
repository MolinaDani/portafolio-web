import swal from "sweetalert";
import JSConfetti from "js-confetti";

const form = document.querySelector("form");
const textarea = document.querySelector("form textarea");
const counter = document.querySelector(".characters-counter");

const confetti = new JSConfetti();

textarea.addEventListener("input", (e) => {
  counter.innerHTML = `${e.target.value.length}/500`;
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const loadingIcon = document.querySelector(".button-loading-icon");
  const sendIcon = document.querySelector(".button-icon");
  const buttonText = document.querySelector(".button-text");

  function changeFormState({ loading }) {
    if (loading) {
      buttonText.parentElement.setAttribute("disabled", "true");
    } else {
      buttonText.parentElement.removeAttribute("disabled");
    }

    sendIcon.setAttribute("style", `display: ${loading ? "none" : "inline"};`);
    loadingIcon.setAttribute(
      "style",
      `display: ${loading ? "block" : "none"};`,
    );
    buttonText.innerHTML = loading ? "Enviando..." : "Enviar";
  }

  try {
    changeFormState({ loading: true });
    const response = await fetch("/api/send_email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: formData.get("Nombre").toString(),
        userLastName: formData.get("Apellido").toString(),
        userEmail: formData.get("Email").toString(),
        userMessage: formData.get("Mensaje").toString(),
      }),
    });

    const data = await response.json();

    if (data.success) {
      confetti.addConfetti({
        confettiNumber: 300,
      });
      swal({
        title: "¡Gracias por contactarme!",
        text: "Tan pronto como pueda responderé tu mensaje.",
        icon: "success",
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    swal({
      title: "Ops!",
      text: "Lo siento... parece que algo ha salido mal.",
      icon: "error",
    });
  } finally {
    changeFormState({ loading: false });
  }
});
