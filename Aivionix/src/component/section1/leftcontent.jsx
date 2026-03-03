export default function LeftContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
        Protect Yourself  <br />
        From Tricky Messages
      </h1>

      <p className="text-white/70 max-w-lg">
        Paste any SMS, WhatsApp message or link and get an instant risk check, so you don’t fall for fake offers, KYC alerts or money traps.
      </p>

      <div className="flex gap-4 pt-2">
        <button className="bg-white text-black px-6 py-3 rounded-xl">
          Check a Message
        </button>

        <button className="border border-white/20 px-6 py-3 rounded-xl">
         Learn More
        </button>
      </div>

      <p className="text-xs text-white/50 pt-2">
        Simple guidance for everyday users. No jargon, just clear ‘safe or risky’ answers.
      </p>
    </div>
  );
}