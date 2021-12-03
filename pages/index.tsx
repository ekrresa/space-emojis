import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Fuse from 'fuse.js';

import { Gallery } from '../components/Gallery';
import { Emoji } from '../types';
import Search from '../public/search.svg';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const fuseInstance = useRef<Fuse<Emoji> | null>(null);

  const [data, setData] = useState<Emoji[] | null>(null);
  const [searchResults, setSearchResults] = useState<
    Fuse.FuseResult<Emoji>[] | undefined
  >([]);

  useEffect(() => {
    (async function loadData() {
      const emojis = await import('../lib/data').then(data => data.default);
      setData(emojis);
    })();
  }, []);

  useEffect(() => {
    if (data) {
      const searchIndex = Fuse.createIndex(['title', 'keywords'], data);
      const fuse = new Fuse(
        data,
        { isCaseSensitive: false, minMatchCharLength: 2 },
        searchIndex
      );
      fuseInstance.current = fuse;
    }
  }, [data]);

  useEffect(() => {
    const searchTerm = router.query.q as string;
    const results = fuseInstance.current?.search(searchTerm);
    setSearchResults(results);
  }, [router.query.q]);

  const refineSearchResults = (data: Fuse.FuseResult<Emoji>[]) => {
    return data.map(results => results.item);
  };

  const emojis =
    searchResults && searchResults.length > 0
      ? refineSearchResults(searchResults)
      : data && data.length > 0
      ? data
      : [];

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>Emoji Search</h1>
      </header>

      <main>
        <form className={styles.emojiForm}>
          <Search className={styles.searchIcon} />
          <input
            className={styles.emojiInput}
            onChange={e => {
              router.push(`${router.pathname}?q=${e.currentTarget.value}`, undefined, {
                shallow: true,
              });
            }}
          />
        </form>

        {/* Move this block to the Gallery component */}
        {data ? (
          <section className={styles.emojiGrid}>
            <Gallery emojisList={emojis} />
          </section>
        ) : (
          <div className={styles.loading}>Loading results...</div>
        )}
      </main>
    </div>
  );
}
