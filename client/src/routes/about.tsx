import aboutPic from "@/assets/images/about-pic.jpg";

const AboutPage = () => {
  return (
    <div className="container mx-auto my-10 px-4">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-8">About</h1>

      {/* Content Section */}
      <div className="flex flex-wrap md:flex-nowrap items-center bg-red-500 p-8 rounded-lg">
        {/* Text Container */}
        <div className="md:w-1/2 w-full pr-6 mb-6 md:mb-0">
          <p className="text-lg text-white">
            The app enables users to easily understand colloquial language
            through clear, accessible explanations.
          </p>
        </div>

        {/* Image Container */}
        <div className="md:w-1/2 w-full">
          <img
            src={aboutPic}
            alt="About"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
