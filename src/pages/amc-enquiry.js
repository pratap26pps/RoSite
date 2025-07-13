import React, { useState } from 'react';

export default function AmcEnquiry() {
  const [form, setForm] = useState({ name: '', email: '', address: '', message: '', mobile: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    if (!form.name || !form.email || !form.address || !form.mobile) {
      setError('Please fill all required fields.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/amc-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Enquiry sent successfully!');
        setForm({ name: '', email: '', address: '', message: '', mobile: '' });
      } else {
        setError(data.error || 'Failed to send enquiry.');
      }
    } catch (err) {
      setError('Failed to send enquiry.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-20 px-2">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">AMC Enquiry Form</h2>
        {success && <div className="bg-green-100 text-green-800 px-4 py-2 rounded">{success}</div>}
        {error && <div className="bg-red-100 text-red-800 px-4 py-2 rounded">{error}</div>}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Name<span className="text-red-500">*</span></label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white" required />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Email<span className="text-red-500">*</span></label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white" required />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Address<span className="text-red-500">*</span></label>
          <input type="text" name="address" value={form.address} onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white" required />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Mobile<span className="text-red-500">*</span></label>
          <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white" required />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Message (optional)</label>
          <textarea name="message" value={form.message} onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white" rows={3} />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl transition disabled:opacity-60">
          {loading ? 'Sending...' : 'Send Enquiry'}
        </button>
      </form>
    </div>
  );
} 