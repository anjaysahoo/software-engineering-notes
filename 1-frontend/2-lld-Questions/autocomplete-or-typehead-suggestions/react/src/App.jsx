import {useState} from 'react'
import classes from './App.module.css'
import getGadgetService from "./services/get-gadget.service.js";
import useDebounce from "./hooks/use-debounce.js";

function App() {
  const [searchVal, setSearchVal] = useState('');
  const [results, setResults] = useState(['speaker']);

/**
 *Below function is getting the values for `results` from API
 * and updating. We don't want this to be called frequently
 */
  const updateResult = async (searchInput="") => {
      console.log("searchInput : ", searchInput);
      //Getting results from API
      const newResult = await getGadgetService(searchInput);
      setResults(newResult);
  }

/**
 * Here we used debouncing to restrict the number of time `updateResult`
 * should be called when used
 */
  const debouncedUpdatedResult = useDebounce(updateResult, 3000);

  const handleSearch = (val) => {
      setSearchVal(val);
      console.log("val : ", val);
      //here we are using a debounced version of `updatedResult`
      debouncedUpdatedResult(val);
  }


  return (
    <>
      <section className={classes['container']}>
          <input
              type="text"
              onChange={(evt) => handleSearch(evt.target.value)}
              value={searchVal}
              className={classes['container__search']}
          />
          <div className={classes['container__results']}>
              {
                  results.map((result) => (
                      <p
                          key={result}
                          onClick={(evt) => setSearchVal(evt.target.innerText)}
                          className={classes['container__results__result']}
                      >{result}</p>
                  ))
              }
          </div>
      </section>
    </>
  )
}

export default App
