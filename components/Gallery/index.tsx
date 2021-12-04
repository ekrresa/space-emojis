import React from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import styles from './gallery.module.css';

import { Card } from '../Card';
import { Emoji } from '../../types';

interface GalleryProps {
  emojisList: Emoji[];
}

export function Gallery({ emojisList }: GalleryProps) {
  return (
    <>
      {emojisList ? (
        <section className={styles.gridContainer}>
          <VirtuosoGrid
            totalCount={emojisList.length}
            itemClassName={styles.itemContainer}
            listClassName={styles.listContainer}
            itemContent={index => <Card data={emojisList[index]} />}
          />
        </section>
      ) : (
        <div className={styles.loading}>Loading results...</div>
      )}
    </>
  );
}
