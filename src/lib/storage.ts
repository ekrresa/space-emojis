export function getItems() {
  const searches = localStorage.getItem('recent_searches');

  if (searches) {
    return JSON.parse(searches) as string[];
  }

  return [];
}

export function saveItem(item: string) {
  let searches = getItems();

  if (!searches) {
    localStorage.setItem('recent_searches', JSON.stringify([item]));
    return;
  }

  if (searches.length === 4) {
    searches.pop();
  }

  if (searches.some(val => val === item)) {
    searches = searches.filter(val => val !== item);
  }

  searches.unshift(item);
  localStorage.setItem('recent_searches', JSON.stringify(searches));
}
