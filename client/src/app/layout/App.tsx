import { Container, CssBaseline } from "@mui/material";
//import { useAccommodations } from "../../lib/hooks/useAccommodations";
import NavBar from "./NavBar";
import HomePage from "../../features/home/HomePage";


function App() {
  //const { accommodations } = useAccommodations();

  //if (!accommodations) return <Typography>No accommodations</Typography>

  return (
    <Container disableGutters sx={{ bgcolor: "#EFEFEF", minWidth: "100vw" }}>
      <CssBaseline />
      <NavBar />
      {/* <ul>
        {accommodations.map((accommodation) => (
          <li key={accommodation.id}>{accommodation.title}</li>
        ))}
      </ul> */}
      <HomePage />
    </Container>
  )
}

export default App


