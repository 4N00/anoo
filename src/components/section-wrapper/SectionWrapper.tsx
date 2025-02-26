'use client';

import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  width: 100%;
  position: relative;
`;

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  'data-cy'?: string;
}

const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ children, id, className, 'data-cy': dataCy }, ref) => (
    <Section ref={ref} id={id} className={className} data-cy={dataCy}>
      {children}
    </Section>
  )
);

SectionWrapper.displayName = 'SectionWrapper';

export default SectionWrapper; 