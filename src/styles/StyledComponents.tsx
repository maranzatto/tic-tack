import styled, { createGlobalStyle, css } from 'styled-components'
import type { Mode } from '../store/useTickTackStore'

//=============================================================================
// GLOBAL STYLES
//=============================================================================

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #f8f9fa;
    color: #333;
    line-height: 1.5;
    min-height: 100vh;
    overflow-x: hidden;
    width: 100%;
  }

  :root {
    --primary: #00b300;
    --primary-dark: #009900;
    --primary-light: rgba(0, 179, 0, 0.1);
    --text: #333;
    --text-light: #666;
    --background: #f8f9fa;
    --card-bg: #ffffff;
    --border: #eaeaea;
    --border-hover: #d0d0d0;
    --shadow: rgba(0, 0, 0, 0.05);
    --shadow-hover: rgba(0, 0, 0, 0.1);
    --radius: 16px;
    --header-height: 70px;
    --footer-height: 60px;
    --modal-overlay: rgba(0, 0, 0, 0.5);
    --input-bg: #ffffff;
    --input-text: #333333;
    --input-border: #dddddd;

    --danger-color: #e74c3c;
    --danger-color-dark: #c0392b;
  }
`

//=============================================================================
// LAYOUT COMPONENTS
//=============================================================================

interface ContainerProps {
  $mode: Mode
  $isRunning: boolean
}

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background-color: var(--card-bg);
  box-shadow: 0 2px 10px var(--shadow);
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "⏱";
  }
`

export const NavContainer = styled.nav`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--card-bg);
    padding: 0.75rem 1rem;
    box-shadow: 0 -2px 10px var(--shadow);
    justify-content: space-around;
    height: var(--footer-height);
    z-index: 100;
  }
`

//=============================================================================
// NAVIGATION COMPONENTS
//=============================================================================

export const NavButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  background: ${props => props.$active ? 'var(--primary-light)' : 'transparent'};
  border: none;
  border-radius: var(--radius);
  color: ${props => props.$active ? 'var(--primary)' : 'var(--text)'};
  font-weight: ${props => props.$active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  outline: none;

  &:hover {
    background: var(--primary-light);
  }

  &:focus-visible {
  }

  @media (max-width: 768px) {
    flex: 1;
    font-size: 0.9rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;

    &::before {
      content: ${props => {
        switch (props.children) {
          case 'Contador': return '"🔢"';
          case 'Cronômetro': return '"⏱"';
          case 'Contagem Regressiva': return '"⏲"';
          case 'Contadores Múltiplos': return '"📊"';
          default: return '""';
        }
      }};
      font-size: 1.2rem;
    }
  }
`

export const Container = styled.div<ContainerProps>`
  flex: 1;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: calc(var(--header-height) + 1rem) 1rem 2rem;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    padding: calc(var(--header-height) + 1rem) 1rem calc(var(--footer-height) + 1rem);
  }
`

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const Card = styled.div`
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: 0 4px 20px var(--shadow);
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  transition: all 0.3s ease;
  text-align: center;
  margin-bottom: 1.5rem;

  &:hover {
    box-shadow: 0 6px 24px var(--shadow-hover);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 100%;
  }
`

//=============================================================================
// TYPOGRAPHY COMPONENTS
//=============================================================================

export const Title = styled.h1`
  color: var(--text);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
`

//=============================================================================
// DISPLAY COMPONENTS
//=============================================================================

export const DisplayContainer = styled.div`
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px var(--shadow);
  width: 100%;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px var(--shadow-hover);
  }
