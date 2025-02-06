'use client';

import { useState } from 'react';
import { StyledButton } from '../../components/ui/StyledButton';
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
            and I'll get back to you in the next 48 hours.
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
            <StyledButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </StyledButton>
          </ButtonGroup>
        </Form>
      </Content>
    </Container>
  );
};

export default Contact;
