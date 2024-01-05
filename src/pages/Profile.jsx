import { useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";
import moment from "moment";

export default function Profile() {
    const user = useSelector((state) => state.auth.user);
    return (
        <div className="h-full flex flex-col">
            <PageTitle title="Profile" />
            <div className="flex flex-col gap-2">
                <p className="text-gray-600">
                    <b className="text-gray-800">Name:</b> {user.name}
                </p>
                <p className="text-gray-600">
                    <b className="text-gray-800">Email:</b> {user.email}
                </p>
                <p className="text-gray-600">
                    <b className="text-gray-800">Joined:</b> {moment(user.created_at).fromNow()}
                </p>
            </div>
        </div>
    );
}
