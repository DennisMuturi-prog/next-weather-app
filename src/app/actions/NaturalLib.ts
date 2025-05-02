import {JaroWinklerDistance,LevenshteinDistance}from "natural";

// Map of weather conditions to image paths
const weatherIcons: { [key: string]: string } = {
  Clear: "/weather-icons/icons8-sun-96.png",
  Clouds: "/weather-icons/icons8-clouds-96.png",
  Rain: "/weather-icons/icons8-light-rain-96.png",
  Thunderstorm: "/weather-icons/icons8-cloud-lightning-96.png",
  Snow: "/weather-icons/icons8-snow-96.png",
  Fog: "/weather-icons/icons8-fog-96.png",
  Mist: "/weather-icons/icons8-fog-96.png", // Mist is similar to Fog
  Drizzle: "/weather-icons/icons8-light-rain-96.png", // Drizzle is similar to Light Rain
  Wind: "/weather-icons/icons8-wind-96.png",
  Night: "/weather-icons/icons8-night-wind-96.png",
  Icy: "/weather-icons/icons8-icy-96.png",
};
const keys=Object.keys(weatherIcons)

// Function to find the best match using Jaro-Winkler Distance
export function findBestMatch(condition: string): string {
  let bestMatch = "";
  let highestScore = 0;

  for (const key of keys) {
    const score = LevenshteinDistance(condition, key);
    if (score > highestScore) {
      highestScore = score;
      bestMatch = key;
    }
  }

  return weatherIcons[bestMatch];
}

export function formatDate(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds

  // Extract day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" }); // Full month name (e.g., "May")
  const year = date.getFullYear(); // Extract the year (e.g., 2025)

  // Add ordinal suffix to the day
  const ordinalSuffix = (n: number) => {
    if (n > 3 && n < 21) return "th"; // Covers 11th to 19th
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Return the formatted date string (e.g., "2nd May 2025")
  return `${day}${ordinalSuffix(day)} ${month} ${year}`;
}