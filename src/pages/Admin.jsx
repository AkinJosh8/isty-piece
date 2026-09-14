import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import birthdayData from "../data/birthdayData";
import { supabase } from "../lib/supabase";

function Admin() {
  const shouldReduceMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");

  const [wishes, setWishes] = useState([]);
  const [isLoadingWishes, setIsLoadingWishes] = useState(false);
  const [wishError, setWishError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setIsLoading(false);
    };

    getCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    fetchWishes();
  }, [user]);

  const fetchWishes = async () => {
    setIsLoadingWishes(true);
    setWishError("");

    const { data, error: fetchError } = await supabase
      .from("wishes")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setWishError("We couldn't load the wishes right now.");
      setWishes([]);
      setIsLoadingWishes(false);
      return;
    }

    setWishes(data || []);
    setIsLoadingWishes(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }

    setIsSigningIn(true);
    setError("");

    const { data, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (signInError) {
      console.error("Admin sign-in failed:", signInError);
      setError("Incorrect email or password.");
      setIsSigningIn(false);
      return;
    }

    setUser(data.user);
    setIsSigningIn(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setWishes([]);
  };

  const handleDelete = async (wishId) => {
    setDeletingId(wishId);
    setWishError("");

    const { error: deleteError } = await supabase
      .from("wishes")
      .delete()
      .eq("id", wishId);

    if (deleteError) {
      setWishError("We couldn't delete that wish. Please try again.");
      setDeletingId(null);
      setDeleteConfirmId(null);
      return;
    }

    setWishes((currentWishes) =>
      currentWishes.filter((wish) => wish.id !== wishId)
    );

    setDeletingId(null);
    setDeleteConfirmId(null);
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateString));
  };

  const getLatestWishTime = () => {
    if (!wishes.length) return "No wishes yet";

    return formatDate(wishes[0].created_at);
  };

  if (isLoading) {
    return (
      <main className="admin-gate">
        <div className="admin-gate-card">
          <span className="admin-loading-spinner" />
          <p>Checking access...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="admin-gate">
        <motion.div
          className="admin-gate-card"
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 25, scale: 0.97 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="admin-gate-eyebrow">
            Private dashboard
          </p>

          <h1>
            Admin <span>access.</span>
          </h1>

          <p className="admin-gate-description">
            Sign in to manage the birthday experience.
          </p>

          <form
            className="admin-gate-form"
            onSubmit={handleSubmit}
          >
            <label htmlFor="admin-email">
              Email address
            </label>

            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              placeholder="Enter your email"
              autoComplete="email"
              autoFocus
              disabled={isSigningIn}
            />

            <label htmlFor="admin-password">
              Password
            </label>

            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isSigningIn}
            />

            {error && (
              <p className="admin-gate-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="admin-gate-button"
              disabled={isSigningIn}
            >
              {isSigningIn
                ? "Signing in..."
                : "Enter dashboard"}
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="admin-dashboard">
      <div className="admin-dashboard-container">

        <header className="admin-dashboard-header">
          <div>
            <p className="admin-dashboard-eyebrow">
              Private dashboard
            </p>

            <h1>
              Birthday <span>wishes.</span>
            </h1>

            <p className="admin-dashboard-description">
              View the messages people have left for{" "}
              {birthdayData.name}.
            </p>
          </div>

          <button
            type="button"
            className="admin-signout-button"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </header>

        <section className="admin-stats">
          <div className="admin-stat-card">
            <span className="admin-stat-label">
              Total wishes
            </span>

            <strong>{wishes.length}</strong>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-label">
              Latest wish
            </span>

            <strong className="admin-stat-latest">
              {getLatestWishTime()}
            </strong>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-label">
              Admin
            </span>

            <strong className="admin-stat-admin">
              Signed in
            </strong>
          </div>
        </section>

        <section className="admin-wishes-section">
          <div className="admin-wishes-header">
            <div>
              <p className="admin-section-eyebrow">
                Messages
              </p>

              <h2>Birthday wishes</h2>
            </div>

            <button
              type="button"
              className="admin-refresh-button"
              onClick={fetchWishes}
              disabled={isLoadingWishes}
            >
              <span
                className={
                  isLoadingWishes
                    ? "admin-refresh-icon admin-refreshing"
                    : "admin-refresh-icon"
                }
                aria-hidden="true"
              >
               &#x21BB;
              </span>

              {isLoadingWishes ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {wishError && (
            <div
              className="admin-wish-error"
              role="alert"
            >
              {wishError}
            </div>
          )}

          {isLoadingWishes ? (
            <div className="admin-wishes-status">
              <span className="admin-loading-spinner" />
              <p>Gathering birthday wishes...</p>
            </div>
          ) : wishes.length === 0 ? (
            <div className="admin-wishes-empty">
              <span aria-hidden="true">✦</span>

              <h3>No wishes yet.</h3>

              <p>
                Birthday messages will appear here when
                people start sending them.
              </p>
            </div>
          ) : (
            <div className="admin-wishes-list">
              {wishes.map((wish, index) => (
                <motion.article
                  key={wish.id}
                  className="admin-wish-card"
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 18 }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.05, 0.3),
                    ease: "easeOut",
                  }}
                >
                  <div className="admin-wish-card-content">
                    <span
                      className="admin-wish-quote"
                      aria-hidden="true"
                    >
                      “ 
                    </span>

                    <p className="admin-wish-message">
                      {wish.message}
                    </p>

                    <div className="admin-wish-meta">
                      <span className="admin-wish-avatar">
                        {wish.name.charAt(0).toUpperCase()}
                      </span>

                      <div>
                        <strong>{wish.name}</strong>

                        <span>
                          Birthday wish ·{" "}
                          {formatDate(wish.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {deleteConfirmId === wish.id ? (
                    <div className="admin-delete-confirm">
                      <span>Delete this wish?</span>

                      <div>
                        <button
                          type="button"
                          className="admin-delete-cancel"
                          onClick={() =>
                            setDeleteConfirmId(null)
                          }
                          disabled={deletingId === wish.id}
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          className="admin-delete-confirm-button"
                          onClick={() =>
                            handleDelete(wish.id)
                          }
                          disabled={deletingId === wish.id}
                        >
                          {deletingId === wish.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="admin-delete-button"
                      onClick={() =>
                        setDeleteConfirmId(wish.id)
                      }
                    >
                      Delete
                    </button>
                  )}
                </motion.article>
              ))}
            </div>
          )}
        </section>

        <footer className="admin-dashboard-footer">
          <span>
            Signed in as {user.email}
          </span>

          <span>
            Private admin area
          </span>
        </footer>
      </div>
    </main>
  );
}

export default Admin;