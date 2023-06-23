import { GradientText, Section } from 'astro-boilerplate-components';
import emailjs from 'emailjs-com';

const sendEmail = async (name: string, email: string, subject: string, message: string) => {
  try {
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message
    };

    const response = await emailjs.send('service_8bujo2e', 'template_m0vmu8i', templateParams, 'VYleAPgg6IETjtvXE');
    console.log('Email sent successfully!', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  console.log('ggsefe')
  e.preventDefault();
  const form = e.currentTarget;

  const nameElement = form.elements.namedItem("name");
  const emailElement = form.elements.namedItem("email");
  const subjectElement = form.elements.namedItem("subject");
  const messageElement = form.elements.namedItem("message");

  if (
    nameElement instanceof HTMLInputElement &&
    emailElement instanceof HTMLInputElement &&
    subjectElement instanceof HTMLInputElement &&
    messageElement instanceof HTMLTextAreaElement
  ) {
    const name = nameElement.value;
    const email = emailElement.value;
    const subject = subjectElement.value;
    const message = messageElement.value;

    sendEmail(name, email, subject, message);

    form.reset();
  }
};




const CTA = () => (
  <Section>
    <form id="contact-form" className="max-w-md mx-auto" onSubmit={handleFormSubmit}>
      <h2 className="text-2xl mb-4">
        <GradientText>Me contacter</GradientText>
      </h2>
      <p className="mb-4">
        Vous pouvez me contacter via ce formulaire, je vous répondrai dans les plus brefs délais.
      </p>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">
          Nom :
        </label>
        <input type="text" id="name" name="name" required className="w-full px-4 py-2 rounded text-black" />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">
          E-mail :
        </label>
        <input type="email" id="email" name="email" required className="w-full px-4 py-2 rounded text-black" />
      </div>
      <div className="mb-4">
        <label htmlFor="subject" className="block mb-1">
          Sujet :
        </label>
        <input type="text" id="subject" name="subject" required className="w-full px-4 py-2 rounded text-black" />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block mb-1">
          Message :
        </label>
        <textarea id="message" name="message" required className="w-full px-4 py-2 rounded text-black"></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Envoyer
      </button>
    </form>
  </Section>
);

export { CTA };
