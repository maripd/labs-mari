import logo from './logo.svg'
import './App.css'
import { useState } from 'react'
const google = window.google
const autocompleteService = new google.maps.places.AutocompleteService()

function App() {
  const [currentInput, setInput] = useState('')
  const [currentPredictions, setPredictions] = useState([])

  const handleChange = (e) => {
    console.log(e.target.value)
    setInput(e.target.value)
    //get a list from google, array of strings
    autocompleteService.getPlacePredictions(
      { input: e.target.value, types: ['(cities)'] },
      (predictions) => {
        console.log(predictions)
        // if predictions value is not null, then set the predictions
        //since there's no else, it will stay as is
        //filter out impurities early in your logic
        // the things we dont want to be a part of the state, we want to take it out
        //before we even set the state
        if (predictions !== null) {
          setPredictions(predictions)
        }
      }
    )
  }
  console.log('currentInput', currentInput)
  return (
    <div className="App">
      <h1>test</h1>
      <span>city: </span>
      <input
        type="text"
        value={currentInput}
        onChange={handleChange}
        id="search-input"
      />
      {currentPredictions.length > 0 && (
        <div className={'panel'}>
          {currentPredictions.map((predictionItem) => {
            return (
              <p
                className="suggested-city"
                onClick={() => {
                  setInput(predictionItem.description)
                  setPredictions([])
                }}
              >
                {predictionItem.description}
              </p>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default App
