import React from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styles from './gallery.module.css';

import { Card } from '../Card';
import { GUTTER_SIZE } from '../../constants';

interface GalleryProps {
  cards: any;
}

export function Gallery({ cards }: GalleryProps) {
  return (
    <div
      style={{
        minHeight: '70vh',
      }}
    >
      <AutoSizer defaultWidth={1920} defaultHeight={1080}>
        {({ width, height }) => {
          const cardWidth = 224;
          const cardHeight = 176;
          const columnCount = Math.floor(width / cardWidth);
          const rowCount = Math.ceil(cards.length / columnCount);

          return (
            <Grid
              className={styles.grid}
              width={width}
              height={height}
              columnCount={columnCount}
              columnWidth={cardWidth}
              rowCount={rowCount}
              rowHeight={cardHeight + GUTTER_SIZE}
              itemData={{ cards, columnCount }}
            >
              {Card}
            </Grid>
          );
        }}
      </AutoSizer>
    </div>
  );
}
