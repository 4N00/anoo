'use client';

import { generateWebPageSchema } from '@/lib/schema';
import { siteConfig } from '@/config/metadata';
import ContactForm from '@/components/contact/ContactForm';

const Contact = () => {
  return (
    <>
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
      <ContactForm />
    </>
  );
};

export default Contact;
