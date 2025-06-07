'use client'

import { useState } from "react"

const ShowsClip = () => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <div className="flex justify-center my-2">
            <div className="mx-auto flex justify-center w-full">
                <button
                    onClick={() => setOpen(true)}
                    className="text-center mx-auto px-3 py-2 text-lg font-bold hover:bg-[#a6c4e6] bg-[#5da9ff] rounded-lg"
                >
                    ویدیو امکانات سایت
                </button>
            </div>
            <div
                className={`fixed inset-0 bg-black flex items-center justify-center ${
                    open ? "block" : "hidden"
                } z-50`}
            >
                <button
                    onClick={() => setOpen(false)}
                    className="absolute right-4 top-4 z-50"
                >
                    <i className="bi bi-x-circle text-4xl text-red-500 hover:text-blue-400"></i>
                </button>
                <div className="w-full h-full flex items-center justify-center">
                    <video
                        className="w-full h-full object-contain"
                        autoPlay
                        controls
                        preload="auto"
                    >
                        <source
                            src="https://c713657.parspack.net/c713657/uploads/recording.mkv"
                            type="video/mp4"
                        />
                        
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    )
}

export default ShowsClip