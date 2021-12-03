import { GUTTER_SIZE } from '../../constants';
import styles from './card.module.css';

interface CardProps {
  columnIndex: number;
  rowIndex: number;
  style: any;
  data: any;
}

export function Card({ columnIndex, rowIndex, style, data }: CardProps) {
  const { cards, columnCount } = data;
  const singleColumnIndex = columnIndex + rowIndex * columnCount;
  const card = cards[singleColumnIndex];

  const copyEmoji = (emoji: string) => {
    navigator.clipboard.writeText(emoji).then(() => {
      console.log('copied');
    });
  };

  return (
    <div
      style={{
        ...style,
        left: style.left + GUTTER_SIZE,
        top: style.top + GUTTER_SIZE,
        width: style.width - GUTTER_SIZE,
        height: style.height - GUTTER_SIZE,
      }}
    >
      {card && (
        <div
          key={card.symbol}
          className={styles.card}
          onClick={() => copyEmoji(card.symbol)}
        >
          <div className={styles.emoji}>{card.symbol}</div>
          <div className="">{card.title}</div>
        </div>
      )}
    </div>
  );
}
