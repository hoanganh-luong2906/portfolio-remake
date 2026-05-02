import PostEditorClient from "../../components/PostEditorClient";

export const metadata = { title: "New Post · Admin" };

export default function NewPostPage() {
  return <PostEditorClient mode="new" />;
}
