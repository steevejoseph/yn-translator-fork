import aboutPic from "@/assets/images/about-pic.jpg";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-8">About</h1>

      <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-lg shadow-md border border-indigo-200">
        {/* Text Container */}
        <div className="md:w-1/2 space-y-4">
          <p className="text-xl text-gray-800 leading-relaxed">
            The app enables users to easily understand colloquial language
            through clear, accessible explanations.
          </p>
        </div>

        {/* Image Container */}
        <div className="md:w-1/2">
          <img
            src={aboutPic}
            alt="About"
            className="w-full max-h-[calc(100vh-12rem)] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
