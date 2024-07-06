import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Navbar";

const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const apiUrl = `https://api.themoviedb.org/3/movie/${id}`;
  const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDA1M2FhZjIwOTljMzBkYTIxNTM2ODZiMDViY2M0MSIsIm5iZiI6MTcxOTMzNTg0NC4xNTcwMSwic3ViIjoiNjY3YWZiMTBlNDU0NzIzMGUxYTBiMzQxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.WCJQI3ZsK8OU80fSTw9W3FE_WVstFrcPHyDdSQS_tDg";


  const config = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      accept: "application/json",
    },
    params: {
      language: "en-US",
    },
  };

  const getDetail = () => {
    axios.get(apiUrl, config)
      .then((res) => setMovie(res.data))
      .catch((error) => console.error('Error fetching details:', error));
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  return (
    <div>
      <NavBar />
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <div style={{display:"flex"}}>
          <img style={{height:"194px", marginRight:"30px"}} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <p>{movie.overview}</p>
          <div>
          <h4>Release Date : {movie.release_date}</h4>

          </div>
          </div>
          
          {/* Add more movie details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Details;
