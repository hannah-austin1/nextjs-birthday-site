import Head from "next/head";
import Search from "./components/SearchForm";
import Header from "./components/Header";
import Parallax from "./components/Parallax";
import { data } from "./data";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-midnight-plum h-full w-full">
      <Header />
      {/* <div className="p-8 text-base mx-0 my-auto flex items-center flex-col"> */}
      <Head>
        <title>Happy birthday Dani!!</title>
      </Head>
      {/* </div> */}
      <main>
        <>
          {data.map((item, index) => {
            const isEven = index % 2 === 0;
            const evenClasses = isEven
              ? "bg-mauve-mist flex-row justify-start"
              : "bg-twilight-blue flex-row-reverse justify-end";

            return (
              <Parallax
                key={item.heading}
                heading={item.heading}
                image={item.image}
                evenClasses={evenClasses}
              />
            );
          })}
        </>
        <Search />
      </main>
    </div>
  );
}
