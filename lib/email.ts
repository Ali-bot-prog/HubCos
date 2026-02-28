import nodemailer from 'nodemailer';

export const sendContactEmail = async (data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL_TO } = process.env;

  // Çevre değişkenleri tanımlı değilse e-posta gönderimini iptal et (hata fırlatma ki DB kaydı devam etsin)
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL_TO) {
    console.warn('SMTP ayarları eksik. E-posta gönderilmedi. Lütfen .env dosyanızı kontrol edin.');
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // 465 ise true, 587 ise false
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1a202c; color: #ffffff; padding: 20px; text-align: center;">
          <h2 style="margin: 0; color: #C5A059;">Yeni İletişim Formu Mesajı</h2>
        </div>
        <div style="padding: 20px; background-color: #f8fafc;">
          <p><strong>Gönderen:</strong> ${data.name}</p>
          <p><strong>E-Posta:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Telefon:</strong> ${data.phone || 'Belirtilmedi'}</p>
          <p><strong>Konu:</strong> ${data.subject}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <h3 style="margin-top: 0; color: #475569;">Mesaj Detayı:</h3>
          <p style="white-space: pre-wrap; color: #334155; line-height: 1.6;">${data.message}</p>
        </div>
        <div style="background-color: #e2e8f0; color: #64748b; padding: 10px; text-align: center; font-size: 12px;">
          Bu e-posta HubCos web sitesi iletişim formundan otomatik olarak gönderilmiştir.
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"HubCos Web" <${SMTP_USER}>`,
      to: CONTACT_EMAIL_TO, // info@hubyapı.com
      replyTo: data.email,
      subject: `[${data.subject}] ${data.name} kişisinden yeni mesaj`,
      html: htmlContent,
    });

    console.log('E-posta başarıyla gönderildi: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    return false;
  }
};
