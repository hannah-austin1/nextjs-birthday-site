"use client";
import { useState } from "react";
import Image from "next/image";
import LoadingSkeleton from "./LoadingSkeleton";

export default function SearchForm() {
  const [inputValue, setInputValue] = useState("");
  const [image, setImage] = useState("/danibday.png");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/predictions", {
      method: "POST",
      body: JSON.stringify({
        prompt: inputValue,
      }),
    });
    const data = await response.json();
    if (data && data.length) {
      setImage(data[0]);
      setLoading(false);
      return;
    }
  };

  return (
    <>
      <form className="flex mb-8 w-9/12" onSubmit={handleSubmit}>
        <input
          className="w-full p-4 bg-white border border-white rounded text-base mr-4"
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
        <button
          className="p-4 bg-dusty-rose rounded box-border cursor-pointer text-base"
          disabled={loading}
          type="submit"
        >
          Submit
        </button>
      </form>

      <div className="h-[45rem] w-[30rem] p-4 bg-twilight-blue">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <Image
            src={image}
            width={600}
            height={600}
            alt="Generated AI Image"
          />
        )}
      </div>
    </>
  );
}
