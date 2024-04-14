
import React from 'react';

// Assuming you have an array of posts
const posts = [
    { id: 1, author: 'John Doe', content: 'Hello, world!' },
    { id: 2, author: 'Jane Smith', content: 'This is a sample post.' },
];

export default function Page() {
    return (
        <div>
            <h1>Hello, Dashboard Page!</h1>
            <div>
                {posts.map((post) => (
                    <div key={post.id}>
                        <h3>{post.author}</h3>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}