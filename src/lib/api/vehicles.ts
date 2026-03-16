import { PUBLIC_API_URL } from '$env/static/public';

export async function getYears(): Promise<number[]> {
  const res = await fetch(`${PUBLIC_API_URL}/vehicles/years`);
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data.years;
}

export async function getMakes(year: number): Promise<string[]> {
  const res = await fetch(`${PUBLIC_API_URL}/vehicles/makes?year=${year}`);
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data.makes;
}

export async function getModels(year: number, make: string): Promise<string[]> {
  const res = await fetch(`${PUBLIC_API_URL}/vehicles/models?year=${year}&make=${encodeURIComponent(make)}`);
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data.models;
}
