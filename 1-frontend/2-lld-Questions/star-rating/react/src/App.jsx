import './App.css'
import StarRating from "./components/StarRating.jsx";

function App() {

  return (
        <div id="star-section">
            <StarRating filledCount={3} maxCount={5}/>
            <StarRating filledCount={5} maxCount={10}/>
        </div>
    );
}

export default App
