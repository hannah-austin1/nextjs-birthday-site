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
    <div className="flex flex-row bg-twilight-blue h-screen">
      <form
        className="mb-8 w-1/2 h-6 mx-auto flex flex-col items-center justify-center self-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-white font-serif text-4xl z-10">Dani hAIKit</h1>
        <p className="text-white font-serif text-2xl z-10">
          You can be anything you want to be
        </p>
        <input
          className="w-1/3 p-4 mt-4 bg-white border border-white rounded text-base mr-4"
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
        <button
          className="p-4 mt-4 w-1/5 bg-night-noir text-white rounded box-border cursor-pointer text-base"
          disabled={loading}
          type="submit"
        >
          Submit
        </button>
      </form>

      <div className="w-1/2 p-4 h-  bg-twilight-blue">
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
    </div>
  );
}
