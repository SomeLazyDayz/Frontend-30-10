import { Mail, Phone, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { useState } from "react";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#930511] to-[#7a0410] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6">Liên hệ với chúng tôi</h1>
          <p className="opacity-95 leading-relaxed">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với BLOOD + để được tư vấn!
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="bg-gradient-to-br from-white to-gray-50 py-20 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="mb-6 text-[#930511]">Thông tin liên hệ</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#930511] to-[#7a0410] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-[#930511]">Địa chỉ</h3>
                    <p className="text-gray-700">268 Lý Thường Kiệt, Phường 14, Quận 10, TP.HCM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#930511] to-[#7a0410] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-[#930511]">Số điện thoại</h3>
                    <p className="text-gray-700">+84 987 123 418</p>
                    <p className="text-gray-700">+84 901 234 567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#930511] to-[#7a0410] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-[#930511]">Email</h3>
                    <p className="text-gray-700">bloodgroup@gmail.com</p>
                    <p className="text-gray-700">support@bloodplus.vn</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#930511] to-[#7a0410] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-[#930511]">Giờ làm việc</h3>
                    <p className="text-gray-700">Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                    <p className="text-gray-700">Thứ 7 - Chủ nhật: 8:00 - 12:00</p>
                  </div>
                </div>

                <div className="pt-4 p-4 bg-white rounded-xl shadow-md">
                  <h3 className="mb-4 text-[#930511]">Theo dõi chúng tôi</h3>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#930511] to-[#7a0410] rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-0.5 shadow-md">
                      <Facebook className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-[#930511] to-[#7a0410] rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-0.5 shadow-md">
                      <Instagram className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="mb-6 text-[#930511]">Gửi tin nhắn cho chúng tôi</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2">Họ và tên *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 bg-[#FBF2E1] focus:outline-none focus:border-[#930511]"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>

                <div>
                  <label className="block mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 bg-[#FBF2E1] focus:outline-none focus:border-[#930511]"
                    placeholder="Nhập email của bạn"
                  />
                </div>

                <div>
                  <label className="block mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 bg-[#FBF2E1] focus:outline-none focus:border-[#930511]"
                    placeholder="Nhập số điện thoại của bạn"
                  />
                </div>

                <div>
                  <label className="block mb-2">Tin nhắn *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 bg-[#FBF2E1] focus:outline-none focus:border-[#930511] resize-none"
                    placeholder="Nhập nội dung tin nhắn"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-[#930511] text-white hover:bg-[#7a0410] transition-all rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gradient-to-br from-[#FBF2E1] to-[#f5e6d3] py-20 px-6 border-t border-[#e8d5c0]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-8 text-[#930511]">Vị trí của chúng tôi</h2>
          <div className="aspect-video bg-gray-300 rounded-xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5206913126264!2d106.66372731533361!3d10.771392962214162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed2392c44df%3A0xd2ecb62e0d050fe9!2zMjY4IEzDvSBUaMaw4budbmcgS2nhu4d0LCBQaMaw4budbmcgMTQsIFF14bqtbiAxMCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1633507114159!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
