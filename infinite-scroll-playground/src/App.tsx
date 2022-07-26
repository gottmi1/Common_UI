import axios from "axios";
import { useState } from "react";

interface AirLine {
  id:number;
  name: string;
  country: string;
  logo:string;
  slogan:string;
  head_quaters:string;
  website:string;
  established: string;
}
interface Passenger {
  _id:string;
  name:string;
  trips:number;
  airline:AirLine;
  __v:number;
}

function App() {
  const [passengers, setPassengers] = useState<Array<Passenger>>([]);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false);

  const getPassengers = () => {
    const params = {page : 0,size : 10};

    try {
      const response = axios.get('https://api.instantwebtools.net/v1/passenger',{params})
      const passengers = response.data.data;
      const isLast = response.data.totlaPages === currentPage;

      setPassengers(passengers);
      setIsLast(isLast);
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="App">
      <ul className="List">
        <li className="item">

        </li>
      </ul>
    </div>
  );
}

export default App;
