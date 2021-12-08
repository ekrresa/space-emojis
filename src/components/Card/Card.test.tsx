import { cleanup, customRender, getData, screen, userEvent } from '../../setupTests';
import { Card } from '.';
import { Emoji } from '../../types';

describe('Card Tests', () => {
  let emojis: Emoji[];

  beforeAll(async () => {
    emojis = await getData();
  });

  afterAll(cleanup);

  test('should render without errors', async () => {
    const copyEmoji = jest.fn();
    customRender(<Card data={emojis[1]} copyEmoji={copyEmoji} />);

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByTestId('emoji-symbol')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('emoji-card'));
    expect(copyEmoji).toHaveBeenCalledTimes(1);
  });
});
