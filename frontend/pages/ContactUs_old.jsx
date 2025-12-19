import Footer from "../components/Footer";

const ContactUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-8 bg-gray-100">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Contact Us</h1>
          <p className="text-gray-700 text-lg text-center">
            Have any questions? We’re here to help! Reach out to us via the details below.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📧</span>
              <p className="text-lg text-gray-800">
                Email:{" "}
                <a href="mailto:hostel@example.com" className="text-blue-500 hover:underline">
                  kishore@gmail.com
                </a>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📞</span>
              <p className="text-lg text-gray-800">Phone: +91 9876543210</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📍</span>
              <p className="text-lg text-gray-800">
                Address: RoomMatz Hostel near GVP college ,Kommadi,vizag.
              </p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-700">We look forward to hearing from you!</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ContactUs;
