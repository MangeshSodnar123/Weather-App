import * as React from "react";
import Navbar from "./Navbar";
import { TextField } from "@mui/material";
import "./style.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";

function WeatherApp() {
  const apiKey = "b30e90c02aa3493e91c52827233007";
  // const location = 'london';

  const [weatherData, setWeatherData] = React.useState({});
  const [location, setLocation] = React.useState("london");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [prevTimerId, setPrevTimerId] = React.useState();

  const apiCall = async () => {
    try {
      setLoading(true);
      console.log("api call", location);
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
      );
      // console.log(res.data);
      // console.log(res.data.location);
      // console.log(res.data.current);
      setWeatherData(res.data);
      setLoading(false);
      setError(false);
    } catch (e) {
      console.log(e.response.status);
      if (e.response && e.response.status === 400) {
        setError(true);
      }
    }
  };

  // React.useEffect(() => {
  //   apiCall();
  // }, [location, error]);

  React.useEffect(() => {
    apiCall();
  }, []);

  const debounce = (event, prevTimerId) => {
    if (prevTimerId) {
      clearTimeout(prevTimerId);
    }
    const timerId = setTimeout(() => {
      apiCall();
      // setLocation(event.target.value);
    }, 500);

    setPrevTimerId(timerId);
  };

  return (
    <div className="body">
      <Navbar />
      <main>
        <TextField
          className="text-field"
          id="location"
          label="Enter location"
          variant="outlined"
          value={location}
          onChange={(e) => {
            debounce(e, prevTimerId);
            setLocation(e.target.value);
          }}
        />
        {/* code to handle error and show error message  */}
        {error ? (
          <Typography color="red" variant="h6" align="center">
            No matching location found.
          </Typography>
        ) : (
          <>
            {!loading ? ( // Check if weatherData is not empty
              <>
                <Typography variant="h5" align="center" fontWeight="bold">
                  {weatherData.location.name}, {weatherData.location.country}
                </Typography>
                <Card>
                  <CardMedia
                    component="img"
                    // className="condition-img"
                    sx={{ height: "100px", width: "100px", objectFit: "cover" }}
                    image={weatherData.current.condition.icon}
                    alt="condition"
                  />
                  <CardContent>
                    <Stack>
                      <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                      >
                        <Grid item xs={6}>
                          <Typography>Temperature:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            {weatherData.current.temp_c}°C/
                            {weatherData.current.temp_f}
                            °F
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                      >
                        <Grid item xs={6}>
                          <Typography>Condition: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            {weatherData.current.condition.text}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                      >
                        <Grid item xs={6}>
                          <Typography>Wind Speed: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            {weatherData.current.wind_kph} km/h
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                      >
                        <Grid item xs={6}>
                          <Typography>Humidity: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            {weatherData.current.humidity}%
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                      >
                        <Grid item xs={6}>
                          <Typography>Cloud Coverage: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>{weatherData.current.cloud}%</Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                      >
                        <Grid item xs={6}>
                          <Typography>Last Updated: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            {weatherData.current.last_updated}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Stack>
                  </CardContent>
                </Card>
                {/* Render a placeholder or loading message while weatherData is empty */}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default WeatherApp;
