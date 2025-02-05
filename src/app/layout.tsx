'use client';

import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProjectsProvider } from "../context/ProjectsContext";
import { ThemeProvider } from "../styles/theme";
import Navbar from "../components/Navbar";
import { styled } from "styled-components";

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

const MainContent = styled.main`
  padding-top: 64px;
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <ProjectsProvider>
              <Navbar />
              <MainContent>
                {children}
              </MainContent>
            </ProjectsProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
