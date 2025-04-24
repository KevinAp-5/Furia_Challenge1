import React, { ReactNode, createContext, useContext } from 'react';

export const theme = {
  colors: {
    background: '#F5F5F5', // Fundo claro
    // primary: '#333333', // Texto principal escuro
    primary: '#000000',
    secondary: '#6200EE', // Roxo vibrante para botões e destaques
    accent: '#03DAC6', // Verde água para elementos de destaque
    highlight: '#BB86FC', // Roxo claro para botões secundários
    muted: '#888888', // Texto secundário
    card: '#FFFFFF', // Cartões brancos
  },
  fonts: {
    regular: 'System',
    bold: 'System',
  },
};

export const ThemeContext = createContext(theme);
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};