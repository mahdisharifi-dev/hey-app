import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import TweetForm from "../components/TweetForm";
import API, { post, responseValidator } from "../utils/api";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "../components/Loader";

export default function CreateTweet() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreateTweet = (formData) => {
        setLoading(true);
        post(API.tweet.create, formData, (data, status) => {
            setLoading(false);
            if (responseValidator(status)) {
                navigate("/");
                toast.success("Tweet Created Successfully.");
            }
        });
    };

    return (
        <div className="h-full flex flex-col">
            <PageTitle title="Create Your Tweet" />
            <div className="overflow-auto no-scrollbar h-full">
                <TweetForm onSubmit={handleCreateTweet} loading={loading} />
            </div>
        </div>
    );
}
