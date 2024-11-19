import { CheckService } from "../domain/use-cases/checks/check-service"
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.imple";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email-service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);
const emailService = new EmailService();


export class Server {
    static start() {
        console.log('Running server...')
        //TODO: Send email
        //const emailServiceUseCase = new SendEmailLogs(emailService, fileSystemLogRepository);
        //emailServiceUseCase.execute('chavarriamontoyaaxel@gmail.com');
        // emailService.sendEmailWithAttachments('chavarriamontoyaaxel@gmail.com');

        // emailService.sendEmail({
        //     to: 'chavarriamontoyaaxel@gmail.com',
        //     subject: 'Logs de sistema-PRUEBA',
        //     htmlBody: `
        //         <h3>NOC-Logs de sistema-PRUEBA</h3>
        //         <p>esto es una prueba de envío de correo electrónico</p>
        //         <p>ver adjuntos</p>
        //     `
        // });

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com'
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${url} is OK`),
        //             (error) => console.error(error)
        //         ).execute(url)
        //     }
        // )
    }
}