import clsx from "clsx";

export default function Card({ children, className }) {
  return (
    <div
      className={clsx(
        "bg-white dark:bg-slate-800 rounded-xl shadow p-5 transition",
        className
      )}
    >
      {children}
    </div>
  );
}