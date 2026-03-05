import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLatest();
  }, []);

  const fetchLatest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/weather/latest");
      setWeather(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // prevents page reload
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError("");

      await axios.post(
        `http://localhost:5000/api/weather/fetch/${city}`
      );

      await fetchLatest();
      setCity("");
    } catch (err) {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    if (!condition) return "fa-cloud";

    const lower = condition.toLowerCase();

    if (lower.includes("clear")) return "fa-sun";
    if (lower.includes("cloud")) return "fa-cloud";
    if (lower.includes("rain")) return "fa-cloud-rain";
    if (lower.includes("storm") || lower.includes("thunder")) return "fa-bolt";
    if (lower.includes("snow")) return "fa-snowflake";

    return "fa-cloud";
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          <i className="fa-solid fa-cloud-sun" style={{ marginRight: 10 }}></i>
          Weather Dashboard
        </h2>

        <form style={styles.searchBox} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <i className="fa-solid fa-magnifying-glass"></i>
            )}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        {weather && (
          <div style={styles.weatherSection}>
            <h3 style={styles.city}>{weather.city.toUpperCase()}</h3>

            <i
              className={`fa-solid ${getWeatherIcon(weather.condition)}`}
              style={styles.mainIcon}
            ></i>

            <div style={styles.infoRow}>
              <i className="fa-solid fa-temperature-high" style={styles.icon}></i>
              <span>{weather.temperature} °C</span>
            </div>

            <div style={styles.infoRow}>
              <i className="fa-solid fa-droplet" style={styles.icon}></i>
              <span>{weather.humidity}%</span>
            </div>

            <div style={styles.infoRow}>
              <i className="fa-solid fa-wind" style={styles.icon}></i>
              <span>{weather.windSpeed} m/s</span>
            </div>

            <p style={styles.condition}>{weather.condition}</p>

            <p style={styles.timestamp}>
              <i className="fa-regular fa-clock"></i>{" "}
              {new Date(weather.timeStamp * 1000).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    width: "380px",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
    color: "#fff",
    textAlign: "center",
    transition: "0.3s ease",
  },
  title: {
    marginBottom: "20px",
    fontWeight: "600",
    fontSize: "22px",
  },
  searchBox: {
    display: "flex",
    marginBottom: "15px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "12px 0 0 12px",
    border: "none",
    outline: "none",
    fontSize: "15px",
  },
  button: {
    padding: "12px 15px",
    borderRadius: "0 12px 12px 0",
    border: "none",
    background: "#ffffff",
    cursor: "pointer",
    transition: "0.3s",
  },
  weatherSection: {
    marginTop: "15px",
    animation: "fadeIn 0.5s ease-in-out",
  },
  city: {
    fontSize: "22px",
    marginBottom: "10px",
    letterSpacing: "1px",
  },
  mainIcon: {
    fontSize: "70px",
    margin: "15px 0",
  },
  infoRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    marginTop: "10px",
    fontSize: "18px",
  },
  icon: {
    width: "25px",
    textAlign: "center",
  },
  condition: {
    marginTop: "12px",
    fontWeight: "bold",
    fontSize: "18px",
    textTransform: "capitalize",
  },
  timestamp: {
    marginTop: "10px",
    fontSize: "13px",
    opacity: 0.8,
  },
  error: {
    color: "#ffdddd",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default Weather;