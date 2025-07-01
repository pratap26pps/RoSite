import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

     
    console.log("Form submitted:", form);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen  py-20 px-4 bg-white text-black">
      <h1 className="text-3xl font-bold text-center mb-6">Get in Touch</h1>

      {submitted ? (
        <div className="text-center text-green-600 font-semibold">
          ✅ Thanks for contacting us! We’ll get back to you shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            name="message"
            placeholder="What product are you interested in?"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
