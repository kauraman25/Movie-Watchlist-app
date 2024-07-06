import axios from "axios";
import NavBar from "../Navbar";
import { useContext, useEffect, useState } from "react";
import { Card, Box, CardMedia, CardHeader, CardActions, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthUser } from "../Approuter";
// ea2ba6a4-7a56-4f3f-aa17-04a43691ef6a
// 436abe4f
const Home = () => {
  const { username } = useContext(AuthUser);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  
  const apiUrl = "https://api.themoviedb.org/3/trending/movie/day";
  const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDA1M2FhZjIwOTljMzBkYTIxNTM2ODZiMDViY2M0MSIsIm5iZiI6MTcxOTk0NjIyNy4xMTAyNDMsInN1YiI6IjY2N2FmYjEwZTQ1NDcyMzBlMWEwYjM0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tjBbWV0KHI6IPuiXWmrRFagkdKRizhDTiD16RbkvWXo";
  
  const config = {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'accept': 'application/json'
    },
    params: {
      language: 'en-US'
    }
  };

  const getData =  () => {
    try {
      axios.get(apiUrl, config).
      then((res) => setMovies(res.data.results))
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <NavBar />
      <Box>
        <Typography variant="h5">
          Welcome {username}!
        </Typography>
      </Box>
      <Box>
        { movies.map((item) => (
          <Box key={item.id} sx={{ display: "inline-block", marginLeft: "30px", marginBottom: "30px" }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia 
                onClick={() => navigate(`/details/${item.id}`)}
                component="img"
                height="194"
                image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              />
              <CardHeader title={item.title} />
              <CardActions>
                <Button onClick={() => navigate(`/watchlist/${item.id}`)} variant="contained" sx={{ background: "black" }}>+</Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Home;
