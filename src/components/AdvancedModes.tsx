import React from 'react';
import styled from 'styled-components';
import { useTickTackStore } from '../store/useTickTackStore';
import {
  LapList,
  LapListHeader,
  LapTable,
  LapRow,
} from '../styles/StyledComponents';


const ModesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;



const formatLapTime = (ms: number) => {
  if (typeof ms !== 'number' || isNaN(ms)) return '00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const AdvancedModes: React.FC = () => {

  const {
    mode,
    laps,
  } = useTickTackStore();



  return (
    <ModesWrapper>

      {mode === 'chronometer' && laps.length > 0 && (
        <LapList>
          <LapListHeader>
            <h2>Voltas</h2>
          </LapListHeader>
          <LapTable>
            {laps.map((lap) => (
              <LapRow key={lap.timestamp}>
                <span className="lap-number">Volta {lap.number}</span>
                <span className="lap-time">{formatLapTime(lap.time)}</span>
              </LapRow>
            ))}
          </LapTable>
        </LapList>
      )}


    </ModesWrapper>
  );
};

