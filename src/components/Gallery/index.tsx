import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './gallery.module.css';

import { Card } from '../Card';
import { paginator } from '../../lib/paginate';
import { Emoji } from '../../types';

interface GalleryProps {
  emojisList: Emoji[];
}

export function Gallery({ emojisList }: GalleryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedEmojis, setLoadedEmojis] = useState<Emoji[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const { data, nextPage } = paginator({ currentPage, data: emojisList });

    setLoadedEmojis(emojis => emojis.concat(data));
    setHasMore(Boolean(nextPage));
  }, [currentPage, emojisList]);

  return (
    <>
      {emojisList ? (
        <section className={styles.gridContainer} id="scrollableDiv">
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
            <div className={styles.listContainer}>
              {loadedEmojis.length > 0 ? (
                loadedEmojis.map((emoji, index) => (
                  <Card key={emoji.title + '-' + index} data={emoji} />
                ))
              ) : (
                <div className={styles.loading}>No results found</div>
              )}
            </div>
          </InfiniteScroll>
        </section>
      ) : (
        <div className={styles.loading}>Loading results...</div>
      )}
    </>
  );
}