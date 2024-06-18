"use client"

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../dashboard/editor/editor"), { ssr: false });
export default function page() {
    return <div className=""><Editor /> </div>
}