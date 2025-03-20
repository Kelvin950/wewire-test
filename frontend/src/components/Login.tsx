import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../features/Authapi";
import { formData, LoginSchema } from "../types";
import FormField from "./FormField";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";
export default function Login(){
 const {
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm<formData>({
    resolver: zodResolver(LoginSchema)
  });
  const navigate= useNavigate()
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: formData) => {
    console.log("SUCCESS", data);
     try {
       const user = await login({email:data.email! , password:data.password!}).unwrap();
       if(isLoading){
        
        console.log("loadinf")
       }
       console.log(user)
       dispatch(setCredentials(user));
     navigate("/")
     } catch (err) {
       console.error("Login failed:", err);
     }
  };
    return (
      <>
        <div className="f">
          <div className="flex items-center justify-center p-5 mb-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-sm mx-auto mt-20 space-y-4"
            >
              <h2 className="text-2xl font-bold text-center">Login</h2>
              <FormField
                className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Email"
                name="email"
                register={register}
                error={errors.email}
              />

              <FormField
                className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="password"
                name="password"
                register={register}
                error={errors.password}
              />

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
              >
                Sign In
              </button>
            </form>
          </div>
          <div className="flex items-center justify-center">
            <img
              width={200}
              src="https://cdn.sender.net/email_images/255731/images/all/wewire_logo_v2.png"
              alt="WeWire Logo"
              className=" h-auto object-contain"
            />
          </div>
        </div>
      </>
    );
}