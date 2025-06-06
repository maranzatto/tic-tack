# TickTack - Multi-function Timer App | Aplicativo Multi-função de Tempo

[English](#english) | [Português](#português)

## English

A modern, minimalist React application that functions as a multi-purpose timer with counter, chronometer, countdown, and multi-counter modes. Built with TypeScript and featuring dynamic styling, audio alerts, and lap tracking.

### 🌟 Features

- **Four Mode Operation**
  - **Counter Mode**: Increment numbers with visual feedback (green for even numbers)
  - **Chronometer Mode**: Precise time tracking with pause/resume and lap recording
  - **Countdown Mode**: Set a target time and count down with alarm notification
  - **Multi-Counter Mode**: Create and manage multiple named counters with custom increments
  
- **Advanced Functionality**
  - Lap recording and display in Chronometer mode
  - Audio alarm when countdown reaches zero
  - Custom named counters with variable increment values
  - Persistent state management across mode changes
  
- **Visual Feedback**
  - Dynamic background based on app state
  - Green numbers for even values in counter mode
  - Clean, modern interface with SVG icons
  - Responsive design for all screen sizes
  
- **Accessibility**
  - Full keyboard navigation support
  - ARIA labels for screen readers
  - High contrast display
  - Descriptive button titles

### 🛠️ Technical Stack

- React 18
- TypeScript
- Styled Components
- Zustand (State Management)
- Web Audio API
- SVG Icons

### 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd tic-tack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

### 📱 Usage

- Click the navigation buttons to switch between the four modes

- **Counter Mode**:
  - Click "Incrementar" to add to the counter
  - Numbers turn green when even
  - Reset with the reset icon button

- **Chronometer Mode**:
  - Click "Iniciar/Parar" to control the timer
  - Add laps with the flag icon while running
  - Clear laps with the trash icon
  - Reset timer with the reset icon button

- **Countdown Mode**:
  - Set hours, minutes, and seconds
  - Click "Iniciar/Parar" to control the countdown
  - When countdown reaches zero, an alarm sounds
  - Stop the alarm with the "Parar Alarme" button
  - Reset with the reset icon button

- **Multi-Counter Mode**:
  - Create named counters with custom increment values
  - Increment each counter individually
  - Remove individual counters
  - Reset all counter values or delete all counters

---

## Português

Uma aplicação React moderna e minimalista que funciona como um temporizador multi-propósito com modos de contador, cronômetro, contagem regressiva e contadores múltiplos. Construída com TypeScript e com estilização dinâmica, alertas sonoros e registro de voltas.

### 🌟 Funcionalidades

- **Operação em Quatro Modos**
  - **Modo Contador**: Incrementa números com feedback visual (verde para números pares)
  - **Modo Cronômetro**: Controle preciso do tempo com pausa/retomada e registro de voltas
  - **Modo Contagem Regressiva**: Define um tempo alvo e faz contagem regressiva com alarme
  - **Modo Contadores Múltiplos**: Cria e gerencia múltiplos contadores nomeados com incrementos personalizados
  
- **Funcionalidades Avançadas**
  - Registro e exibição de voltas no modo Cronômetro
  - Alarme sonoro quando a contagem regressiva chega a zero
  - Contadores nomeados com valores de incremento variáveis
  - Gerenciamento de estado persistente entre mudanças de modo
  
- **Feedback Visual**
  - Números em verde quando pares no modo contador
  - Interface limpa e moderna com ícones SVG
  - Design responsivo para todos os tamanhos de tela
  
- **Acessibilidade**
  - Suporte completo à navegação por teclado
  - Labels ARIA para leitores de tela
  - Display com alto contraste
  - Títulos descritivos nos botões

### 🛠️ Stack Técnica

- React 18
- TypeScript
- Styled Components
- Zustand (Gerenciamento de Estado)
- Web Audio API
- Ícones SVG

### 🚀 Como Começar

1. **Clone o repositório**
   ```bash
   git clone [repository-url]
   cd tic-tack
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

### 📱 Como Usar

- Clique nos botões de navegação para alternar entre os quatro modos

- **Modo Contador**:
  - Clique em "Incrementar" para adicionar ao contador
  - Números ficam verdes quando são pares
  - Reinicie com o botão de ícone de reset

- **Modo Cronômetro**:
  - Clique em "Iniciar/Parar" para controlar o timer
  - Adicione voltas com o ícone de bandeira enquanto estiver em execução
  - Limpe as voltas com o ícone de lixeira
  - Reinicie o timer com o botão de ícone de reset

- **Modo Contagem Regressiva**:
  - Defina horas, minutos e segundos
  - Clique em "Iniciar/Parar" para controlar a contagem regressiva
  - Quando a contagem regressiva chega a zero, um alarme soa
  - Pare o alarme com o botão "Parar Alarme"
  - Reinicie com o botão de ícone de reset

- **Modo Contadores Múltiplos**:
  - Crie contadores nomeados com valores de incremento personalizados
  - Incremente cada contador individualmente
  - Remova contadores individuais
  - Reinicie todos os valores dos contadores ou exclua todos os contadores

## 🎨 Color Palette | Paleta de Cores

```
Background: #f8f9fa
Primary: #00b300 (vibrant green | verde vibrante)
Primary Dark: #009900
Primary Light: rgba(0, 179, 0, 0.1)
Text: #333 (dark gray | cinza escuro)
Text Light: #666
Card Background: #ffffff
Border: #eaeaea
Border Hover: #d0d0d0
Danger: #e74c3c (red for danger/delete | vermelho para perigo/exclusão)
Danger Dark: #c0392b
```

## 📝 License | Licença

This project is licensed under the MIT License - see the LICENSE file for details.
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.
