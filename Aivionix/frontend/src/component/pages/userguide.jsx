function UserGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-950 via-indigo-950 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          User Guide
        </h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Use Aivionix</h2>
            <ol className="space-y-2 list-decimal pl-6 text-white/80">
              <li>Paste suspicious message, SMS, email or link into the checker.</li>
              <li>Get instant risk score: Safe, Caution, High Risk.</li>
              <li>Read simple explanation of detected issues.</li>
              <li>Take action: block, report or ignore safely.</li>
            </ol>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">What We Check</h2>
            <ul className="space-y-2 pl-6 text-white/80">
              <li>Urgent money requests</li>
              <li>Fake KYC / bank alerts</li>
              <li>Suspicious links & shorteners</li>
              <li>Unusual sender behavior</li>
              <li>Task / job scams</li>
            </ul>
          </section>
          <div className="text-center">
            <a
              href="/"
              className="px-8 py-4 bg-blue-900 text-white rounded-xl hover:bg-blue-700 transition text-lg font-medium"
            >
              Start Checking Messages
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserGuide;

