import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Fuse from 'fuse.js';
import debounce from 'lodash.debounce';

import { Gallery } from '../components/Gallery';
import { useToastContext } from '../context/toasts';
import { Emoji } from '../types';
import Search from '../public/search.svg';
import styles from '../styles/Home.module.css';

const refineSearchResults = (data: Fuse.FuseResult<Emoji>[] | undefined) => {
  return data ? data.map(results => results.item) : [];
};

export default function Home() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToastContext();

  const [data, setData] = useState<Emoji[]>([]);
  const [searchResults, setSearchResults] = useState<Emoji[]>([]);
  const [fuseInstance, setFuseInstance] = useState<Fuse<Emoji> | null>(null);

  useEffect(() => {
    (async function loadData() {
      const emojis = await import('../public/emoji-list.json').then(data => data.default);
      setData(emojis);
    })();
  }, []);

  useEffect(() => {
    if (data) {
      const searchIndex = Fuse.createIndex(['title', 'keywords'], data);
      const fuse = new Fuse(
        data,
        {
          isCaseSensitive: false,
          ignoreLocation: true,
          minMatchCharLength: 2,
          threshold: 0.3,
        },
        searchIndex
      );
      setFuseInstance(fuse);
      inputRef.current?.focus();
    }
  }, [data]);

  useEffect(() => {
    if (fuseInstance && router.query.q) {
      const searchTerm = router.query.q as string;

      // Update search input value
      if (inputRef.current) {
        inputRef.current.value = searchTerm;
      }

      const results = fuseInstance.search(searchTerm);
      setSearchResults(refineSearchResults(results));
    } else {
      setSearchResults([]);
    }
  }, [fuseInstance, router.query.q]);

  const handleSearchInput = debounce((evt: ChangeEvent<HTMLInputElement>) => {
    router.push(`${router.pathname}?q=${evt.target.value}`, undefined, {
      shallow: true,
    });
  }, 500);

  return (
    <div className={styles.container}>
      <div className={`${styles.clipboard} ${showToast ? styles['clipboard-show'] : ''}`}>
        Copied to Clipboard!
      </div>
      <header>
        <h1 className={styles.title}>Emoji Search</h1>
      </header>

      <main>
        <form className={styles.emojiForm}>
          <Search className={styles.searchIcon} />
          <input
            className={styles.emojiInput}
            onChange={handleSearchInput}
            ref={inputRef}
            type="search"
          />
        </form>
        {/* <div className={styles.recentSearch}>Recent searches:</div> */}

        {Boolean(router.query.q) ? (
          <Gallery key={router.query.q as string} emojisList={searchResults} />
        ) : (
          <Gallery emojisList={data} />
        )}
      </main>
    </div>
  );
}
