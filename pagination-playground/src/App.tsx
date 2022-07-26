import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";


function App() {
  const [page,setPage] = useState(0);
  const [totalPages,setTotalPages] = useState(0);
  const [Items,setItems] = useState([]);

  useEffect(() => {
    const  fetch = async () => {
      const aparams = {page,size : 6}
    }
  } , [])

  return (
    <div>
      {/* <Pagination /> */}
    </div>
  );
}

export default App;
