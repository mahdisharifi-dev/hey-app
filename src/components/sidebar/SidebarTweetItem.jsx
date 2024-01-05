import Like from "../Like";

export default function SidebarTweetItem(props) {
    return (
        <div className="border p-2 rounded-lg mb-4">
            <div className="flex items-center justify-between gap-2">
                <p>{props.tweet.user.name}</p>
                <Like
                    id={props.tweet.id}
                    count={props.tweet.likes_count}
                    liked={props.tweet.liked}
                />
            </div>
            <p className="text-sm text-justify mt-1 text-gray-600">{props.tweet.content}</p>
        </div>
    );
}
