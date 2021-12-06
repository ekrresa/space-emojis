import { cleanup, customRender, getData, screen } from '../../../test-utils';
import { Card } from '.';
import { Emoji } from '../../types';

describe('Card Tests', () => {
  let emojis: Emoji[];

  beforeAll(async () => {
    emojis = await getData();
  });

  afterAll(cleanup);

  test('should render without errors', async () => {
    customRender(<Card data={emojis[1]} />);

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByTestId('emoji-symbol')).toBeInTheDocument();
  });
});
