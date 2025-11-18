import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  useEffect(() => {
    axios.get<Accommodation[]>('https://localhost:5001/api/accommodations')
      .then(response => setAccommodations(response.data));

    return () => { }
  }, [])

  return (
    <>
      <h3>RentSmart</h3>
      <ul>
        {accommodations.map((accommodation) => (
          <li key={accommodation.id}>{accommodation.title}</li>
        ))}
      </ul>
    </>
  )
}

export default App
