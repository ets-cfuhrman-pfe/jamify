export type Comment = {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: number;
};

export type PostIt = {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  color: string;
  timestamp: number;
  likes: string[];
  comments?: Comment[];
};

export function toggleLike(postIts: PostIt[], postItId: string, userId: string): PostIt[] {
  return postIts.map((p) => {
    if (p.id !== postItId) return p;
    const likes = p.likes || [];
    const hasLiked = likes.includes(userId);
    return { ...p, likes: hasLiked ? likes.filter((id) => id !== userId) : [...likes, userId] };
  });
}

export function addComment(postIts: PostIt[], postItId: string, authorId: string, authorName: string, content: string): PostIt[] {
  const draft = (content || '').trim();
  if (!draft) return postIts;
  const newComment: Comment = {
    id: `comment_${Date.now()}_${Math.random()}`,
    authorId,
    authorName,
    content: draft,
    timestamp: Date.now(),
  };
  return postIts.map((p) => (p.id === postItId ? { ...p, comments: [...(p.comments || []), newComment] } : p));
}
