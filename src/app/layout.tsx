import type { Metadata } from "next";
import "./globals.css";
import { StageContextProvider } from "./contexts/stageContext";
import { CharacterContextProvider } from "./contexts/characterContext";

export const metadata: Metadata = {
  title: "Jogo dos Patetas",
  description: "Jogos dos patetas por anddy-sam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-zinc-950"
      >
        <StageContextProvider>
          <CharacterContextProvider>
            {children}
          </CharacterContextProvider>
        </StageContextProvider>
      </body>
    </html>
  );
}
