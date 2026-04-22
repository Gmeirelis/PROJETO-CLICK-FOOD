const BASE_URL = window.location.hostname.includes('github.io')
  ? '/PROJETO-CLICK-FOOD'
  : '';

export async function getRestaurantes() {
  const res = await fetch(`${BASE_URL}/data/restaurante.json`);
  return res.json();
}