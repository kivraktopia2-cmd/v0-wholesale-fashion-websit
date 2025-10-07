"use server"

import { Resend } from "resend"

const resend = new Resend("re_irjyNQRk_BGCWAfBSJcwkAonAhuwSBiPJ")

export async function submitContactForm(formData: {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}) {
  try {
    console.log("[v0] Sending contact form email:", formData)

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "direnber@wp.pl",
      subject: formData.subject || "Nowa wiadomość z formularza kontaktowego",
      html: `
        <h2>Nowa wiadomość z formularza kontaktowego</h2>
        <p><strong>Imię i Nazwisko:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        ${formData.phone ? `<p><strong>Telefon:</strong> ${formData.phone}</p>` : ""}
        ${formData.subject ? `<p><strong>Temat:</strong> ${formData.subject}</p>` : ""}
        <p><strong>Wiadomość:</strong></p>
        <p>${formData.message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return {
        success: false,
        error: "Nie udało się wysłać wiadomości. Spróbuj ponownie.",
      }
    }

    console.log("[v0] Email sent successfully:", data)

    return {
      success: true,
      message: "Wiadomość została wysłana pomyślnie!",
    }
  } catch (error) {
    console.error("[v0] Error in submitContactForm:", error)
    return {
      success: false,
      error: "Wystąpił błąd podczas wysyłania wiadomości.",
    }
  }
}
