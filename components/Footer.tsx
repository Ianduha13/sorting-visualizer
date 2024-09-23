import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="sticky bottom-0 w-full flex justify-center mt-auto  py-2 bg-white">
      <p className="flex items-center flex-wrap justify-center">
        &copy; 2024, Algorithm Visualizer made with
        <Heart className="text-[#C12127] h-5 w-5 mx-1" fill="#C12127" /> by
        <Link className="text-[#C12127] ml-1" href="https://www.linkedin.com/in/ian-duhamel/">{" "}Ian Duhamel</Link>
      </p>
    </footer>
  );
}