import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row gap-6 p-6 bg-white shadow-lg rounded-lg">
            {/* Left Section: Title, Slug, Content */}
            <div className="md:w-2/3 w-full space-y-4">
                <Input
                    label="Title"
                    placeholder="Enter Post Title"
                    className="w-full"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug"
                    placeholder="Generated Slug"
                    className="w-full"
                    {...register("slug", { required: true })}
                    onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
                />
                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            {/* Right Section: Image Upload, Status, Submit Button */}
            <div className="md:w-1/3 w-full space-y-6">
                <div className="border p-4 rounded-lg bg-gray-100">
                    <label className="text-gray-700 font-semibold">Featured Image</label>
                    <Input
                        type="file"
                        className="w-full mt-2"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="mt-4">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-40 object-cover rounded-lg shadow"
                            />
                        </div>
                    )}
                </div>

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="w-full"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    className={`w-full py-3 rounded-lg text-white transition-all duration-300 ${
                        post ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {post ? "Update Post" : "Create Post"}
                </Button>
            </div>
        </form>
    );
}
