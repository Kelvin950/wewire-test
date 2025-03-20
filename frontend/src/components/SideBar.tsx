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
        {[
          { display: "Transactions", link: "/transactions" },
          { display: "Convert", link: "/convert" },
          { display: "Today's Rates", link: "/rates" },
        ].map(({ display, link }) => (
          <li key={display} className="hover:text-blue-600 cursor-pointer">
            <NavLink
              to={link}
              className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
              }
            >
              {display}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