`

export const Display = styled.div<{ $isEven: boolean }>`
  font-size: 4rem;
  font-weight: 700;
  color: ${({ $isEven }) => ($isEven ? 'var(--primary)' : 'var(--text)')};
  transition: color 0.3s ease;
  text-shadow: ${({ $isEven }) => 
    $isEven ? '0 0 10px var(--primary-light)' : 'none'};
  letter-spacing: -1px;
  font-variant-numeric: tabular-nums;
  
  @media (min-width: 992px) {
    font-size: 5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  width: 100%;
  margin: 1.5rem 0;
`

//=============================================================================
// BUTTON COMPONENTS
//=============================================================================

const baseButtonStyles = css`
  padding: 1rem;
  border: none;
  border-radius: var(--radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

interface ActionButtonProps {
  $variant?: 'primary' | 'danger';
}

export const ActionButton = styled.button<ActionButtonProps>`
  ${baseButtonStyles}
  background-color: ${({ $variant }) => 
    $variant === 'danger' ? 'var(--danger-color)' : 'var(--primary)'};
  color: white;

  &:hover:not(:disabled) {
    background-color: ${({ $variant }) => 
      $variant === 'danger' ? 'var(--danger-color-dark)' : 'var(--primary-dark)'};
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`

export const ModeButton = styled.button`
  ${baseButtonStyles}
  background-color: var(--card-bg);
  border: 2px solid var(--border);
  color: var(--text);

  &:hover:not(:disabled) {
    border-color: var(--border-hover);
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: var(--primary-light);
    border-color: var(--primary);
    color: var(--primary);
    opacity: 1;
  }
`

interface ResetButtonProps {
  $variant?: 'default' | 'danger';
}

export const ResetButton = styled.button<ResetButtonProps>`
  ${baseButtonStyles}
  // If ResetButton is used in ButtonContainer, ButtonContainer might handle spacing.
  // For now, let's assume it might be used elsewhere or rely on ButtonContainer's gap.

  background-color: ${({ $variant }) => $variant === 'danger' ? 'var(--danger-color)' : 'var(--card-bg)'};
  border: 2px solid ${({ $variant }) => $variant === 'danger' ? 'var(--danger-color)' : 'var(--border)'};
  color: ${({ $variant }) => $variant === 'danger' ? 'white' : 'var(--text)'};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    ${({ $variant }) => $variant === 'danger'
      ? css`
          background-color: var(--danger-color-dark);
          border-color: var(--danger-color-dark);
        `
      : css`
          border-color: var(--primary);
          background-color: var(--primary-light);
        `}
  }
`

export const ConfigButton = styled.button`
  ${baseButtonStyles}
  background-color: var(--background);
  border: 2px solid var(--border);
  color: var(--text);
  margin-top: 1rem;

  &:hover:not(:disabled) {
    border-color: var(--primary);
    background-color: var(--primary-light);
    transform: translateY(-2px);
  }
`

//=============================================================================
// MODAL COMPONENTS
//=============================================================================

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--modal-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`

export const ModalContent = styled.div`
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: modalFadeIn 0.3s ease;

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 95%;
  }
`

//=============================================================================
// FORM COMPONENTS
//=============================================================================

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text-light);
    font-size: 0.9rem;
    text-align: left; // Align label text to the left
  }

  input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--input-border);
    border-radius: var(--radius, 8px); // Using var(--radius) for consistency or a defined small radius
    background-color: var(--input-bg);
    color: var(--input-text);
    box-sizing: border-box;
    font-size: 1rem;
    transition: border-color 0.2s ease;
    font-family: 'Poppins', sans-serif;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--text-light);
      opacity: 0.7;
    }

    &:disabled {
      background-color: var(--background); // Lighter background when disabled
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--border);
  padding-bottom: 1rem;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text);
  }
`

//=============================================================================
// UTILITY COMPONENTS
//=============================================================================

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-light);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--border);
  }

  &:focus {
    outline: none;
  }
`

export const Footer = styled.footer`
  text-align: center;
  padding: 1.5rem 0;
  color: var(--text-light);
  font-size: 0.9rem;
  width: 100%;
  border-top: 1px solid var(--border);
  margin-top: auto;
  
  @media (max-width: 768px) {
    margin-bottom: var(--footer-height);
  }
`

//=============================================================================
// LAP COMPONENTS
//=============================================================================

export const LapButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 100%;
  }
`

export const LapList = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 2rem auto 0;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`

export const LapListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text);
  }
`

export const LapTable = styled.div`
  width: 100%;
  border: 2px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  max-height: 400px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--background);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 4px;
  }
`

export const LapRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 2px solid var(--border);
  
  &:last-child {
    border-bottom: none;
  }
  
  .lap-number {
    font-weight: 600;
    color: var(--primary);
  }
  
  .lap-time {
    font-family: monospace;
    font-size: 1.2rem;
    color: var(--text-light);
  }
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--text-light);
  border: 2px dashed var(--border);
  border-radius: var(--radius);
  
  p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
`

export const LapButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  ${baseButtonStyles}
  background-color: ${props => props.$variant === 'primary' ? 'var(--primary)' : 'var(--card-bg)'};
  border: 2px solid ${props => props.$variant === 'primary' ? 'var(--primary)' : 'var(--border)'};
  color: ${props => props.$variant === 'primary' ? 'white' : 'var(--text)'};
  min-width: 180px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    background: ${props => props.$variant === 'primary' ? 'var(--primary-dark)' : 'var(--background)'};
    border-color: ${props => props.$variant === 'primary' ? 'var(--primary-dark)' : 'var(--border-hover)'};
  }

  &:focus {
    outline: none;
  }
`

//=============================================================================
// MULTI-COUNTER COMPONENTS
//=============================================================================

export const SectionTitle = styled.h2`
  color: var(--text);
  font-size: 1.2rem; // Consistent with other section titles if this is a new one
  font-weight: 600;
  margin-top: 1.5rem; // Spacing within the main card
  margin-bottom: 1rem;
  text-align: center;
`;

export const CounterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
  width: 100%;
`;

export const CounterCard = styled.div`
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.75rem;
  box-shadow: var(--shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.0rem;
    font-weight: 600;
    color: var(--text);
    word-break: break-word;
  }

  .value {
    font-size: 1.6rem;
    font-weight: bold;
    color: var(--primary);
    margin: 0.5rem 0;
  }

  .increment-info {
    font-size: 0.8rem;
    color: var(--text-light);
    margin-bottom: 0.5rem;
  }


`;

