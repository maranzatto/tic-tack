import React from 'react'
import { Display } from '../styles/StyledComponents'
import type { Mode } from '../store/useTickTackStore'

interface DisplayNumberProps {
  value: number
  mode: Mode
}

export const DisplayNumber: React.FC<DisplayNumberProps> = ({ value, mode }) => {
  const formatTime = (ms: number) => {
    if (typeof ms !== 'number' || isNaN(ms)) return '00:00';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  const isEven = mode === 'counter' ? value % 2 === 0 : false
  const displayValue = ['chronometer', 'countdown'].includes(mode)
    ? formatTime(value)
    : value.toString()

  const getAriaLabel = () => {
    switch (mode) {
      case 'counter':
        return `Contador valor: ${value}`
      case 'chronometer':
        return `Cronômetro tempo: ${displayValue}`
      case 'countdown':
        return `Contagem regressiva: ${displayValue}`
      case 'multiCounter':
        return `Contador múltiplo: ${value}`
      default:
        return displayValue
    }
  }

  return (
    <Display 
      $isEven={isEven}
      role="timer"
      aria-label={getAriaLabel()}
    >
      {displayValue}
    </Display>
  )
}
