"use client";
import Gradient from '@/components/ui/Gradient';
import { useEffect, useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
import BlogVideoListingPage from "./BlogListing";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
//fgdd
  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog?limit=100`)
      .then(res => res.json())
      .then(json => {
        setBlogs(json.data?.blogs || []);
      })
      .catch(err => {
        console.error("Failed to load blogs for search:", err);
        setBlogs([]);
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
    <div className="w-full ">
             <div
            className="
    w-full mt-[66px] md:mt-[83px] py-[50px] md:pt-[100px] md:pb-s32
    bg-secondary-main
    flex items-center justify-center
    "
        >
            <section className="max-w-7xl flex flex-col px-s32 gap-s16 md:gap-s24 mx-auto text-center ">
                <h1 className="text-3xl leading-tight  font-bold md:text-5xl md:leading-relaxed font-primary  text-primary-main">
                  Blog
                </h1>
                <p className='text-sm md:text-lg md:font-medium md:leading-relaxed text-center text-main max-w-3xl mx-auto'>Deep dive into legal topics and understand the laws that actually apply in daily life.</p>
            </section>
        </div>
      <div className='pb-s40 md:pb-s48 lg:pb-s64  md:px-0 '>

        <div className=" bg-secondary-main mb-s16 px-s24 pb-[50px]">
          <SearchBar
            items={blogs}
            onSearch={handleSearch}
            placeholder="Search blogs..."
          />
        </div>

        <BlogVideoListingPage
          searchQuery={searchQuery}
          onClearSearch={handleClearSearch}
        />
      </div>
    </div>
  );
}


