import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/themeConfig';
import { FormGroup, FormRow, FormLabel, FormError, FormActions } from './styles';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('FormElements', () => {
  it('renders FormGroup correctly', () => {
    const { container } = renderWithTheme(
      <FormGroup>
        <div>Test Content</div>
      </FormGroup>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders FormRow correctly', () => {
    const { container } = renderWithTheme(
      <FormRow>
        <div>Column 1</div>
        <div>Column 2</div>
      </FormRow>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders FormLabel correctly', () => {
    const labelText = 'Test Label';
    const { getByText } = renderWithTheme(
      <FormLabel>{labelText}</FormLabel>
    );
    expect(getByText(labelText)).toBeInTheDocument();
  });

  it('renders FormError correctly', () => {
    const errorText = 'Test Error';
    const { getByText } = renderWithTheme(
      <FormError>{errorText}</FormError>
    );
    expect(getByText(errorText)).toBeInTheDocument();
  });

  it('renders FormActions correctly', () => {
    const { container } = renderWithTheme(
      <FormActions>
        <button>Cancel</button>
        <button>Submit</button>
      </FormActions>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
}); 