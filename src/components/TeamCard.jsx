import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar, FaMapMarkerAlt } from "react-icons/fa";

export default function TeamCard({ team }) {
  const visibleTags = team.tags.slice(0, 2);
  const hiddenTagsCount = team.tags.length - 2;

  return (
    <Link
      to={`/teams/${team.id}`}
      className="w-[48%] bg-yellow-50 rounded-xl mb-4 overflow-hidden hover:shadow"
    >
      <div className="relative w-full h-40">
        <img
          src={team.image}
          alt={team.title}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white">
          {team.liked ? <FaHeart color="#facc15" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="p-3 space-y-1">
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <FaStar className="text-black" size={12} />
          <span>{team.rating} ({team.reviews} отзывов)</span>
        </div>

        <p className="font-medium text-sm line-clamp-2">{team.title}</p>

        <div className="flex flex-wrap items-center gap-2 mt-1">
          {visibleTags.map((tag, i) => (
            <span
              key={i}
              className="bg-yellow-200 text-xs px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
          {hiddenTagsCount > 0 && (
            <span className="bg-yellow-200 text-xs px-2 py-0.5 rounded-full">
              +{hiddenTagsCount}
            </span>
          )}
        </div>

        <div className="flex items-center text-xs text-gray-600 mt-2">
          <FaMapMarkerAlt className="mr-1" size={12} />
          {team.location}
        </div>
      </div>
    </Link>
  );
}
