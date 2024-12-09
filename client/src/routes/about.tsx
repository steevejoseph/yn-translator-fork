import aboutPic from "@/assets/images/about-pic.jpg";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">About</h1>

      <div className="flex flex-col md:flex-row items-center gap-8 bg-black rounded-xl p-8 border border-indigo-500">
        {/* Text Container */}
        <div className="md:w-1/2">
          <p className="text-xl text-gray-200 leading-relaxed">
            The app enables users to easily understand colloquial language
            through clear, accessible explanations.
          </p>
        </div>

        {/* Image Container */}
        <div className="md:w-1/2">
          <img
            src={aboutPic}
            alt="About"
            className="w-full max-h-[calc(100vh-12rem)] object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
