'use client';

import { generateWebPageSchema } from '@/lib/schema';
import { siteConfig } from '@/config/metadata';
import ContactForm from '@/components/contact/ContactForm';
import ContactLavaLamp from '@/components/lava-lamp/ContactLavaLamp';
import { ContactContainer } from './styles';

const Contact = () => {
  return (
    <ContactContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateWebPageSchema(
              'Contact Anoo - Get in Touch',
              'Contact Anoo for web development projects and collaborations',
              `${siteConfig.url}/contact`
            )
          )
        }}
      />
      <ContactLavaLamp />
      <ContactForm />
    </ContactContainer>
  );
};

export default Contact;
