import React, { useId, forwardRef } from "react";

function Select({ options, label, classname = "", ...props }, ref) {
  const id = useId();
  return (
    <div className=" w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        className={` px-3 py-2  rounded-lg bg-white  text-black outline-none focus:bg-gray-50  duration-200 border border-gray-200 w-full ${classname}`}
        {...props}
        id={id}
        ref={ref}
      >
        {options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
