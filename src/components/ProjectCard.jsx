// src/components/ProjectCard.jsx
import React from "react";

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 mb-4 shadow-sm relative">
      <div className="flex gap-4">
        <img
          src={project.image || "/img/room.jpg"}
          alt="project"
          className="w-32 h-24 object-cover rounded-lg"
        />
        <div className="flex-1">
          <p className="text-sm text-gray-400">23/04 15:46</p>
          <p className="font-semibold text-sm leading-snug mt-1">
            {project.title}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button className="text-gray-500 text-xl font-bold" onClick={onEdit}>
            ...
          </button>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>💬</span>
            <span>52</span>
          </div>
        </div>
      </div>
    </div>
  );
}
