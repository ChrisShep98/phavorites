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

export async function getAllPreformancesOfSongs() {
  const response = await fetch(`https://phish.in/api/v1/songs/harpua.json`, {
    method: "GET",
    headers: {
      Authorization: process.env.PHISH_KEY!,
      Accept: "application/json",
    },
  });
  const shows = await response.json();
  const allShows = shows.data.tracks;
  console.log(allShows);
  return shows;
}
