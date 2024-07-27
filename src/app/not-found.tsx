import Image from "next/image"
import error from "../assets/404.svg"

export default function Custom404() {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <Image src={error} width={0} height={0} alt="404" className="h-[400px] w-auto" />
      </div>
    </>
  )
}
