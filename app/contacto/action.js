import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

export default async function action(formData) {
    console.log('formData', formData.get('recaptcha'));
    try {
        await emailjs.send(
            'service_4549nts',
            'template_drvaqds',
            {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
                tel: formData.get('tel'),
                'g-recaptcha-response': formData.get('recaptcha'),
            },
            {
                publicKey: 'eBXA-8jwUxc33exZ9',
            },
        );
        console.log('SUCCESS!');
    } catch (err) {
        if (err instanceof EmailJSResponseStatus) {
            console.log('EMAILJS FAILED...', err);
            return;
        }

        console.log('ERROR', err);
    }
}
