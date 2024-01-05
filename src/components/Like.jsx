import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import API, { post, responseValidator } from "../utils/api";

export default function Like(props) {
    const [liked, setLiked] = useState(props.liked);
    const [count, setCount] = useState(props.count);

    const handleLike = (e) => {
        e.preventDefault();

        post(liked ? API.tweet.dislike(props.id) : API.tweet.like(props.id), {}, (data, status) => {
            if (responseValidator(status)) {
                if (liked) {
                    setLiked(false);
                    setCount(parseInt(count) - 1);
                } else {
                    setLiked(true);
                    setCount(parseInt(count) + 1);
                }
            }
        });
    };

    return (
        <div className="flex items-center gap-1 cursor-pointer" onClick={handleLike}>
            {liked ? (
                <HeartSolidIcon className="w-5 h-5 text-rose-600" />
            ) : (
                <HeartIcon className="w-5 h-5 text-gray-600" />
            )}
            <p className={`text-sm ${liked ? "text-red-600" : "text-gray-600"}`}>{count}</p>
        </div>
    );
}
