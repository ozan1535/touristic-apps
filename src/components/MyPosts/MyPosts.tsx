"use client";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle, MessageSquare, Send, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase/client";
import React, { useState } from "react";
import { tr, enUS } from "date-fns/locale";
import { useParams, useRouter } from "next/navigation";
import { handlePost } from "./MyPosts.helpers";
import { IMyPostsProps, IPost } from "./MyPosts.types";
import Image from "next/image";
import { useTranslations } from "next-intl";

function MyPosts({ posts, userData, isOwner }: IMyPostsProps) {
  const t = useTranslations("Profile");
  const router = useRouter();
  const { locale } = useParams();
  const [newPost, setNewPost] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [postsList, setPostsList] = useState<IPost[]>(posts);
  const [error, setError] = useState("");
  const handleRemovePost = async (post: IPost) => {
    try {
      const response = await supabase.from("posts").delete().eq("id", post.id);
      router.refresh();
      setPostsList((prev) => prev.filter((item) => item.id !== post.id));
    } catch (error) {
      //console.error(error)
    }
  };
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 shadow-xl">
      <div className="mb-6">
        <h1 className="text-white font-bold text-2xl mb-1 flex items-center gap-2">
          <MessageSquare className="text-purple-400" size={28} />
          {isOwner ? t("myPosts") : t("Posts")}
        </h1>
      </div>

      {isOwner && (
        <div className="mb-6 bg-slate-800/30 border border-purple-500/20 rounded-lg p-4">
          <Textarea
            placeholder={t("shareTip")}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="bg-slate-800/50 border-purple-500/30 text-gray-100 placeholder:text-gray-500 focus:border-purple-400 min-h-[100px] mb-3"
            disabled={isPosting}
          />
          {error && (
            <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-400/50 rounded-xl px-4 py-4 mb-6 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <div className="p-1 bg-red-500/20 rounded-lg">
                <AlertCircle className="text-red-300 flex-shrink-0" size={20} />
              </div>
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}
          <div className="flex justify-end">
            <Button
              onClick={() =>
                handlePost(
                  newPost,
                  setIsPosting,
                  setError,
                  userData,
                  setPostsList,
                  setNewPost,
                  router
                )
              }
              disabled={isPosting || !newPost.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold border-0 shadow-lg"
            >
              {isPosting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {t("posting")}
                </>
              ) : (
                <>
                  <Send className="mr-2" size={18} />
                  {t("post")}
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {postsList.length > 0 ? (
          postsList.map((post) => (
            <div
              key={post.id}
              className="bg-slate-800/30 border border-purple-500/20 rounded-lg p-4 hover:border-purple-500/40 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="relative w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {userData.picture ? (
                    <Image
                      src={userData.picture}
                      alt={t("profilePicture")}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  ) : (
                    <User className="text-purple-400" size={20} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-sm">
                      {userData.name}
                    </h3>
                    <span className="text-gray-400 text-xs">
                      {formatDistanceToNow(new Date(post.created_at), {
                        addSuffix: true,
                        locale: locale === "tr" ? tr : enUS,
                      })}
                    </span>
                    {isOwner && (
                      <Trash2
                        size={24}
                        color="white"
                        onClick={() => handleRemovePost(post)}
                      />
                    )}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {post.post}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-purple-500/30 rounded-lg">
            <MessageSquare
              className="mx-auto mb-4 text-purple-400 opacity-50"
              size={48}
            />
            <p className="text-gray-400">{t("noPosts")}</p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.6);
        }
      `}</style>
    </div>
  );
}

export default MyPosts;
