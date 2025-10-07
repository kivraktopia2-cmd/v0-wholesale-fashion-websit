"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { submitContactForm } from "@/app/kontakt/actions"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  })

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
    }

    let isValid = true

    if (formData.name.trim().length < 2) {
      newErrors.name = "Imię musi mieć co najmniej 2 znaki"
      isValid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Proszę podać prawidłowy adres email"
      isValid = false
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Wiadomość musi mieć co najmniej 10 znaków"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submission started")

    // Clear previous status
    setSubmitStatus(null)
    setErrorMessage("")

    // Validate form
    if (!validateForm()) {
      console.log("[v0] Form validation failed")
      return
    }

    setIsSubmitting(true)

    try {
      console.log("[v0] Calling submitContactForm action...")
      const result = await submitContactForm(formData)
      console.log("[v0] submitContactForm result:", result)

      if (result.success) {
        console.log("[v0] Form submitted successfully!")
        setSubmitStatus("success")
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
        setErrors({ name: "", email: "", message: "" })
        // Auto-hide success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000)
      } else {
        console.log("[v0] Form submission failed:", result.error)
        setSubmitStatus("error")
        setErrorMessage(result.error || "Wystąpił błąd podczas wysyłania wiadomości")
      }
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      setSubmitStatus("error")
      setErrorMessage("Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {submitStatus === "success" && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.
          </AlertDescription>
        </Alert>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{errorMessage}</AlertDescription>
        </Alert>
      )}

      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-base">
          Imię i Nazwisko <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Jan Kowalski"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={`h-12 ${errors.name ? "border-red-500" : ""}`}
          disabled={isSubmitting}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-base">
          Adres Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="jan.kowalski@example.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={`h-12 ${errors.email ? "border-red-500" : ""}`}
          disabled={isSubmitting}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-base">
          Numer Telefonu <span className="text-muted-foreground text-sm">(opcjonalnie)</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+48 123 456 789"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="h-12"
          disabled={isSubmitting}
        />
      </div>

      {/* Subject Field */}
      <div className="space-y-2">
        <Label htmlFor="subject" className="text-base">
          Temat <span className="text-muted-foreground text-sm">(opcjonalnie)</span>
        </Label>
        <Input
          id="subject"
          placeholder="Zapytanie o współpracę"
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          className="h-12"
          disabled={isSubmitting}
        />
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-base">
          Wiadomość <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Opisz swoją sprawę..."
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={`min-h-[150px] resize-y ${errors.message ? "border-red-500" : ""}`}
          disabled={isSubmitting}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full bg-[#8B1538] hover:bg-[#6B1028] text-white h-12"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Wysyłanie...
          </>
        ) : (
          "Wyślij Wiadomość"
        )}
      </Button>
    </form>
  )
}
