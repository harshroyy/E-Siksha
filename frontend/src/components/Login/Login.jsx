import React from "react";
import { User, Users, Headphones } from "lucide-react";

const Loginoption = () => {
  return (
    <section className="bg-white py-10 mt-6" id="loginsection">
      <div className="container mx-auto px-4 text-center">
        {/* Section Title */}
        <h2 className="text-3xl text-gray-500 md:text-3xl font-semibold mb-14 tracking-wide">
          Login 
        </h2>

        {/* Login Cards */}
        <div className="flex flex-wrap justify-center gap-20">
          {[
            { title: "Teacher ", icon: User },
            { title: "Student ", icon: Users },
            { title: "Admin ", icon: Headphones },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 rounded-xl shadow-lg w-[230px] text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <a
                href={`#${item.title.toLowerCase().replace(" ", "-")}`}
                className="flex flex-col items-center no-underline"
              >
                <div className="mb-4 bg-blue-100 p-3 rounded-full">
                  <item.icon className="w-12 h-12 text-blue-500" />
                </div>
                <span className="text-lg font-semibold text-gray-700">
                  {item.title}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Loginoption;
