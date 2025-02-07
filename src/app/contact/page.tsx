'use client';

import { useState } from 'react';
import { Button } from '@/styles/components/Button';
import { StyledInput, StyledTextarea } from '../../components/ui/StyledFormElements';
import {
  Container,
  Content,
  Header,
  Title,
  Subtitle,
  Form,
  InputGroup,
  ButtonGroup,
} from '../../styles/ContactStyles';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add form submission logic here
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Container>
      <Content>
        <Header>
          <Title>LET'S TALK</Title>
          <Subtitle>
            Have a project in mind? Looking to partner or work together? Reach out through the form
            and I'll get back to you.
          </Subtitle>
        </Header>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <StyledInput type="text" placeholder="Name" required />
            <StyledInput type="email" placeholder="Email" required />
          </InputGroup>
          <StyledInput type="text" placeholder="Subject" required />
          <StyledTextarea placeholder="Message" rows={6} required />
          <ButtonGroup>
            <Button type="submit" $variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </ButtonGroup>
        </Form>
      </Content>
    </Container>
  );
};

export default Contact;
