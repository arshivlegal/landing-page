"use client";
import { useEffect, useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
import VideoListingPage from "./VideoListing";
import Gradient from "@/components/ui/Gradient";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video?limit=100`)
      .then(res => res.json())
      .then(json => {
        setVideos(json.data?.videos || []);
      })
      .catch(err => {
        console.error("Failed to load videos for search:", err);
        setVideos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <main className="w-full bg-background  ">
          <div
            className="
    w-full mt-[66px] md:mt-[83px] py-[50px] md:pt-[100px] md:pb-s32
    bg-secondary-main
    flex items-center justify-center
    "
        >
            <section className="max-w-7xl flex flex-col px-s32 gap-s16 md:gap-s24 mx-auto text-center ">
                <h1 className="text-3xl leading-tight  font-bold md:text-5xl md:leading-relaxed font-primary  text-primary-main">
                  Daily Legal Content
                </h1>
                <p className='text-sm md:text-lg md:font-medium md:leading-relaxed text-center text-main max-w-3xl mx-auto'>Understand the law as it actually applies to you with legal insights that keep things clear. </p>
            </section>
        </div>
     

      <div className=''>

        <div className=" pb-[50px] px-s24 mb-s16 bg-secondary-main">
      <SearchBar
        items={videos}
        onSearch={handleSearch}
        placeholder="Search daily videos..."
      />
    </div>


      <VideoListingPage 
        searchQuery={searchQuery} 
        onClearSearch={handleClearSearch}
      />
      </div>

    </main>
  );
}