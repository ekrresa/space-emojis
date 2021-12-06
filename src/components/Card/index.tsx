import { useToastContext } from '../../context/toasts';
import { Emoji } from '../../types';
import styles from './card.module.css';

interface CardProps {
  data: Emoji;
}

export function Card({ data }: CardProps) {
  const { toggleToast } = useToastContext();

  const copyEmoji = (emoji: string) => {
    navigator.clipboard.writeText(emoji).then(() => {
      toggleToast();
    });
  };

  return (
    <div className={styles.card} onClick={() => copyEmoji(data.symbol)}>
      <div className={styles.emoji} data-testid="emoji-symbol">
        {data.symbol}
      </div>
      <h4 className={styles.emojiTitle}>{data.title}</h4>
    </div>
  );
}
