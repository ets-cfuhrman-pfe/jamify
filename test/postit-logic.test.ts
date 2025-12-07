import { toggleLike, addComment, PostIt } from '../widget-figjam/widget-src/postit-logic';

function sample(): PostIt {
  return {
    id: 'p1',
    content: 'Hello',
    authorId: 'u1',
    authorName: 'Alice',
    color: '#FFF',
    timestamp: Date.now(),
    likes: [],
    comments: [],
  };
}

describe('postit-logic', () => {
  test('toggleLike adds and removes user id', () => {
    const base = [sample()];
    const liked = toggleLike(base, 'p1', 'bob');
    expect(liked[0].likes).toContain('bob');
    const unliked = toggleLike(liked, 'p1', 'bob');
    expect(unliked[0].likes).not.toContain('bob');
  });

  test('addComment ignores empty content', () => {
    const base = [sample()];
    const res = addComment(base, 'p1', 'u2', 'Bob', '  ');
    expect(res[0].comments?.length).toBe(0);
  });

  test('addComment appends a comment with author', () => {
    const base = [sample()];
    const res = addComment(base, 'p1', 'u2', 'Bob', 'Nice!');
    expect(res[0].comments?.length).toBe(1);
    expect(res[0].comments?.[0].authorName).toBe('Bob');
  });
});
