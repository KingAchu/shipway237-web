import { PUBLIC_API_URL } from '$env/static/public';

export async function getAvailableSchedules(city: string) {
  const res = await fetch(`${PUBLIC_API_URL}/schedules/available?city=${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getScheduledCities() {
  const res = await fetch(`${PUBLIC_API_URL}/schedules/cities`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
