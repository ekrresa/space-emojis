// import clipboard from 'clipboardy';
import { useToastContext } from '../../context/toasts';
import { Emoji } from '../../types';
import styles from './card.module.css';

interface CardProps {
  data: Emoji;
  copyEmoji: (emoji: string) => void;
}

export function Card({ data, copyEmoji }: CardProps) {
  return (
    <li
      className={styles.card}
      onClick={() => copyEmoji(data.symbol)}
      data-testid="emoji-card"
    >
      <div className={styles.emoji} data-testid="emoji-symbol">
        {data.symbol}
      </div>
      <h4 className={styles.emojiTitle}>{data.title}</h4>
    </li>
  );
}
