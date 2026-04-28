import clsx from "clsx";

export default function Card({ children, className }) {
  return (
    <div
      className={clsx(
        "bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5 transition-shadow duration-200 hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}