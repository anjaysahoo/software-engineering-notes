import { useState, useEffect } from 'react'
import './App.css'

// Default configuration values
const DEFAULT_CONFIG = {
  activeMolesCount: 1,
  moleInterval: 1500,
  gameTime: 15
}

const WhackAMole = ({ 
  activeMolesCount = DEFAULT_CONFIG.activeMolesCount,
  moleInterval = DEFAULT_CONFIG.moleInterval,
  gameTime = DEFAULT_CONFIG.gameTime 
}) => {
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(gameTime)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeMoles, setActiveMoles] = useState([])

  useEffect(() => {
    let timer
    let moleTimer

    if (isPlaying && time > 0) {
      // Timer countdown
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsPlaying(false)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      // Mole appearance
      const showNewMoles = () => {
        const newMoles = []
        const totalHoles = 9

        // Generate unique random holes for the number of active moles required
        while (newMoles.length < activeMolesCount) {
          const randomHole = Math.floor(Math.random() * totalHoles)
          if (!newMoles.includes(randomHole)) {
            newMoles.push(randomHole)
          }
        }

        setActiveMoles(newMoles)
        
        // Hide moles after specified interval
        moleTimer = setTimeout(() => {
          setActiveMoles([])
          if (isPlaying) showNewMoles()
        }, moleInterval)
      }

      showNewMoles()
    }

    return () => {
      clearInterval(timer)
      clearTimeout(moleTimer)
    }
  }, [isPlaying, activeMolesCount, moleInterval])

  const handleMoleClick = (holeIndex) => {
    if (activeMoles.includes(holeIndex)) {
      setScore((prevScore) => prevScore + 1)
      // Remove the clicked mole from active moles
      setActiveMoles(prev => prev.filter(mole => mole !== holeIndex))
    }
  }

  const startGame = () => {
    setScore(0)
    setTime(gameTime)
    setIsPlaying(true)
    setActiveMoles([])
  }

  return (
    <div className="whack-a-mole">
      <div className="whack-a-mole__header">
        <div className="whack-a-mole__score">Score: {score}</div>
        <div className="whack-a-mole__timer">Time: {time}s</div>
      </div>

      <div className="whack-a-mole__grid">
        {Array(9).fill(null).map((_, index) => (
          <div 
            key={index}
            className={`whack-a-mole__hole ${
              activeMoles.includes(index) ? 'whack-a-mole__hole--active' : ''
            }`}
            onClick={() => handleMoleClick(index)}
          >
            <div className="whack-a-mole__mole"></div>
          </div>
        ))}
      </div>

      {!isPlaying && (
        <div className="whack-a-mole__overlay">
          <div className="whack-a-mole__game-over">
            <h2>Game Over!</h2>
            <p>Final Score: {score}</p>
            <button 
              className="whack-a-mole__button"
              onClick={startGame}
            >
              {time === gameTime ? 'Start Game' : 'Play Again'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Main App component with different configurations
function App() {
  return (
    <div className="app">
      <h1>Whack-a-Mole Game</h1>
      <WhackAMole 
        activeMolesCount={2}    // 2 moles will appear at once
        moleInterval={2000}     // Moles will stay for 2 seconds
        gameTime={30}           // Game will last for 30 seconds
      />
    </div>
  )
}

export default App
