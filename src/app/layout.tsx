'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "../components/ui/tooltip";
import { ProjectsProvider } from "../context/ProjectsContext";
import { ThemeProvider } from "../styles/theme";
import Navbar from "../components/Navbar";
import { styled } from "styled-components";

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
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <ProjectsProvider>
              <TooltipProvider>
                <Navbar />
                <MainContent>
                  {children}
                </MainContent>
              </TooltipProvider>
            </ProjectsProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
