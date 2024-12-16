import { Link } from "react-router-dom";
import { StripeSession } from "./types";

let res = await fetch(`/api/session-status${window.location.search}`);
const json = await res.json();

const SuccessPage = () => {
  const firstName = json.cust_name.split(" ")[0];
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-16">
      <div className="flex flex-col items-center gap-8 bg-black rounded-xl p-8 border border-green-500 text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>

        <h1 className="text-4xl font-bold text-white mb-4">
          Thank You, {firstName}!
        </h1>

        <p className="text-xl text-gray-200 leading-relaxed mb-8">
          Your donation has been successfully processed. We truly appreciate
          your support in helping us make language more accessible for everyone.
        </p>

        <Link
          to="/"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
