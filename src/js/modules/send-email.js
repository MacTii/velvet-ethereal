import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export function initSendEmailForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      phone: contactForm.phone.value.trim(),
      message: contactForm.message.value.trim(),
    };

    try {
      toastr.info("Wysyłanie wiadomości...");

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toastr.success(response.message || "Wiadomość została wysłana!");
        contactForm.reset();
      } else {
        toastr.error(response.error || "Błąd podczas wysyłania wiadomości!");
      }
    } catch (error) {
      toastr.error("Błąd wysyłki, sprawdź połączenie.");
      console.error(error);
    }
  });
}
