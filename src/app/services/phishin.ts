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
  // upgrade this so it can return array of objects with: show_date prop, venue_name, venue_location
  const dates = [];
  for (let i = 0; i < allShows.length; i++) {
    dates.push(allShows[i].show_date);
  }
  return dates;
}
