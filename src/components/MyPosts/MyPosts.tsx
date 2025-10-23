"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, User } from "lucide-react";
import React, { useState } from "react";

interface Post {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

interface MyPostsProps {
  posts: Post[];
}

function MyPosts({ posts }: MyPostsProps) {
  const [newPost, setNewPost] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [postsList, setPostsList] = useState<Post[]>(posts);

  const handlePost = async () => {
    if (!newPost.trim()) return;

    setIsPosting(true);

    const post: Post = {
      id: Date.now(),
      author: "Admin User",
      content: newPost,
      timestamp: "Just now",
    };

    await new Promise((resolve) => setTimeout(resolve, 500));

    setPostsList([post, ...postsList]);
    setNewPost("");
    setIsPosting(false);
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 shadow-xl">
      <div className="mb-6">
        <h1 className="text-white font-bold text-2xl mb-1 flex items-center gap-2">
          <MessageSquare className="text-purple-400" size={28} />
          My Posts
        </h1>
        <p className="text-gray-400 text-sm">
          Share your travel tips and experiences with the community
        </p>
      </div>

      <div className="mb-6 bg-slate-800/30 border border-purple-500/20 rounded-lg p-4">
        <Textarea
          placeholder="Share a travel tip or experience..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="bg-slate-800/50 border-purple-500/30 text-gray-100 placeholder:text-gray-500 focus:border-purple-400 min-h-[100px] mb-3"
          disabled={isPosting}
        />
        <div className="flex justify-end">
          <Button
            onClick={handlePost}
            disabled={isPosting || !newPost.trim()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold border-0 shadow-lg"
          >
            {isPosting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Posting...
              </>
            ) : (
              <>
                <Send className="mr-2" size={18} />
                Post
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {postsList.length > 0 ? (
          postsList.map((post) => (
            <div
              key={post.id}
              className="bg-slate-800/30 border border-purple-500/20 rounded-lg p-4 hover:border-purple-500/40 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                  <User className="text-purple-400" size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-sm">
                      {post.author}
                    </h3>
                    <span className="text-gray-400 text-xs">
                      {post.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {post.content}
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
            <p className="text-gray-400">
              No posts yet. Share your first travel tip!
            </p>
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
