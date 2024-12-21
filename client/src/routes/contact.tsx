import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "@clerk/clerk-react";

type ContactFormData = { name: string; email: string; message: string };
export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    console.log(data);
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();
    console.log(json);
  };

  const { user } = useUser();
  const fullName = user?.fullName || user?.username || "";
  const userEmail = user?.emailAddresses[0].emailAddress || "";

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-16">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Contact Us
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-8 bg-black rounded-xl p-8 border border-indigo-500">
        {/* Text Container */}
        <div className="md:w-1/2">
          <p className="text-xl text-gray-200 leading-relaxed">
            Questions? Feel free to reach out.
          </p>
        </div>

        {/* Form Container */}
        <div className="md:w-1/2">
          {" "}
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
            className="gap-2"
          >
            <label htmlFor="name" className="text-xl">
              {" "}
              Name{" "}
            </label>
            <input
              defaultValue={fullName}
              id="name"
              type="text"
              {...register("name", { required: true })}
              className="w-80 h-8"
            />
            {errors.name && (
              <p className="text-red-500">This field is required</p>
            )}
            <label htmlFor="email" className="text-xl">
              {" "}
              Email{" "}
            </label>
            <input
              defaultValue={userEmail}
              id="email"
              type="text"
              {...register("email", { required: true })}
              className="w-80 h-8"
            />
            {errors.email && (
              <p className="text-red-500">This field is required</p>
            )}
            <label htmlFor="message" className="text-xl">
              {" "}
              Message{" "}
            </label>
            <textarea
              id="message"
              {...register("message", { required: true })}
              className="w-80 h-36"
            />
            {errors.message && (
              <p className="text-red-500">This field is required</p>
            )}

            <input
              type="submit"
              className="text-xl bg-indigo-600 p-1 rounded-md"
              disabled={true}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
