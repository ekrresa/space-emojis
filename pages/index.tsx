import { useState, useEffect } from 'react';
import { Emoji } from '../types';
import Search from '../public/search.svg';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [data, setData] = useState<Emoji[] | null>(null);

  useEffect(() => {
    (async function loadData() {
      const emojis = await import('../lib/data').then(data => data.default);
      setData(emojis.slice(0, 10));
    })();
  }, []);

  const copyEmoji = (emoji: string) => {
    navigator.clipboard.writeText(emoji).then(() => {
      console.log('copied');
    });
  };

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>Emoji Search</h1>
      </header>

      <main>
        <form className={styles.emojiForm}>
          <Search className={styles.searchIcon} />
          <input className={styles.emojiInput} />
        </form>

        <section className={styles.emojiGrid}>
          {data &&
            data.map(emoji => (
              <div
                className={styles.emojiDisplay}
                key={emoji.symbol}
                onClick={() => {
                  copyEmoji(emoji.symbol);
                }}
              >
                <div className={styles.emoji}>{emoji.symbol}</div>
                <div className="">{emoji.title}</div>
              </div>
            ))}
        </section>
      </main>
    </div>
  );
}
