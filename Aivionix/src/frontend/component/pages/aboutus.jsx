function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-950 via-indigo-950 to-black text-white text-white flex items-center justify-center">

      <div className="max-w-4xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-10">

        <h1 className="text-4xl font-bold mb-6 text-center">
          About Us
        </h1>

        <p className="text-lg mb-4">
         Aivionix is a student‑built project focused on keeping everyday users safe from confusing and risky digital messages. Our goal is to make it easy for anyone to understand whether an SMS, WhatsApp chat, email or link looks trustworthy or not
        </p>

        <p className="text-lg mb-4">
          Instead of technical jargon, Aivionix gives simple risk levels and short explanations that people can actually act on. Behind the scenes we combine rule‑based checks with basic machine learning to highlight red flags like urgent money requests, fake KYC alerts, and suspicious links.
        </p>

        <p className="text-lg mb-6">
         This project also helps us learn modern web development and AI in a practical way, by building something that can genuinely protect friends, family, and first‑time smartphone users.
        </p>

        <div className="text-center">
          <a
            href="/"
            className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </a>
        </div>

      </div>

    </div>
  );
}

export default About;