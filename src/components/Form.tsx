import React from 'react';

const Form = () => {
    return (
        <div className="max-w-[350px] bg-gradient-to-t from-white to-[#f4f7fb] rounded-[40px] p-[25px_35px] border-[5px] border-white shadow-[0_30px_30px_-20px_rgba(133,189,215,0.88)] m-5">
            <div className="text-center font-extrabold text-[30px] text-[#1089d3]">Sign In</div>
            <form className="mt-5">
                <input
                    required
                    className="w-full bg-white border-none px-5 py-[15px] rounded-[20px] mt-4 shadow-[0_10px_10px_-5px_#cff0ff] focus:outline-none focus:border-x-2 focus:border-[#12B1D1] placeholder:text-[#aaaaaa]"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="E-mail"
                />
                <input
                    required
                    className="w-full bg-white border-none px-5 py-[15px] rounded-[20px] mt-4 shadow-[0_10px_10px_-5px_#cff0ff] focus:outline-none focus:border-x-2 focus:border-[#12B1D1] placeholder:text-[#aaaaaa]"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                />
                <span className="block mt-2 ml-2 text-[11px] text-[#0099ff]">
          <a href="#" className="no-underline">Forgot Password ?</a>
        </span>
                <input
                    className="block w-full font-bold bg-gradient-to-r from-[#1089d3] to-[#12b1d1] text-white py-[15px] mt-5 mb-0 mx-auto rounded-[20px] shadow-[0_20px_10px_-15px_rgba(133,189,215,0.88)] border-none transition-all duration-200 ease-in-out hover:scale-[1.03] hover:shadow-[0_23px_10px_-20px_rgba(133,189,215,0.88)] active:scale-95 active:shadow-[0_15px_10px_-10px_rgba(133,189,215,0.88)]"
                    type="submit"
                    value="Sign In"
                />
            </form>
            <div className="mt-6">
                <span className="block text-center text-[10px] text-[#aaaaaa]">Or Sign in with</span>
                <div className="w-full flex justify-center gap-4 mt-1">
                    <button className="bg-gradient-to-r from-black to-[#707070] border-[5px] border-white p-1 rounded-full w-10 aspect-square grid place-content-center shadow-[0_12px_10px_-8px_rgba(133,189,215,0.88)] transition-all duration-200 ease-in-out hover:scale-120 active:scale-90">
                        <svg className="fill-white m-auto" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512">
                            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                        </svg>
                    </button>
                    <button className="bg-gradient-to-r from-black to-[#707070] border-[5px] border-white p-1 rounded-full w-10 aspect-square grid place-content-center shadow-[0_12px_10px_-8px_rgba(133,189,215,0.88)] transition-all duration-200 ease-in-out hover:scale-120 active:scale-90">
                        <svg className="fill-white m-auto" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                        </svg>
                    </button>
                    <button className="bg-gradient-to-r from-black to-[#707070] border-[5px] border-white p-1 rounded-full w-10 aspect-square grid place-content-center shadow-[0_12px_10px_-8px_rgba(133,189,215,0.88)] transition-all duration-200 ease-in-out hover:scale-120 active:scale-90">
                        <svg className="fill-white m-auto" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                        </svg>
                    </button>
                </div>
            </div>
            <span className="block text-center mt-4">
        <a href="#" className="no-underline text-[#0099ff] text-[9px]">Learn user licence agreement</a>
      </span>
        </div>
    );
};

export default Form;