import { ArrowPathIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import API, { post, responseValidator } from "../utils/api";

export default function Like(props) {
    const [liked, setLiked] = useState(props.liked);
    const [count, setCount] = useState(props.count);
    const [loading, setLoading] = useState(false);

    const handleLike = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            if (liked) {
                setLiked(false);
                setCount(parseInt(count) - 1);
            } else {
                setLiked(true);
                setCount(parseInt(count) + 1);
            }
            post(
                liked ? API.tweet.dislike(props.id) : API.tweet.like(props.id),
                {},
                (data, status) => {
                    setLoading(false);
                }
            );
        }
    };

    return (
        <>
            <div className="flex items-center gap-1 cursor-pointer relative" onClick={handleLike}>
                <div className={`${liked ? "heart heart-full is_animating" : "heart"}`}></div>
                <p className={`text-sm ${liked ? "text-red-600" : "text-gray-600"}`}>{count}</p>
            </div>
            {/* {loading ? (
                <div
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                    className="animate-spin"
                >
                    <ArrowPathIcon className="w-5 h-5 text-gray-500" />
                </div>
            ) : (
               
            )} */}
        </>
    );
}
