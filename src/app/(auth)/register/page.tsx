import React from 'react';

const Page = () => {
    return (
        <div className="max-w-[350px] bg-gradient-to-t from-white to-[#f4f7fb] rounded-[40px] p-[25px_35px] border-[5px] border-white shadow-[0_30px_30px_-20px_rgba(133,189,215,0.88)] m-5">
            <div className="text-center font-extrabold text-[30px] text-green-500">Đăng ký nhanh</div>
            <form className="mt-5">
                <input
                    required
                    className="w-full bg-white border-none px-5 py-[15px] rounded-[20px] mt-4 shadow-[0_10px_10px_-5px_#cff0ff] focus:outline-none focus:border-x-2 focus:border-green-800 placeholder:text-[#aaaaaa]"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nhập tên của bạn"
                />
                <input
                    required
                    className="w-full bg-white border-none px-5 py-[15px] rounded-[20px] mt-4 shadow-[0_10px_10px_-5px_#cff0ff] focus:outline-none focus:border-x-2 focus:border-green-800 placeholder:text-[#aaaaaa]"
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Nhập số điện thoại của bạn"
                    pattern="[0-9]{10,11}"
                    maxLength={11}
                />
                <input
                    className="block w-full font-bold bg-gradient-to-r from-green-900 to-green-500 text-white py-[15px] mt-5 mb-0 mx-auto rounded-[20px] shadow-[0_20px_10px_-15px_rgba(133,189,215,0.88)] border-none transition-all duration-200 ease-in-out hover:scale-[1.03] hover:shadow-[0_23px_10px_-20px_rgba(133,189,215,0.88)] active:scale-95 active:shadow-[0_15px_10px_-10px_rgba(133,189,215,0.88)]"
                    type="submit"
                    value="Đăng ký"
                />
            </form>
        </div>

    );
};

export default Page;