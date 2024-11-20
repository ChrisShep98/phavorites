interface venue {
  id: number;
  latitude: number;
  location: string;
  name: string;
  other_names: string[];
  shows_count: 4;
  slug: string;
  updated_at: string;
}

interface tags {
  color: string;
  ends_at_second: null;
  group: string;
  id: number;
  name: string;
  notes: string;
  priority: number;
  starts_at_second: null;
  transcript: null;
}

export interface tracks {
  duration: number;
  id: number;
  jam_starts_at_second: null;
  likes_count: number;
  mp3: string;
  position: number;
  set: string;
  set_name: string;
  show_date: string;
  show_id: number;
  slug: string;
  song_ids: number[]; // double check this
  tags: tags[];
  title: string;
  updated_at: string;
  venue_location: string;
  venue_name: string;
  waveform_image: string;
}

export interface shows {
  date: string;
  duration: number;
  id: number;
  incomplete: boolean;
  likes_count: number;
  remastered: boolean;
  sbd: boolean;
  tags: string[];
  taper_notes: string;
  tour_id: number;
  tracks: tracks[];
  updated_at: string;
  venue: venue;
  venue_name: string;
}

export interface songSubmissionCard {
  voteCount: string;
  _id: string;
  songName: string;
  venueLocation: string;
  venueName: string;
  date: string;
  description: string; // possibly undefined?
  comments: { username: string; userId: string; comment: string; _id: string }[]; // should be required
  slug: string;
  userWhoPosted: {
    username: string;
    userId: string;
  };
}
