import WishForm from "../components/public/WishForm";

function Home() {
  return (
    <main>
      <section className="home">
        <div className="home-content">
          <p className="home-eyebrow">
            A little something special
          </p>

          <h1>
            Leave a little
            <span> Love.</span>
          </h1>

          <p className="home-description">
            She's celebrating another beautiful year, and we'd
            love for you to be part of her story.
          </p>

          <WishForm />
        </div>
      </section>
    </main>
  );
}

export default Home;