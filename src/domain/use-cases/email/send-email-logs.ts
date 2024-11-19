import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendEmailLogsUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}


export class SendEmailLogs implements SendEmailLogsUseCase {

    constructor(
        private readonly emailService: EmailService,
        private logRepository: LogRepository
    ) { }

    async execute(to: string | string[]): Promise<boolean> {
        try {
            const sent = this.emailService.sendEmailWithAttachments(to);

            if (!sent) {
                throw new Error('Email log not sent');
            }

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Log email sent',
                origin: 'send-email-logs.ts'
            });

            this.logRepository.saveLog(log);
            return true;
            
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `${error}`,
                origin: 'send-email-logs.ts'
            });

            this.logRepository.saveLog(log);
        }
        return true;
    }
}