import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useTranslateStore } from "../store/useTranslateStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { targetLang, setTargetLang } = useTranslateStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">ChatSphere</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {authUser && (
              <div className="w-full sm:w-auto mt-2 sm:mt-0">
                <select
                  className="select select-bordered select-sm w-full sm:w-auto"
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                >
                  <option value="ar">Arabic</option>
                  <option value="as">Assamese</option>
                  <option value="bn">Bangla (Bengali)</option>
                  <option value="zh-Hans">Chinese (Simplified)</option>
                  <option value="nl">Dutch</option>
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="gu">Gujarati</option>
                  <option value="hi">Hindi</option>
                  <option value="it">Italian</option>
                  <option value="ja">Japanese</option>
                  <option value="kn">Kannada</option>
                  <option value="ks">Kashmiri</option>
                  <option value="ko">Korean</option>
                  <option value="ml">Malayalam</option>
                  <option value="mr">Marathi</option>
                  <option value="ne">Nepali</option>
                  <option value="or">Odia</option>
                  <option value="pa">Punjabi</option>
                  <option value="pt">Portuguese</option>
                  <option value="ru">Russian</option>
                  <option value="sd">Sindhi</option>
                  <option value="es">Spanish</option>
                  <option value="ta">Tamil</option>
                  <option value="te">Telugu</option>
                  <option value="tr">Turkish</option>
                  <option value="ur">Urdu</option>
                  <option value="vi">Vietnamese</option>
                </select>
              </div>
            )}

            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
