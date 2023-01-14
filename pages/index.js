export default function Home() {
  return (
    <div>
      <section
        id="about"
        className="text-white h-screen bg-black text-center flex"
      >
        <h1 className="m-auto font-waterfall text-7xl text-purple-600">Hero</h1>
      </section>

      <section
        id="blog"
        className="text-white h-screen bg-purple-900 text-center flex"
      >
        <h1 className="m-auto font-waterfall text-7xl text-white">Blog</h1>
      </section>

      <section
        id="contact"
        className="text-white h-screen bg-black text-center flex"
      >
        <h1 className="m-auto font-waterfall text-7xl text-purple-600">
          Contact{' '}
        </h1>
      </section>

      <section
        id="projects"
        className="text-white h-screen bg-purple-900 text-center flex"
      >
        <h1 className="m-auto font-waterfall text-7xl text-white">Projects</h1>
      </section>
    </div>
  );
}
