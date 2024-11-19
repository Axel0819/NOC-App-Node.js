import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[]
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_MAIL,
            pass: envs.MAILER_SECRET_KEY
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    async sendEmail(options: SendEmailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;
        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });

            return true;

        } catch (error) {
            return false;
        }
    }

    async sendEmailWithAttachments(to: string | string[]) {
        const subject = 'Logs de sistema-PRUEBA';
        const htmlBody = `
                <h3>NOC-Logs de sistema-PRUEBA</h3>
                <p>esto es una prueba de envío de correo electrónico</p>
                <p>ver adjuntos</p>
            `;

        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
        ];

        return this.sendEmail({
            to: to,
            subject: subject,
            htmlBody: htmlBody,
            attachments: attachments
        })
    }
}