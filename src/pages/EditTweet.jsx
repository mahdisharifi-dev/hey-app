import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import TweetForm from "../components/TweetForm";
import API, { get, patch, post, responseValidator } from "../utils/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

export default function EditTweet() {
    const [loading, setLoading] = useState(false);
    const [tweet, setTweet] = useState(undefined);
    const user = useSelector((state) => state.auth.user);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.id) {
            get(API.tweet.single(params.id), (data, status) => {
                if (responseValidator(status)) {
                    if (data.user.id !== user.id) {
                        toast.error("You are not allow to do this action.");
                        navigate("/");
                        return;
                    }
                    setTweet(data);
                } else {
                    toast.error("Tweet not found!");
                    navigate("/");
                    return;
                }
            });
        }
    }, []);

    const handleEditTweet = (formData) => {
        if (tweet) {
            setLoading(true);
            patch(API.tweet.update(tweet.id), formData, (data, status) => {
                setLoading(false);
                if (responseValidator(status)) {
                    navigate("/");
                    toast.success("Tweet Edited Successfully.");
                }
            });
        }
    };

    return (
        <div className="h-full flex flex-col">
            <PageTitle title="Edit Your Tweet" />
            <div className="overflow-auto no-scrollbar h-full">
                {tweet ? (
                    <TweetForm tweet={tweet} onSubmit={handleEditTweet} loading={loading} />
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
}
