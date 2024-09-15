import toast, { Toaster } from "react-hot-toast";
import css from "./Form.module.css";

export default function Form({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();

    if (!query) {
      toast("The field can not be empty!", {
        icon: "❗️",
        duration: 4000,
      });

      return;
    }
    onSubmit(query);
    e.target.reset();
  };

  return (
    <div className={css.container}>
      <Toaster position="top-right" />
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          autoFocus
          placeholder="|"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
