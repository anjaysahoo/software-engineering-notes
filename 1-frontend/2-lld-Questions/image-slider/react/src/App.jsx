import {useEffect, useRef, useState} from 'react'
import './App.css'

function App() {
    const [currentImageNo, setCurrentImageNo] = useState(0);
    const totalImage = 4;
    let timerId = useRef();

    useEffect(() => {
        timerId.current = getSetInterval();

        return () => {
            clearInterval(timerId.current);
        }
    }, []);

    function getSetInterval() {
        return setInterval(() => {
            console.log("Timer called")
            setCurrentImageNo(prevImageNo => (prevImageNo + 1) % totalImage);
            console.log("currentImageNo : ", currentImageNo)
        }, 5000)
    }


    function handleNextClick() {
        clearInterval(timerId.current);
        setCurrentImageNo((prevImageNo) => (prevImageNo + 1) % totalImage);
        timerId.current = getSetInterval();
    }

    function handlePrevClick() {
        clearInterval(timerId.current);
        setCurrentImageNo((prevImageNo) => (prevImageNo - 1 + totalImage) % totalImage);
        timerId.current = getSetInterval();
    }
  

  return (
    <>
      <main>
          <section>
              <button onClick={handlePrevClick}>Prev</button>
              <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="secanry image 0"
                  style={{'display': currentImageNo === 0 ? 'block' : 'none'}}
              />
              <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="scenary image 1"
                  style={{'display': currentImageNo === 1 ? 'block' : 'none'}}
              />
              <img
                  src="https://plus.unsplash.com/premium_photo-1672947568059-23e2f914eb6b?q=80&w=3790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="scenary image 2"
                  style={{'display': currentImageNo === 2 ? 'block' : 'none'}}
              />
              <img
                  src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="scenary image 3"
                  style={{'display': currentImageNo === 3 ? 'block' : 'none'}}
              />
              <button onClick={handleNextClick}>Next</button>
          </section>
      </main>
    </>
  )
}

export default App
