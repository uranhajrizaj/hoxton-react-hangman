import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [words, setWords] = useState(['welcome',
  'javascript',
  'hello',
  'goodmorning',
  'goodbye',
  'goodnight',
  'goodafternoon',
  'day',
  'night',
  'morning',
  'afternoon',
  'evening',  
  'bye',
  'night',  
  'carrot',
  'apple',
  'banana',
  'orange',
  'grape',
  'strawberry'])
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)])
  
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])

  const[lives, setLives] = useState(4)

 
  const handleNewGame = () => {
    setWord(words[Math.floor(Math.random() * words.length)])
    setLives(4)
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    const listener = e => {
      let letters = 'abcdefghijklmnopqrstuvwxyz'
      let type = e.key.toLowerCase()
      if (letters.includes(type)) {
        if (!guessedLetters.includes(type)) {
          if (word.includes(type)) {
            setGuessedLetters(guessedLetters => [...guessedLetters, type])
          } else {
            setWrongLetters(wrongLetters => [...wrongLetters, type])
            setLives(lives => lives - 1)
          }
        }
      }
    }
  
    window.addEventListener('keydown', listener)
    
    return () => window.removeEventListener('keydown', listener)
  }, [guessedLetters, word])
 


  return (
    <div className="App">
      <div className='letters' >{word.split("").map((l)=>guessedLetters.includes(l)?<span>{l}</span>:<span>_</span>)}</div>
      <div className='letters'> Wrong letters :{wrongLetters.map((l)=><span>{l}</span>)} </div>
      <div className='letters'> Lives: {lives} </div>
      {lives === 0 ? <div className='info'><h3>You lost 🙄</h3><button onClick={handleNewGame}>Play again</button></div> : null}
      {word.split('').every(letter => guessedLetters.includes(letter))? <div className='info'> <h3>You win 🎉</h3> <button onClick={handleNewGame}>Play again</button></div> : null}
    </div>
  )
}

export default App

