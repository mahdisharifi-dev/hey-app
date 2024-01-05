import { useEffect, useState } from "react";
import SidebarTweetItem from "./SidebarTweetItem";
import API, { get, responseValidator } from "../../utils/api";
import Loader from "../Loader";

export default function SidebarTweets() {
    const [tweets, setTweets] = useState(undefined);

    useEffect(() => {
        get(API.tweet.popular, (data, status) => {
            if (responseValidator(status)) {
                setTweets(data);
            }
        });
    }, []);

    return (
        <div className="mt-2 h-full overflow-auto no-scrollbar">
            <p className="text-sm text-gray-400 mb-2">Popular Tweets</p>
            {tweets ? (
                tweets.length > 0 ? (
                    tweets.map((tweet) => <SidebarTweetItem tweet={tweet} key={tweet.id} />)
                ) : (
                    "No Tweets!"
                )
            ) : (
                <Loader />
            )}
        </div>
    );
}
