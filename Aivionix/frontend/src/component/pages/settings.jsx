import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
  updateProfile,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Shield,
  LogOut,
  Camera,
  Save,
  KeyRound,
  Moon,
  Sun,
  Loader2,
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [name, setName] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [theme, setTheme] = useState("dark");
  const [savingName, setSavingName] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (!u) {
        setAuthLoading(false);
        navigate("/login");
        return;
      }

      setUser(u);
      setName(u.displayName || "");
      setPhotoPreview(u.photoURL || "");
      setAuthLoading(false);
    });

    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    return () => unsubscribe();
  }, [navigate]);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3500);
  };

  const handleUpdateName = async () => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }

    if (!name.trim()) {
      showMessage("Name cannot be empty.", "error");
      return;
    }

    try {
      setSavingName(true);

      await updateProfile(auth.currentUser, {
        displayName: name.trim(),
      });

      setUser({ ...auth.currentUser });
      showMessage("Profile name updated successfully.");
    } catch (error) {
      console.error(error);
      showMessage("Failed to update profile name.", "error");
    } finally {
      setSavingName(false);
    }
  };

  const handleResetPassword = async () => {
    if (!user?.email) {
      showMessage("No email found for this account.", "error");
      return;
    }

    try {
      setSendingReset(true);
      await sendPasswordResetEmail(auth, user.email);
      showMessage("Password reset email sent.");
    } catch (error) {
      console.error(error);
      showMessage("Unable to send password reset email.", "error");
    } finally {
      setSendingReset(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
      showMessage("Logout failed. Please try again.", "error");
      setLoggingOut(false);
    }
  };

  const toggleTheme = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");

    showMessage(`Switched to ${newTheme} mode.`);
  };

  const handleImageUpload = async (e) => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }

    const file = e.target.files?.[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    try {
      await updateProfile(auth.currentUser, {
        photoURL: imageURL,
      });

      setPhotoPreview(imageURL);
      setUser({ ...auth.currentUser });
      showMessage("Profile image updated.");
    } catch (error) {
      console.error(error);
      showMessage("Failed to update profile image.", "error");
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-white">
        <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-xl">
          <Loader2 className="h-5 w-5 animate-spin text-violet-300" />
          <span className="text-slate-300">Loading settings...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] px-6 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(59,130,246,0.08),transparent_24%),radial-gradient(circle_at_82%_75%,rgba(139,92,246,0.12),transparent_24%),linear-gradient(135deg,#030712_0%,#081126_42%,#020617_100%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.9)]" />
            Account Settings
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Manage Your
            <span className="text-violet-300"> Aivionix Profile</span>
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            Update your profile, appearance, and security preferences. These
            settings are only available when you are logged in.
          </p>
        </div>

        {message && (
          <div
            className={`mb-6 rounded-2xl border px-5 py-4 text-sm ${
              messageType === "success"
                ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                : "border-red-400/20 bg-red-500/10 text-red-300"
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Profile summary */}
          <section className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-500 to-violet-500 text-4xl font-bold shadow-[0_0_40px_rgba(99,102,241,0.28)]">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user?.email?.charAt(0).toUpperCase()
                  )}
                </div>

                <label className="absolute -bottom-3 -right-3 flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-[#081126] text-violet-300 shadow-xl transition hover:bg-white/[0.08]">
                  <Camera className="h-5 w-5" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              <h2 className="mt-7 text-2xl font-semibold">
                {user?.displayName || "Aivionix User"}
              </h2>

              <p className="mt-2 text-sm text-slate-400">{user?.email}</p>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-left">
                <p className="text-sm font-semibold text-white">
                  Profile safety note
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  Keep your email secure and never share OTPs, passwords, or
                  banking details with unknown sources.
                </p>
              </div>
            </div>
          </section>

          {/* Controls */}
          <section className="space-y-6">
            {/* Profile */}
            <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.06]">
                  <User className="h-5 w-5 text-violet-300" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Profile</h2>
                  <p className="text-sm text-slate-400">
                    Change your display name.
                  </p>
                </div>
              </div>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter display name"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-violet-400/40"
              />

              <button
                onClick={handleUpdateName}
                disabled={savingName}
                className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingName ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Changes
              </button>
            </div>

            {/* Appearance */}
            <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.06]">
                  {theme === "dark" ? (
                    <Moon className="h-5 w-5 text-cyan-300" />
                  ) : (
                    <Sun className="h-5 w-5 text-amber-300" />
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-semibold">Appearance</h2>
                  <p className="text-sm text-slate-400">
                    Switch your visual mode.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.035] p-4">
                <div>
                  <p className="font-medium">
                    {theme === "dark" ? "Dark Mode" : "Light Mode"}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Current mode is saved on this device.
                  </p>
                </div>

                <button
                  onClick={toggleTheme}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.1]"
                >
                  Switch to {theme === "dark" ? "Light" : "Dark"}
                </button>
              </div>
            </div>

            {/* Security */}
            <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.06]">
                  <KeyRound className="h-5 w-5 text-amber-300" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Security</h2>
                  <p className="text-sm text-slate-400">
                    Send a password reset link to your email.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
                <div className="mb-4 flex items-center gap-3 text-slate-300">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-sm">{user?.email}</span>
                </div>

                <button
                  onClick={handleResetPassword}
                  disabled={sendingReset}
                  className="inline-flex items-center gap-2 rounded-2xl bg-amber-500/15 px-5 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sendingReset ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Shield className="h-4 w-4" />
                  )}
                  Send Reset Email
                </button>
              </div>
            </div>

            {/* Danger zone */}
            <div className="rounded-[32px] border border-red-400/20 bg-red-500/10 p-6 backdrop-blur-xl">
              <h2 className="text-xl font-semibold text-red-300">
                Danger Zone
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Logging out will end your current session on this device.
              </p>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loggingOut ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
                Logout
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}