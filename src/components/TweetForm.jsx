import { useEffect, useState } from "react";
import Button from "./Button";
import Select from "./Select";
import Textarea from "./Textarea";
import API, { get, responseValidator } from "../utils/api";
import Loader from "./Loader";

export default function TweetForm(props) {
    const [formData, setFormData] = useState(
        props.tweet
            ? {
                  category: props.tweet.category,
                  content: props.tweet.content,
              }
            : {
                  category: props.category ? props.category : "",
                  content: "",
              }
    );
    const [errors, setErrors] = useState({
        category: "",
        content: "",
    });
    const [categories, setCategories] = useState(undefined);

    useEffect(() => {
        get(API.tweet.categories, (data, status) => {
            if (responseValidator(status)) {
                setCategories(data);
            }
        });
    }, []);

    const handleValidate = (data) => {
        let validate = true;

        if (!data.content) {
            setErrors((prev) => ({ ...prev, content: "This filed is required!" }));
            validate = false;
        }
        if (!data.category) {
            setErrors((prev) => ({ ...prev, category: "This filed is required!" }));
            validate = false;
        }

        return validate;
    };

    const handleSubmit = () => {
        if (handleValidate(formData)) {
            props.onSubmit(formData);
        }
    };

    return (
        <>
            {categories ? (
                <div>
                    {!props.category && (
                        <Select
                            value={formData.category}
                            error={errors.category}
                            className="mb-4"
                            label="Category"
                            options={categories.map((category) => ({
                                title: category,
                                value: category,
                            }))}
                            onChange={(e) => {
                                setFormData({ ...formData, category: e.target.value });
                                setErrors({ ...errors, category: "" });
                            }}
                        />
                    )}
                    <Textarea
                        value={formData.content}
                        error={errors.content}
                        className="mb-4"
                        label="Content"
                        onChange={(e) => {
                            setFormData({ ...formData, content: e.target.value });
                            setErrors({ ...errors, content: "" });
                        }}
                    />
                    <Button disabled={props.loading} onClick={handleSubmit}>
                        {props.tweet ? "Edit Tweet" : "Create tweet"}
                    </Button>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
}
