import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="font-poppins w-64 min-h-screen p-4  shadow-md">
      <div className="mb-6">
        <img
          src="https://cdn.sender.net/email_images/255731/images/all/wewire_logo_v2.png"
          alt="WeWire Logo"
          className="w-full h-auto object-contain"
        />
      </div>

      <ul className="flex flex-col space-y-4 text-center font-medium text-gray-700">
        {["Transactions", "Convert"].map((v) => (
          <li key={v} className="hover:text-blue-600 cursor-pointer">
            <NavLink
              to={`/${v.toLowerCase()}`}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              {v}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
