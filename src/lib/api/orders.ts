import { PUBLIC_API_URL } from '$env/static/public';

export async function submitOrder(payload: object) {
  const res = await fetch(`${PUBLIC_API_URL}/orders/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
