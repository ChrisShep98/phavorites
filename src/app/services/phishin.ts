export async function getAllPreformancesOfSongs(songSlug: string) {
  const response = await fetch(`https://phish.in/api/v1/songs/${songSlug}.json`, {
    method: "GET",
    headers: {
      Authorization: process.env.PHISH_KEY!,
      Accept: "application/json",
    },
  });
  const shows = await response.json();
  const allShows = shows.data.tracks;
  const dates = [];
  for (let i = 0; i < allShows.length; i++) {
    const singleShowData = {
      date: allShows[i].show_date,
      venueName: allShows[i].venue_name,
      venueLocation: allShows[i].venue_location,
    };
    dates.push(singleShowData);
  }
  return dates;
}
