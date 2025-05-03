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