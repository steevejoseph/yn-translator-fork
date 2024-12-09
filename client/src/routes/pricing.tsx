// import { Link } from "react-router-dom";

const PricingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-16">
      <div className="flex flex-col items-center gap-8 bg-black rounded-xl p-8 border border-indigo-500 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Private Beta</h1>

        <div className="max-w-2xl">
          <p className="text-xl text-gray-200 leading-relaxed mb-8">
            Our private beta is currently closed. However, if you'd like to
            support the development of this project, you can make a donation
            below. Every contribution helps us improve and expand our language
            accessibility tools.
          </p>
        </div>

        <form
          action="/api/create-checkout-session"
          method="POST"
          className="w-full max-w-md"
        >
          <button
            type="submit"
            className="w-full px-6 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold"
          >
            Support the Project
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4">
          Payments are securely processed through Stripe
        </p>
      </div>
    </div>
  );
};

export default PricingPage;
