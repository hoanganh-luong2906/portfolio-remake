import PostEditorClient from "../../components/PostEditorClient";

export const metadata = { title: "Edit Post · Admin" };

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PostEditorClient mode="edit" postId={Number(id)} />;
}
