import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM,
      replyTo: email,
      subject: `Nouveau message de contact - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1f2937; color: white; padding: 20px; border-radius: 15px;">
          <div style="background: linear-gradient(135deg, #e87428, #ff9a3d); padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
            <h2 style="margin: 0; color: white;">Nouveau message de contact</h2>
          </div>
          
          <div style="background: #374151; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="color: #e87428; margin-top: 0;">Informations du contact</h3>
            <table style="width: 100%; color: white;">
              <tr>
                <td style="padding: 8px 0; width: 120px;"><strong>Nom:</strong></td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;">${email}</td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0;"><strong>Téléphone:</strong></td>
                <td style="padding: 8px 0;">${phone}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0;"><strong>Sujet:</strong></td>
                <td style="padding: 8px 0;">${subject}</td>
              </tr>
            </table>
          </div>

          <div style="background: #374151; padding: 20px; border-radius: 10px;">
            <h3 style="color: #e87428; margin-top: 0;">Message</h3>
            <div style="background: #4b5563; padding: 15px; border-radius: 5px; border-left: 4px solid #e87428;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #4b5563;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Ce message a été envoyé depuis le formulaire de contact de votre site Eventick.
            </p>
          </div>
        </div>
      `,
      text: `
Nouveau message de contact - ${subject}

Informations du contact:
Nom: ${name}
Email: ${email}
${phone ? `Téléphone: ${phone}` : ''}
Sujet: ${subject}

Message:
${message}

---
Ce message a été envoyé depuis le formulaire de contact de votre site Eventick.
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email envoyé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}