import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Fuse from 'fuse.js';
import debounce from 'lodash.debounce';

import { Gallery } from '../components/Gallery';
import { useToastContext } from '../context/toasts';
import * as Storage from '../lib/storage';
import { Emoji } from '../types';
import Search from '../../public/search.svg';
import styles from '../styles/Home.module.css';

const refineSearchResults = (data: Fuse.FuseResult<Emoji>[] | undefined) => {
  return data ? data.map(results => results.item) : [];
};

export default function Home() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { selectedEmoji, showToast } = useToastContext();

  const [data, setData] = useState<Emoji[] | null>(null);
  const [searchResults, setSearchResults] = useState<Emoji[]>([]);
  const [fuseInstance, setFuseInstance] = useState<Fuse<Emoji> | null>(null);
  const [recentSearch, setRecentSearch] = useState<string[]>([]);

  // Loads the list of emojis from the json file
  useEffect(() => {
    (async function loadData() {
      const emojis = await import('../../public/emoji-list.json').then(
        data => data.default
      );
      setData(emojis);
    })();
  }, []);

  // sets up a fuse instance, focuses the search input, and loads recent search terms
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

      const storedSearch = Storage.getItems();
      if (storedSearch) {
        setRecentSearch(storedSearch);
      }
    }
  }, [data]);

  // Updates search results after user types a search term
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

  // Saves search term in localStorage and updates recent searches
  useEffect(() => {
    if (showToast && router.query.q) {
      Storage.saveItem(router.query.q as string);
      setRecentSearch(Storage.getItems());
    }
  }, [router.query.q, showToast]);

  const handleSearchInput = debounce((evt: ChangeEvent<HTMLInputElement>) => {
    router.push(`${router.pathname}?q=${evt.target.value}`, undefined, {
      shallow: true,
    });
  }, 500);

  const handleRecentSearchClick = (searchTerm: string) => {
    router.push(`${router.pathname}?q=${searchTerm}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.clipboard} ${showToast ? styles['clipboard-show'] : ''}`}
        data-testid="toast"
      >
        <span style={{ fontSize: '1.4rem', marginRight: '0.4rem' }}>{selectedEmoji}</span>
        copied to clipboard!
      </div>
      <header>
        <h1 className={styles.title}>Emoji Search</h1>
        <p className={styles.subtitle}>Click on an emoji to copy it.</p>
      </header>

      <main>
        <form className={styles.emojiForm}>
          <label htmlFor="search" style={{ position: 'relative', top: '3px' }}>
            <Search className={styles.searchIcon} />
          </label>
          <input
            className={styles.emojiInput}
            onChange={handleSearchInput}
            ref={inputRef}
            type="search"
            id="search"
          />
        </form>

        <div className={styles.recentSearch}>
          {recentSearch.length > 0 && (
            <span style={{ marginRight: '0.5rem', fontSize: '0.8rem' }}>
              Recent searches:
            </span>
          )}

          {recentSearch.length > 0 &&
            recentSearch.map(item => (
              <button
                key={item}
                className={styles.search}
                onClick={() => handleRecentSearchClick(item)}
              >
                {item}
              </button>
            ))}
        </div>

        <div className={styles.searchResults}>
          {searchResults.length > 0 ? `${searchResults.length} results found` : ''}
        </div>

        {Boolean(router.query.q) ? (
          <Gallery
            key={(router.query.q as string) + searchResults.length}
            list={searchResults}
          />
        ) : (
          <Gallery list={data} />
        )}
      </main>
    </div>
  );
}
