import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import CustomLink from "../ui/Link";
import handlGoogleSignIn from "../utils/fireauth.popup";


const Home: NextPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>('Password')
  const handleSudmit = (e: any) => {
    if (e.key == 'Enter') {
      loginHandler()
    }
  }
  const loginHandler = async () => {
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password })
    }).then((response) => {

      if (response.status === 200) {
        router.push('/panel')
      } else {
        toast.error(response.statusText, {
          theme: "dark"
        })
      }
    }).catch((error) => {
      console.log(error)
      toast("An error occured", {
        theme: "dark"
      })
    })
  }

  const handleSigninWithGoogle = async () => {
    
    const uid = await handlGoogleSignIn()
    if (uid) {

      fetch('http://localhost:3000/api/loginwithgoogle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: uid })
      }).then((response) => {
        if (response.status === 200) {
          router.push('/panel')
        } else {
          toast.error(response.statusText, {
            theme: "dark"
          })
        }
      }).catch((error) => {
        console.log(error)
        toast("An error occured", {
          theme: "dark"
        })
      })
    } else {
      toast.error("An error occured", {
        theme: "dark"
      })
    }
  }



  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="h-screen  flex  items-center justify-center    w-screen bg-black">
        <div className="w-fit h-fit ">
          <ToastContainer />
          <div className=" h-fit  mx-auto  ">
            <h1 className="text-8xl text-center  mx-auto font-extrabold text-transparent  bg-clip-text bg-gradient-to-b from-white via-[#9197A2]  to-black">Planner app <br /> ndzhwr</h1> <br />
            <p className="text-center  text-[#9197A2]">A planner app for ndzhwr  -  just useless for you, all what you can do is to star it on <CustomLink url="https://github.com/ndzhwr" title="Github" underline /></p>
            <div className="w-full flex gap-2  h-fit w-fititems-center mt-10">
              <input
                type="password"
                name="email"
                id=""
                className=" bg-[#0F1014] text-slate-100 px-6 py-6 w-full outline-none rounded-xl placeholder:opacity-40"
                autoComplete="false"
                placeholder="Login with password "
                onChange={(e: any) => setPassword(e.target.value.trim())}
                onKeyDown={handleSudmit}
              />
              <button
                className="p-6 rounded-xl flex justify-between items-center bg-[#0F1014]  text-sm"
                onClick={handleSigninWithGoogle} >
                <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt="" className="w-6 h-6 " />
              </button>
            </div>
            <samp className="text-center text-sm    mx-auto"> Github  - Twitter</samp>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home