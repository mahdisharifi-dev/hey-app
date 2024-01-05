import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import TweetCard from "../components/TweetCard";
import API, { get, responseValidator } from "../utils/api";
import { Link } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/24/outline";
import Loader from "../components/Loader";

export default function Home() {
    const [tweets, setTweets] = useState(undefined);

    useEffect(() => {
        get(API.tweet.list, (data, status) => {
            if (responseValidator(status)) {
                setTweets(data.data);
            }
        });
    }, []);

    const handleOnDeleteTweet = (id) => {
        setTweets((prev) => {
            if (prev) {
                return prev.filter((tweet) => tweet.id !== id);
            }
        });
    };

    return (
        <div className="h-full flex flex-col">
            <PageTitle title="Recent Tweets" />
            <Link
                to="tweet/create/"
                className="min-h-[42px] bg-teal-500 text-white w-full rounded-lg transition-colors hover:bg-teal-600 disabled:animate-bounce disabled:bg-gray-300 mb-4 flex items-center justify-center gap-2"
            >
                <PencilIcon className="w-5 h-5 text-white" />
                <p>What's in your mind ?</p>
            </Link>
            <div className="overflow-auto no-scrollbar h-full">
                {!tweets ? (
                    <div className="h-full">
                        <Loader />
                    </div>
                ) : tweets.length > 0 ? (
                    tweets.map((tweet) => (
                        <TweetCard onDelete={handleOnDeleteTweet} tweet={tweet} key={tweet.id} />
                    ))
                ) : (
                    "No Tweets"
                )}
            </div>
        </div>
    );
}
