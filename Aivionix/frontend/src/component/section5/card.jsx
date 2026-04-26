import React from "react";

const Card = ({ id, title, description, action, actionLabel }) => {
  return (
    <div
      className="
        relative overflow-hidden rounded-3xl
        border border-white/10
        bg-gradient-to-b from-white/5 to-white/[0.02]
        p-8 text-left backdrop-blur-xl
        transition-all duration-500
        hover:-translate-y-3
        hover:border-violet-400/30
        hover:shadow-[0_20px_80px_rgba(99,102,241,0.25)]
        group
      "
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.18),transparent_35%)]" />

      <div className="absolute right-6 top-6 text-xl text-white/30 transition group-hover:text-violet-300">
        ↗
      </div>

      <span className="text-sm text-white/40">{id}.</span>

      <h4 className="mt-6 mb-4 text-2xl font-semibold text-white">
        {title}
      </h4>

      <p className="text-sm leading-8 text-white/60">
        {description}
      </p>

      {action && (
        <button
          onClick={action}
          className="
            mt-6 rounded-2xl
            bg-gradient-to-r from-indigo-500 to-violet-500
            px-5 py-3 text-sm font-medium text-white
            transition duration-300
            hover:scale-[1.03]
            hover:shadow-[0_12px_30px_rgba(99,102,241,0.35)]
          "
        >
          {actionLabel || "Learn More"}
        </button>
      )}
    </div>
  );
};

export default Card;