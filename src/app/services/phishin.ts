// import PHISH_KEY from "../lib/phishkey";

export async function getShows(yearSelected: string) {
  const response = await fetch(`https://phish.in/api/v1/years/${yearSelected}.json`, {
    method: "GET",
    headers: {
      Authorization: process.env.PHISH_KEY!,
      Accept: "application/json",
    },
  });
  const shows = await response.json();
  return shows;
}

export async function getTrackList(date: string) {
  const response = await fetch(`https://phish.in/api/v1/shows/${date}.json`, {
    method: "GET",
    headers: {
      Authorization: process.env.PHISH_KEY!,
      Accept: "application/json",
    },
  });
  const trackList = await response.json();
  return trackList.data.tracks;
}

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

export async function getAllSongSubmissions() {
  const response = await fetch(`http://localhost:8000/allSubmissions`);
  const allSubmissions = await response.json();
  return allSubmissions.data;
}
