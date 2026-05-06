function initContactForm() {
  const form = document.getElementById("contactForm");

  if (!form) return;

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyKAUlYwPk51R71KJ_f56xtjTKCUtiWs5dDt2UUh_Oigb2R0hXbmw-y6ea3af0q8RnmKA/exec";
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      status?.classList.remove("hidden");
      form.reset();
    } catch {
      alert("Error sending message");
    }
  });
}

initContactForm();
