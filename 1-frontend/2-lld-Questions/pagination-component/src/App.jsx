import { useState } from 'react'
import './App.css'
import Pagination from './components/Pagination'

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 400; // Example total items
  const itemsPerPage = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      <h1>Pagination Example</h1>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onChange={handlePageChange}
      />
      <div>Current Page: {currentPage}</div>
    </div>
  )
}

export default App
