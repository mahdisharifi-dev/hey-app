import { useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { useEffect, useState } from "react";
import API, { get, post, responseValidator } from "../utils/api";
import TweetCard from "../components/TweetCard";
import TweetForm from "../components/TweetForm";
import { toast } from "react-toastify";

export default function Tweet() {
    const [tweet, setTweet] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const params = useParams();

    useEffect(() => {
        setTweet(undefined);
        get(API.tweet.single(params.id), (data, status) => {
            if (responseValidator(status)) {
                setTweet(data);
            }
        });
    }, [params.id]);

    const handleReply = (formData) => {
        setLoading(true);
        post(API.tweet.create, { ...formData, tweet_id: tweet.id }, (data, status) => {
            setLoading(false);
            if (responseValidator(status)) {
                toast.success("Reply Created Successfully.");
                setTweet({
                    ...tweet,
                    replies_count: Number(tweet.replies_count) + 1,
                    replies: [data, ...tweet.replies],
                });
            }
        });
    };

    return (
        <div className="h-full flex flex-col">
            <PageTitle title="Tweet" />
            <div className="overflow-auto no-scrollbar">
                {tweet ? (
                    <div>
                        <TweetCard tweet={tweet} />
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Reply</h3>
                            <TweetForm
                                loading={loading}
                                onSubmit={handleReply}
                                category={tweet.category}
                            />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Replies</h3>
                        {tweet.replies.length === 0
                            ? "No Replies"
                            : tweet.replies.map((item) => <TweetCard key={item.id} tweet={item} />)}
                    </div>
                ) : (
                    "Loading"
                )}
            </div>
        </div>
    );
}
