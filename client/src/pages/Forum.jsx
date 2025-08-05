import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForumPosts, createForumPost } from '../features/forumSlice';

export default function Forum() {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.forum);
  const { user } = useSelector((state) => state.auth);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    dispatch(fetchForumPosts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createForumPost(newPost));
    setNewPost({ title: '', content: '' });
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Community Forum</h1>
          {user && (
            <Link
              to="/forum/new"
              className="btn-primary"
            >
              New Post
            </Link>
          )}
        </div>

        {status === 'loading' && <div className="text-center py-8">Loading posts...</div>}
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}

        {/* New Post Form (simplified version) */}
        {user && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Post title"
                  className="input-field w-full"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="What's on your mind?"
                  className="input-field w-full min-h-[100px]"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-primary">
                Post
              </button>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={post.author.profile.avatar || '/default-avatar.png'}
                      alt={post.author.profile.name}
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/forum/${post._id}`}
                        className="text-lg font-semibold hover:text-primary"
                      >
                        {post.title}
                      </Link>
                      <span className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-600">{post.content}</p>
                    <div className="mt-4 flex items-center">
                      <span className="text-sm text-gray-500">
                        {post.comments.length} comments
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">
                        {post.upvotes} upvotes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && status !== 'loading' && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600">No posts yet. Be the first to start a discussion!</p>
          </div>
        )}
      </div>
      {posts.map((post) => (
  <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
    <Link to={`/forum/${post._id}`} className="block p-6 hover:bg-gray-50">
      <div className="flex items-start">
        <img
          className="h-10 w-10 rounded-full mr-4"
          src={post.author.profile.avatar || '/default-avatar.png'}
          alt={post.author.profile.name}
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
          <p className="text-gray-600 text-sm mb-2">
            Posted by {post.author.profile.name} •{' '}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 line-clamp-2">{post.content}</p>
          <div className="flex items-center mt-3 text-sm text-gray-500">
            <span className="mr-4">
              {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
            </span>
            <span>{post.upvotes} upvotes</span>
          </div>
        </div>
      </div>
    </Link>
  </div>
))}
    </div>
  );
}