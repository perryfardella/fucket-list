import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header>The Fucket List</header>
      <main>
        <h1>What is the Fucket List?</h1>
        <p>
          The Fucket List is a website where you can list, track and share all
          your stretch goals in life - things you want to do, but they scare
          you, things you think you may not be able to accomplish.
        </p>
        <p>
          This website is built upon the &apos;Fuck It List&apos; concept that
          was created by Jesse Itzler
        </p>
        <Link href="/login">
          <button className="bg-blue-500 text-white py-2 px-4 rounded mr-4 hover:bg-blue-600">
            Log in
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Sign up
          </button>
        </Link>
      </main>
      <footer></footer>
    </div>
  );
}
