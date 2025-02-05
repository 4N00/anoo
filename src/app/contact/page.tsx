'use client';

import { useState } from "react";
import PageFooter from "../../components/PageFooter";
import { StyledButton } from "../../components/ui/StyledButton";
import { StyledInput, StyledTextarea } from "../../components/ui/StyledFormElements";
import {
  Container,
  Content,
  Header,
  Title,
  Subtitle,
  Form,
  InputGroup,
  ButtonGroup
} from '../../styles/ContactStyles';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Implement actual form submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Container>
        <Content>
          <Header>
            <Title>Let's Talk</Title>
            <Subtitle>
              Have a project in mind? We'd love to hear about it. Tell us what
              you're looking for and we'll get back to you.
            </Subtitle>
          </Header>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <StyledInput
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Name*"
                required
              />
              <StyledInput
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email*"
                required
              />
            </InputGroup>

            <StyledInput
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              placeholder="Subject*"
              required
            />

            <StyledTextarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Message*"
              required
            />

            <ButtonGroup>
              <StyledButton type="submit">Send Message</StyledButton>
            </ButtonGroup>
          </Form>
        </Content>
      </Container>
      <PageFooter />
    </>
  );
};

export default Contact;