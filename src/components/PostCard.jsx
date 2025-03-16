import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/conf";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group">
      <div className="relative w-full bg-white shadow-md border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.05]">
        
        {/* Image Section with Uniform Shape */}
        <div className="w-full h-56 overflow-hidden rounded-t-2xl">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Title Section with Better Spacing */}
        <div className="p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500 transition-all duration-300">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
