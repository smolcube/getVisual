import React from 'react';
import { useParams } from 'react-router-dom';

// Sample data representing pending posts
const pendingPosts = [
  {
    id: 1,
    title: 'Post 1 Title',
    username: '@User1',
  },
  {
    id: 2,
    title: 'Post 2 Title',
    username: '@User2',
  },
  {
    id: 3,
    title: 'Post 3 Title',
    username: '@User3',
  },
];

export default function DashTables() {
  const { state } = useParams();

  return (
    <div className="posts-container">
      <div className="posts-container__table">
      <div className="posts-container__table--title">
        <h1>{state} Posts</h1>
        <p>Keeping track of unpublished gems to shine.</p>
      </div>
        <div className="posts-container__table--wrapper">
        {/* Map through pendingPosts and display username and title in separate columns */}
        {pendingPosts.map(post => (
          <>
            <div className="posts-container__table--column1">
              {post.username}
            </div>
            <div className="posts-container__table--column2">
              {post.title}
            </div>
            <div className="posts-container__table--column3">
              <button>accept</button>
              <button>delete</button>
            </div>
          </>
        ))}
          </div>
      </div>
    </div>
  );
}
