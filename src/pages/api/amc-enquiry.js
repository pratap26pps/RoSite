import { sendAmcEnquiryEmail } from '../../lib/newmailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { name, email, address, message, mobile } = req.body;
  if (!name || !email || !address || !mobile) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || email,
      to: process.env.MAIL_AUTH || process.env.EMAIL_FROM,
      subject: 'New AMC Enquiry',
      text: `AMC Enquiry Details:\n\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nAddress: ${address}\nMessage: ${message || '-'}\n`,
      html: `<h2>AMC Enquiry Details</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Address:</b> ${address}</p>
        <p><b>Message:</b> ${message || '-'}</p>`
    };
    await sendAmcEnquiryEmail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log("error in amc",err)
    return res.status(500).json({ error: 'Failed to send email.' });
  }
} 