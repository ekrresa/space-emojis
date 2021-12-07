import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './gallery.module.css';

import { Card } from '../Card';
import { paginator } from '../../lib/paginate';
import { Emoji } from '../../types';
import { ErrorCatch } from '../ErrorBoundary';

interface GalleryProps {
  list: Emoji[] | null;
}

export function Gallery({ list }: GalleryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedEmojis, setLoadedEmojis] = useState<Emoji[] | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (list) {
      const { data, nextPage } = paginator({ currentPage, data: list });

      setLoadedEmojis(emojis => (emojis ? emojis.concat(data) : data));
      setHasMore(Boolean(nextPage));
    }
  }, [currentPage, list]);

  return (
    <>
      {list ? (
        <section className={styles.gridContainer} id="scrollableDiv">
          {loadedEmojis ? (
            <ErrorCatch
              onReset={() => {
                setCurrentPage(1);
                setLoadedEmojis([]);
                setHasMore(true);
              }}
            >
              <InfiniteScroll
                dataLength={loadedEmojis.length}
                next={() => setCurrentPage(page => page + 1)}
                hasMore={hasMore}
                loader={<div style={{ textAlign: 'center' }}>Loading...</div>}
                scrollableTarget="scrollableDiv"
                endMessage={
                  loadedEmojis.length > 0 ? <p className={styles.listEnd}>The End</p> : ''
                }
              >
                {loadedEmojis.length > 0 ? (
                  <div className={styles.listContainer}>
                    {loadedEmojis.map((emoji, index) => (
                      <Card key={emoji.title + '-' + index} data={emoji} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.loading}>No results found</div>
                )}
              </InfiniteScroll>
            </ErrorCatch>
          ) : (
            <div className={styles.loading}>Loading results...</div>
          )}
        </section>
      ) : (
        <div className={styles.loading}>Loading emojis...</div>
      )}
    </>
  );
}
