import React from "react";
import ProfileSidebar from "@/components/ProfileSidebar/ProfileSidebar";
import MyTrips from "@/components/MyTrips/MyTrips";
import MyPosts from "@/components/MyPosts/MyPosts";

const getUserData = async () => {
  return {
    name: "Admin User",
    bio: "Exploring the world one country at a time. Passionate about discovering local cultures and hidden gems.",
    profileImage: "/english-flag.png",
    joinDate: "January 2024",
    tripsCount: 12,
    postsCount: 45,
  };
};

const getUserTrips = async () => {
  return [
    {
      id: 1,
      title: "Cherry Blossoms in Japan",
      country: "Japan",
      description:
        "A wonderful week exploring Tokyo and Kyoto during the sakura season.",
      image: "/english-flag.png",
      date: "March 2024",
      duration: "7 days",
    },
    {
      id: 2,
      title: "Alpine Adventures",
      country: "Switzerland",
      description:
        "Hiking through the stunning Swiss Alps and exploring charming villages.",
      image: "/english-flag.png",
      date: "July 2024",
      duration: "10 days",
    },
    {
      id: 3,
      title: "Mediterranean Magic",
      country: "Greece",
      description: "Island hopping through Santorini, Mykonos, and Athens.",
      image: "/english-flag.png",
      date: "September 2024",
      duration: "14 days",
    },
    {
      id: 11,
      title: "Cherry Blossoms in Japan",
      country: "Japan",
      description:
        "A wonderful week exploring Tokyo and Kyoto during the sakura season.",
      image: "/english-flag.png",
      date: "March 2024",
      duration: "7 days",
    },
    {
      id: 21,
      title: "Alpine Adventures",
      country: "Switzerland",
      description:
        "Hiking through the stunning Swiss Alps and exploring charming villages.",
      image: "/english-flag.png",
      date: "July 2024",
      duration: "10 days",
    },
    {
      id: 231,
      title: "Mediterranean Magic",
      country: "Greece",
      description: "Island hopping through Santorini, Mykonos, and Athens.",
      image: "/english-flag.png",
      date: "September 2024",
      duration: "14 days",
    },
  ];
};

const getUserPosts = async () => {
  return [
    {
      id: 1,
      author: "Admin User",
      content:
        "Just got back from France and it was amazing! The food, the culture, everything was perfect. Highly recommend visiting Lyon for authentic French cuisine.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      author: "Admin User",
      content:
        "Pro tip: Always download offline maps before traveling. Saved me multiple times in rural Japan!",
      timestamp: "1 day ago",
    },
    {
      id: 3,
      author: "Admin User",
      content:
        "The sunrise at Santorini is overrated... because it's even better than the photos! 🌅",
      timestamp: "3 days ago",
    },
    {
      id: 12,
      author: "Admin User",
      content:
        "Just got back from France and it was amazing! The food, the culture, everything was perfect. Highly recommend visiting Lyon for authentic French cuisine.",
      timestamp: "2 hours ago",
    },
    {
      id: 22,
      author: "Admin User",
      content:
        "Pro tip: Always download offline maps before traveling. Saved me multiple times in rural Japan!",
      timestamp: "1 day ago",
    },
    {
      id: 32,
      author: "Admin User",
      content:
        "The sunrise at Santorini is overrated... because it's even better than the photos! 🌅",
      timestamp: "3 days ago",
    },
  ];
};

async function ProfilePage() {
  const userData = await getUserData();
  const userTrips = await getUserTrips();
  const userPosts = await getUserPosts();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-4 md:p-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-80 flex-shrink-0">
          <ProfileSidebar userData={userData} />
        </aside>

        <main className="flex-1 flex flex-col gap-6">
          <MyTrips trips={userTrips} />
          <MyPosts posts={userPosts} />
        </main>
      </div>
    </div>
  );
}

export default ProfilePage;
