import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto mt-10">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className={buttonVariants({ variant: "outline" })} href="/">
        Return Home
      </Link>
    </div>
  );
}
