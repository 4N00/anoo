/// <reference types="@types/jest" />

import '@testing-library/jest-dom';
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R> extends jest.Matchers<R>, TestingLibraryMatchers<R, void> {}
  }
}