import nodemailer, { Transporter } from "nodemailer";


class EmailController {
    private transporter : Transporter;

    public constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: '',
            port: 587,
            auth: {
                user: 'anabelle.funk68@ethereal.email',
                pass: 'nQzsvD1Pa44brF5UzN'
            }
        });

        this.configure();
    }

    private configure() {
        console.log('configuring')
    };

    public async sendEmails() {
        // const users : Promise<User[]> = getUsers();
        // (await users).forEach((user) => {
        //     sendEmail(user.email);
        // });
        this.sendEmail('TEST SUBJECT');
    };

    private async sendEmail(email: string) {
        // await this.transporter.sendMail({
        //     from: 'anabelle.funk68@ethereal.email',
        //     to: 'anabelle.funk68@ethereal.email',
        //     subject: 'TESTIN MY API',
        //     text: 'TEST'
        // });
        console.log(`email sent to ${email}`)
    };
}

export default new EmailController();
