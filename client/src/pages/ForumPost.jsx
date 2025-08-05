import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForumPostById, addComment } from '../features/forumSlice';
import { useAuth } from '../hooks/useAuth';

export default function ForumPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { requireAuth } = useAuth();
  const { currentPost, status, error } = useSelector((state) => state.forum);
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    dispatch(fetchForumPostById(id));
  }, [id, dispatch]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    
    requireAuth(() => {
      dispatch(addComment({ postId: id, content: commentContent }));
      setCommentContent('');
    }, '/login');
  };

  if (status === 'loading') {
    return <div className="text-center py-8">Loading post...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => navigate(-1)}
          className="btn-primary"
        >
          Back to Forum
        </button>
      </div>
    );
  }

  if (!currentPost) {
    return <div className="text-center py-8">Post not found</div>;
  }

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary mb-6"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Forum
        </button>

        {/* Main Post */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex items-start mb-4">
              <img
                className="h-10 w-10 rounded-full mr-4"
                src={currentPost.author.profile.avatar || '/default-avatar.png'}
                alt={currentPost.author.profile.name}
              />
              <div>
                <h1 className="text-2xl font-bold">{currentPost.title}</h1>
                <p className="text-gray-500 text-sm">
                  Posted by {currentPost.author.profile.name} •{' '}
                  {new Date(currentPost.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="prose max-w-none mt-4">
              <p>{currentPost.content}</p>
            </div>
            <div className="flex items-center mt-6 pt-4 border-t border-gray-100">
              <button className="flex items-center text-gray-500 hover:text-primary">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                {currentPost.upvotes} Upvotes
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {currentPost.comments.length} {currentPost.comments.length === 1 ? 'Comment' : 'Comments'}
          </h2>

          {currentPost.comments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentPost.comments.map((comment) => (
                <div key={comment._id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-start">
                    <img
                      className="h-8 w-8 rounded-full mr-3"
                      src={comment.author.profile.avatar || '/default-avatar.png'}
                      alt={comment.author.profile.name}
                    />
                    <div>
                      <p className="font-medium">{comment.author.profile.name}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                      <p className="mt-1 text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Comment Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium mb-4">Add a Comment</h3>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              className="input-field w-full min-h-[100px] mb-4"
              placeholder="Write your comment here..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              required
            ></textarea>
            <button type="submit" className="btn-primary">
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}