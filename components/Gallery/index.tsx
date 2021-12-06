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

  const fetchMoreEmojis = () => {
    setCurrentPage(page => page + 1);
  };

  return (
    <>
      {emojisList ? (
        <section className={styles.gridContainer} id="scrollableDiv">
          <InfiniteScroll
            dataLength={loadedEmojis.length}
            next={fetchMoreEmojis}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
            endMessage={<p className={styles.listEnd}>The End</p>}
          >
            <div className={styles.listContainer}>
              {loadedEmojis.map((emoji, index) => (
                <Card key={emoji.title + '-' + index} data={emoji} />
              ))}
            </div>
          </InfiniteScroll>
        </section>
      ) : (
        <div className={styles.loading}>Loading results...</div>
      )}
    </>
  );
}
