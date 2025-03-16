import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/conf";
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Container>
                    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg text-gray-800">
                        <h1 className="text-4xl font-extrabold mb-4">Welcome to Our Blog</h1>
                        <p className="text-lg">Login to access amazing content and stay updated with the latest posts.</p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full min-h-screen bg-gray-100 py-12'>
            <Container>
                <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900">Latest Posts</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {posts.map((post) => (
                        <div key={post.$id} className="transform hover:scale-105 transition duration-300">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
