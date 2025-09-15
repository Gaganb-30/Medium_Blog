import { Avatar } from "./BlogCard"

const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div className="flex flex-col justify-center text-xl">Medium</div>
      <div><Avatar name="Gagan" size={"big"}/></div>
    </div>
  )
}
// baad me logout aur baki options add krne hai

export default Appbar
