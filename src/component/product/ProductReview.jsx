import React, { useState, useEffect } from 'react';

const reviews = [
    {
        id: 1,
        name: 'John Doe',
        rating: 5,
        comment: 'Amazing service! Highly recommend to everyone.',
        avatar: 'https://i.pravatar.cc/100?img=1',
    },
    {
        id: 2,
        name: 'Jane Smith',
        rating: 4,
        comment: 'Great experience, though delivery was a bit slow.',
        avatar: 'https://i.pravatar.cc/100?img=2',
    },
    {
        id: 3,
        name: 'Emily Johnson',
        rating: 3,
        comment: 'Good product but could be cheaper.',
        avatar: 'https://i.pravatar.cc/100?img=3',
    },
];

const ProductReview = () => {
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [ratings, setRatings] = useState({});

    // Carousel effect to auto-change reviews every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentReviewIndex((prevIndex) =>
                prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // 5 seconds interval

        return () => clearInterval(interval);
    }, []);

    const handleRating = (reviewId, rating) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [reviewId]: rating,
        }));
    };

    const handlePrevious = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
    };

    const currentReview = reviews[currentReviewIndex];
    const userRating = ratings[currentReview.id] || 0; 
    // Default rating is 0 if not set

    return (
        <div className="flex items-center justify-center h-screen 
        bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="relative w-full max-w-lg mx-auto px-4 
            py-8 bg-white shadow-lg rounded-lg text-center 
            transition-transform duration-500 ease-in-out">
                <h1 className="text-3xl font-bold mb-6 text-green-700">
                Customer Reviews</h1>

                {/* Carousel - Showing current review */}
                <div key={currentReview.id} className="space-y-4">
                    <img
                        src={currentReview.avatar}
                        alt={currentReview.name}
                        className="w-16 h-16 mx-auto rounded-full 
                        object-cover mb-4 border-2 border-gray-300"
                    />
                    <h2 className="text-xl font-semibold text-gray-800">
                        {currentReview.name}
                    </h2>
                    <p className="text-gray-600 italic">"{currentReview.comment}"</p>

                    {/* Star Rating Selection */}
                    <div className="flex justify-center items-center mt-4 space-x-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <svg
                                key={index}
                                onClick={() => handleRating(currentReview.id, 
                                index + 1)}
                                className={`h-6 w-6 cursor-pointer ${index < 
                                userRating ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M9.049.198l.951.595 3.636.56-2.772 
                                2.977L12.5 8l-3.636-.564L9.05 5.8 8.636 8 5 
                                8l1.786-3.671-2.772-2.976 3.637-.56.95-.595z" />
                            </svg>
                        ))}
                    </div>
                    <p className="text-gray-600 mt-2">User Rating: {userRating} 
                    stars</p>
                </div>

                {/* Left and Right Arrows */}
                <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2
                    bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 
                    focus:outline-none"
                    onClick={handlePrevious}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        ></path>
                    </svg>
                </button>
                <button
                    className="absolute right-2 top-1/2 transform 
                    -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full 
                    hover:bg-gray-800 focus:outline-none"
                    onClick={handleNext}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ProductReview;