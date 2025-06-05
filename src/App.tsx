import React, { useEffect, useState } from 'react'
import { 
  GlobalStyle, 
  AppWrapper,
  Container, 
  Header, 
  Logo,
  NavContainer,
  NavButton,
  MainContent,
  Card,
  Title,
  ButtonContainer, 
  ActionButton, 
  ResetButton,
  Footer,
  LapButtonContainer,
  LapButton,
  InputGroup,
  
  SectionTitle,
  CounterGrid,
  CounterCard,
  EmptyState
} from './styles/StyledComponents'
import { PlayIcon, PauseIcon, ResetIcon, FlagIcon, TrashIcon, PlusIcon } from './components/Icons'
import './App.css'
import { DisplayNumber } from './components/DisplayNumber'
import { AdvancedModes } from './components/AdvancedModes'
import type { Mode } from './store/useTickTackStore'
import { useTickTackStore } from './store/useTickTackStore'
import { useRef } from 'react' // Add useRef

const MODES: { value: Mode; label: string }[] = [
  { value: 'counter', label: 'Contador' },
  { value: 'chronometer', label: 'Cronômetro' },
  { value: 'countdown', label: 'Contagem Regressiva' },
  { value: 'multiCounter', label: 'Contadores Múltiplos' }
]

const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startTimeRef = useRef<number>(0);
  const requestRef = useRef<number>();
  const targetTimeRef = useRef<number>(0);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState<boolean>(false);

  useEffect(() => {
    audioRef.current = new Audio('/alarme.mp4.mp4');
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.addEventListener('error', (e) => {
        console.error('Error loading audio:', e);
      });
    }
  }, []);

  const [counterName, setCounterName] = useState('');
  const [counterIncrement, setCounterIncrement] = useState(1);
  const {
    mode,
    count,
    isRunning,
    increment,
    reset,
    toggleRunning,
    setMode,
    setCount,
    laps,      
    addLap,    
    clearLaps,  
    targetTime, 
    setTargetTime, 
    counters,
    addCounter,
    incrementCounter,
    removeCounter, 
    resetCountersValues 
  } = useTickTackStore()

  useEffect(() => {
    if (mode === 'countdown' && useTickTackStore.getState().targetTime) {
      targetTimeRef.current = useTickTackStore.getState().targetTime || 0;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const now = Date.now();

      if (mode === 'chronometer') {
        const newCount = now - startTimeRef.current;
        setCount(newCount);
      } else if (mode === 'countdown') {
        const elapsed = now - startTimeRef.current;
        const newCount = Math.max(0, targetTimeRef.current - elapsed);
        setCount(newCount);
        if (newCount === 0) {
          toggleRunning();
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            
            try {
              const playPromise = audioRef.current.play();
              setIsAlarmPlaying(true);
              
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    console.log('Audio is playing');
                    setIsAlarmPlaying(true);
                  })
                  .catch(error => {
                    console.error("Error playing sound:", error);
                    setIsAlarmPlaying(false);

                  });
              }
            } catch (error) {
              console.error("Exception playing sound:", error);
              setIsAlarmPlaying(false);
            }
          }
        }
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    if (isRunning) {
      if (mode === 'chronometer') {
        startTimeRef.current = Date.now() - count;
      } else if (mode === 'countdown') {
        targetTimeRef.current = useTickTackStore.getState().targetTime || 0; 
        startTimeRef.current = Date.now() - (targetTimeRef.current - count);
      }
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      startTimeRef.current = 0;
      if (mode === 'countdown' && audioRef.current && !audioRef.current.paused && count > 0) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isRunning, mode, count, setCount, toggleRunning]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isRunning) {
        const now = Date.now();
        if (mode === 'chronometer') {
          const newCount = now - startTimeRef.current;
          setCount(newCount);
        } else if (mode === 'countdown') {
          const currentTargetTime = useTickTackStore.getState().targetTime || 0;
          const elapsedSinceStart = now - startTimeRef.current;
          const newCount = Math.max(0, currentTargetTime - elapsedSinceStart);
          setCount(newCount);
          if (newCount === 0 && isRunning) { 
            toggleRunning();
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isRunning, mode, setCount, toggleRunning]);

  const handleAddCounter = () => {
    if (counterName.trim()) {
      addCounter(counterName, counterIncrement);
      setCounterName('');
      setCounterIncrement(1);
    }
  };

  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsAlarmPlaying(false);
    }
  };

  const handleReset = () => {
    stopAlarm();
    reset();
    clearLaps();
  };

  const handleModeChange = (newMode: Mode) => {
    if (audioRef.current && !audioRef.current.paused) {
      stopAlarm();
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (mode !== newMode) {
      setMode(newMode)
    }
  }

  const renderMainContent = () => {
    if (mode === 'counter') {
      return (
        <>
          <Card>
            <Title>Contador</Title>
            <DisplayNumber value={count} mode={mode} />
            <ButtonContainer>
              <ActionButton onClick={increment}>
                Incrementar
              </ActionButton>
              <ResetButton onClick={handleReset} title="Zerar Contador">
                <ResetIcon />
              </ResetButton>
            </ButtonContainer>
          </Card>
        </>
      )
    }

    if (mode === 'chronometer') {
      return (
        <>

          <LapButtonContainer>
            <LapButton onClick={addLap} disabled={!isRunning || laps.find(lap => lap.time === count) !== undefined} $variant="primary" title="Adicionar Volta">
              <FlagIcon />
            </LapButton>
            <LapButton onClick={clearLaps} disabled={laps.length === 0} title="Limpar Voltas">
              <TrashIcon />
            </LapButton>
          </LapButtonContainer>

          <Card>
            <Title>Cronômetro</Title>
            <DisplayNumber value={count} mode={mode} />
            <ButtonContainer>
              <ActionButton onClick={toggleRunning}>
                {isRunning ? 'Parar' : 'Iniciar'}
              </ActionButton>
              <ResetButton onClick={handleReset} title="Reiniciar Cronômetro">
                <ResetIcon />
              </ResetButton>
            </ButtonContainer>
          </Card>
          <AdvancedModes />
        </>
      )
    }

    if (mode === 'countdown') {
      return (
        <>
          <Card>
            <Title>Contagem Regressiva</Title>
            <DisplayNumber value={count} mode={mode} />
            {isAlarmPlaying && (
              <div style={{ marginTop: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
                <ResetButton onClick={stopAlarm} $variant="danger" title="Parar Alarme">
                  <TrashIcon /> Parar Alarme
                </ResetButton>
              </div>
            )}
            <InputGroup style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              <label htmlFor="countdown-time">Tempo (segundos):</label>
              <input
                id="countdown-time"
                type="number"
                min="1"
                placeholder="Ex: 60"
                value={targetTime ? Math.floor(targetTime / 1000) : ''}
                onChange={(e) => setTargetTime(Math.max(1, parseInt(e.target.value, 10) || 0))}
                disabled={isRunning}
              />
            </InputGroup>
            <ButtonContainer>
              <ActionButton onClick={toggleRunning}>
                {isRunning ? 'Parar' : 'Iniciar'}
              </ActionButton>
              <ResetButton onClick={handleReset} title="Reiniciar Contagem Regressiva">
                <ResetIcon />
              </ResetButton>
            </ButtonContainer>
          </Card>

        </>
      )
    }

    return (
      <Card>
        <Title>Contadores Múltiplos</Title>

        <SectionTitle>Adicionar Novo Contador</SectionTitle>
        <InputGroup style={{ marginBottom: '0.5rem' }}>
          <label htmlFor="counter-name">Nome do Contador:</label>
          <input
            id="counter-name"
            type="text"
            placeholder="Ex: Cafés Bebidos"
            value={counterName}
            onChange={(e) => setCounterName(e.target.value)}
          />
        </InputGroup>
        <InputGroup style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
          <label htmlFor="counter-increment">Incremento:</label>
          <input
            id="counter-increment"
            type="number"
            min="1"
            value={counterIncrement}
            onChange={(e) => setCounterIncrement(Math.max(1, parseInt(e.target.value, 10) || 1))}
          />
        </InputGroup>
        <ActionButton onClick={handleAddCounter} style={{ width: '100%', marginBottom: '2rem' }}>
          <PlusIcon /> Adicionar Contador
        </ActionButton>

        {counters.length > 0 ? (
          <>
            <SectionTitle>Meus Contadores</SectionTitle>
            <CounterGrid>
              {counters.map((counter) => (
                <CounterCard key={counter.id}>
                  <h3>{counter.name}</h3>
                  <div className="value">{counter.value}</div>
                  <div className="increment-info">Incremento: {counter.increment}</div>
                  <ButtonContainer style={{ marginTop: '10px', justifyContent: 'space-between' }}>
                    <ActionButton 
                      onClick={() => incrementCounter(counter.id)} 
                      style={{ flexGrow: 1, marginRight: '5px', padding: '8px 10px' }} // Adjusted padding
                      title={`Incrementar ${counter.name}`}
                    >
                      <PlusIcon />
                    </ActionButton>
                    <ActionButton 
                      onClick={() => removeCounter(counter.id)} 
                      $variant="danger" // Changed to $variant to match styled-component prop
                      style={{ flexGrow: 1, marginLeft: '5px', padding: '8px 10px' }} // Adjusted padding
                      title={`Remover ${counter.name}`}
                    >
                      <TrashIcon />
                    </ActionButton>
                  </ButtonContainer>
                </CounterCard>
              ))}
            </CounterGrid>
            <ButtonContainer style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <ResetButton onClick={resetCountersValues} style={{ flex: 1 }} title="Zerar Valores dos Contadores">
                <ResetIcon /> Zerar Valores
              </ResetButton>
              <ResetButton onClick={handleReset} $variant="danger" style={{ flex: 1 }}>
                <TrashIcon /> Apagar Todos
              </ResetButton>
            </ButtonContainer>
          </>
        ) : (
          <EmptyState style={{ marginTop: '1rem' }}>
            <p>Nenhum contador adicionado ainda.</p>
            <p>Use o formulário acima para criar seu primeiro contador!</p>
          </EmptyState>
        )}
      </Card>
    );
  }

  return (
    <AppWrapper>
      <GlobalStyle />
      <Header>
        <Logo>TickTack</Logo>
        <NavContainer>
          {MODES.map(({ value, label }) => (
            <NavButton
              key={value}
              onClick={() => handleModeChange(value)}
              $active={mode === value}
            >
{label}
            </NavButton>
          ))}
        </NavContainer>
      </Header>
      
      <Container $mode={mode} $isRunning={isRunning}>
        <MainContent>
          {renderMainContent()}
        </MainContent>
        
        <Footer>
          <p>TickTack &copy; {new Date().getFullYear()}</p>
        </Footer>
      </Container>
    </AppWrapper>
  )
}

export default App
