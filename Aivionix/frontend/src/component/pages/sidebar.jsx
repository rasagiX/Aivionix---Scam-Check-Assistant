import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Home,
  MessageSquare,
  Clock,
  Settings,
  LogOut,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setProfilePhoto(
        localStorage.getItem("aivionixProfilePhoto") || u?.photoURL || ""
      );
    });

    const updatePhoto = () => {
      setProfilePhoto(localStorage.getItem("aivionixProfilePhoto") || "");
    };

    window.addEventListener("profilePhotoUpdated", updatePhoto);

    return () => {
      unsubscribe();
      window.removeEventListener("profilePhotoUpdated", updatePhoto);
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Chat", path: "/chat", icon: MessageSquare },
    { name: "History", path: "/history", icon: Clock },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const avatarLetter =
    user?.displayName?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <aside className="relative h-screen w-72 shrink-0 overflow-hidden border-r border-white/10 bg-[#030712] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(99,102,241,0.18),transparent_28%),linear-gradient(180deg,#030712_0%,#081126_50%,#020617_100%)]" />
      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative z-10 flex h-full flex-col p-5">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
            <ShieldCheck className="h-5 w-5 text-violet-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Aivionix</h1>
            <p className="text-xs text-slate-400">Scam Check Assistant</p>
          </div>
        </div>

        <div className="relative mb-8">
          <button
            onClick={() => setOpen(!open)}
            className="flex w-full items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.05] p-3 text-left transition hover:bg-white/[0.08]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 font-bold">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                avatarLetter
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-slate-400">Logged in as</p>
              <p className="truncate text-sm font-medium">
                {user?.displayName || user?.email || "User"}
              </p>
            </div>

            <ChevronDown
              className={`h-4 w-4 text-slate-400 transition ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute left-0 top-[74px] z-50 w-full rounded-3xl border border-white/10 bg-[#071126] p-2 shadow-2xl">
              <button
                onClick={() => navigate("/settings")}
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-300 hover:bg-white/[0.07]"
              >
                <Settings size={16} />
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-red-300 hover:bg-red-500/10"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-[0_12px_30px_rgba(99,102,241,0.3)]"
                      : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm font-semibold">Stay protected</p>
            <p className="mt-2 text-xs leading-6 text-slate-400">
              Check messages before you click, reply, or share personal details.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl border border-red-400/15 bg-red-500/10 px-4 py-3.5 text-sm font-medium text-red-300 hover:bg-red-500/15"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}