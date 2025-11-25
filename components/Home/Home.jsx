// components/Home/Home.jsx
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <nav className="">
        <Image
          className=""
          src="/text-1764000615754.png"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
      </nav>

      <div className="">
        <h1 className="">Create, customize, and share invitations.</h1>
        <p className="">
          Make your events invitations personal, visual, and memorable with our{" "}
          <a href="#" className="">
            Customizable Templates
          </a>{" "}
          and the{" "}
          <a href="#" className="">
            Event Gallery
          </a>{" "}
          .
        </p>
      </div>

      <div className="">
        <button>
          <Image
            className=""
            src="/paper.png"
            alt="Vercel logomark"
            width={16}
            height={16}
          />
          Send an invitation
        </button>

        <button>Sign in</button>
      </div>
    </main>
  );
}
