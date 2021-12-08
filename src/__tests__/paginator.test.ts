import { getData } from '../setupTests';
import { paginator } from '../lib/paginate';
import { Emoji } from '../types';

describe('Paginator', () => {
  let emojis: Emoji[];
  let lastPageNumber: number;

  beforeAll(async () => {
    emojis = await getData();
  });

  test('should return the first page', () => {
    const firstPage = paginator({ data: emojis, currentPage: 1 });
    lastPageNumber = firstPage.totalPages;

    expect(firstPage.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: expect.any(String),
          keywords: expect.any(String),
          symbol: expect.any(String),
        }),
      ])
    );
    expect(firstPage.data.length).toBe(firstPage.perPage);
    expect(firstPage.prevPage).toBe(null);
    expect(firstPage.nextPage).toBe(2);
    expect(firstPage.total).toBe(emojis.length);
  });

  test('should return the second page', () => {
    const secondPage = paginator({ data: emojis, currentPage: 2 });

    expect(secondPage.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: expect.any(String),
          keywords: expect.any(String),
          symbol: expect.any(String),
        }),
      ])
    );
    expect(secondPage.data.length).toBe(secondPage.perPage);
    expect(secondPage.prevPage).toBe(1);
    expect(secondPage.nextPage).toBe(3);
    expect(secondPage.total).toBe(emojis.length);
  });

  test('should return the last page', () => {
    const lastPage = paginator({ data: emojis, currentPage: lastPageNumber });

    expect(lastPage.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: expect.any(String),
          keywords: expect.any(String),
          symbol: expect.any(String),
        }),
      ])
    );
    expect(lastPage.data.length).toBeLessThanOrEqual(lastPage.perPage);
    expect(lastPage.prevPage).toBe(lastPage.page - 1);
    expect(lastPage.nextPage).toBe(null);
    expect(lastPage.total).toBe(emojis.length);
  });
});
