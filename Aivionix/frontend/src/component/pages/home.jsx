import Section1 from "../section1/section1";
import Section2 from "../section2/section2";
import Section3 from "../section3/section3";
import Section4 from "../section4/section4";
import Section5 from "../section5/section5";
import Section7 from "../section7/section7";
import Section8 from "../section8/section8";

export default function Home() {
  return (
    <main className="bg-[#030712] text-white">
      <section id="overview">
        <Section1 />
      </section>

      <section id="how-it-works">
        <Section3 />
      </section>

      <Section4 />
      <Section5 />

      <section id="message-checker">
        <Section7 />
      </section>

      <section id="safety-tips">
        <Section2 />
      </section>

      <Section8 />
    </main>
  );
}

