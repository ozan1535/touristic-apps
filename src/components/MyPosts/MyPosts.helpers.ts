import { supabase } from "@/lib/supabase/client";

export const handlePost = async (
  newPost,
  setIsPosting,
  setError,
  userData,
  setPostsList,
  setNewPost,
  router,
  user
) => {
  if (!newPost.trim()) return;

  setIsPosting(true);
  setError("");

  try {
    const { error: insertError } = await supabase.from("posts").insert({
      post: newPost.trim(),
      user_id: user.id,
    });

    if (insertError) {
      setError("Failed to create post.");
      setIsPosting(false);
      return;
    }

    const { data: posts, error: fetchError } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", userData.kinde_user_id)
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError("Failed to load posts.");
      setIsPosting(false);
      return;
    }

    setPostsList(posts || []);
    setNewPost("");
  } catch (err) {
    setError("Something went wrong. Please try again.");
  } finally {
    setIsPosting(false);
    router.refresh();
  }
};
