import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
  onNavigate: (page: string) => void;
}

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app this would validate credentials
    if (email && password) {
      onLogin();
      onNavigate("home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-[#FBF2E1] to-[#f5e6d3]">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
          <h2 className="text-center mb-2 text-[#930511]">Đăng nhập</h2>
          <p className="text-center text-gray-600 mb-8">
            Đăng nhập để quản lý tài khoản của bạn
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-[#FBF2E1] focus:outline-none focus:border-[#930511]"
                  placeholder="Nhập email của bạn"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 bg-[#FBF2E1] focus:outline-none focus:border-[#930511]"
                  placeholder="Nhập mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <button type="button" className="text-[#930511] hover:underline">
                Quên mật khẩu?
              </button>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 bg-[#930511] text-white hover:bg-[#7a0410] transition-all rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Đăng nhập
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Chưa có tài khoản?{" "}
              <button
                onClick={() => onNavigate("register")}
                className="text-[#930511] hover:underline"
              >
                Đăng ký ngay
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate("home")}
            className="text-gray-600 hover:text-[#930511]"
          >
            ← Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
