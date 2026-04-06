import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.10";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, comment, captchaAnswer, captchaExpected } = await req.json();

    if (captchaAnswer !== captchaExpected) {
      return new Response(
        JSON.stringify({ error: 'Неверный ответ на капчу' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!phone || phone.trim().length < 5) {
      return new Response(
        JSON.stringify({ error: 'Введите номер телефона' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const smtpPassword = Deno.env.get('YANDEX_SMTP_PASSWORD');
    const emailAddress = 'Finomen-bg@yandex.ru';

    if (!smtpPassword) {
      console.error('Missing YANDEX_SMTP_PASSWORD');
      return new Response(
        JSON.stringify({ error: 'Ошибка конфигурации сервера' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const date = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

    const htmlBody = `
      <h2>🔔 Новая заявка с сайта</h2>
      <table style="border-collapse:collapse;font-size:15px;">
        <tr><td style="padding:8px;font-weight:bold;">👤 Имя:</td><td style="padding:8px;">${escapeHtml(name || 'Не указано')}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">📞 Телефон:</td><td style="padding:8px;">${escapeHtml(phone)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">💬 Комментарий:</td><td style="padding:8px;">${escapeHtml(comment || 'Не указан')}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">📅 Дата:</td><td style="padding:8px;">${date}</td></tr>
      </table>
    `;

    const transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: emailAddress,
        pass: smtpPassword,
      },
    });

    await transporter.sendMail({
      from: `"Финомен - Заявка" <${emailAddress}>`,
      to: emailAddress,
      subject: `Новая заявка с сайта — ${name || 'Без имени'}`,
      html: htmlBody,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Внутренняя ошибка сервера' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
