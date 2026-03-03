import React from 'react';
import { setPerformanceLevel, PERFORMANCE_LEVEL } from '../../../animations/utils/performanceDetector';
import styles from './AnimationSettings.module.css';

const AnimationSettings = () => {
  const [level, setLevel] = React.useState(
    localStorage.getItem('mayaverse_performance_level') || 'high'
  );

  const handleChange = (newLevel) => {
    setPerformanceLevel(newLevel);
    setLevel(newLevel);
    window.location.reload(); // Reload to apply changes
  };

  return (
    <div className={styles.settingsPanel}>
      <h3>Animation Quality</h3>
      <div className={styles.options}>
        <button
          className={level === PERFORMANCE_LEVEL.HIGH ? styles.active : ''}
          onClick={() => handleChange(PERFORMANCE_LEVEL.HIGH)}
        >
          High Quality
        </button>
        <button
          className={level === PERFORMANCE_LEVEL.MEDIUM ? styles.active : ''}
          onClick={() => handleChange(PERFORMANCE_LEVEL.MEDIUM)}
        >
          Balanced
        </button>
        <button
          className={level === PERFORMANCE_LEVEL.LOW ? styles.active : ''}
          onClick={() => handleChange(PERFORMANCE_LEVEL.LOW)}
        >
          Performance Mode
        </button>
      </div>
    </div>
  );
};

export default AnimationSettings;