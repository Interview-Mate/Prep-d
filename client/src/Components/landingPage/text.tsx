import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

const Section = (props:any) => {
  return (
    <section
      className={`h-screen flex flex-col justify-center p-10 mr-60 ${
        props.right ? "items-end" : "items-start"
      }`}
      style={{
        opacity: props.opacity,
      }}
    >
      <div className="w-1/2 flex items-center justify-center">
        <div className=" max-w-sm w-full">
          <div className="bg-white rounded-lg px-8 py-12">
            {props.children}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Overlay = () => {

  const scroll = useScroll();
  const [opacityFirstSection, setOpacityFirstSection] = useState(1);
  const [opacitySecondSection, setOpacitySecondSection] = useState(1);
  const [opacityLastSection, setOpacityLastSection] = useState(1);

  useFrame(() => {
    setOpacityFirstSection(1 - scroll.range(0, 1 / 3));
    setOpacitySecondSection(scroll.curve(1 / 3, 1 / 3));
    setOpacityLastSection(scroll.range(2 / 3, 1 / 3));
  });

  return (
    <Scroll html>
      <div className="w-screen">
        <Section opacity={opacityFirstSection}>
          <h1 className="font-semibold font-serif text-2xl african-violet">
            Do you dread job interviews like you dread the dentist?
          </h1>
          <p className="text-gray-500">Does the mere thought of answering tricky questions from a stranger make you break out in a cold sweat?</p>
          <p className="animate-bounce  mt-6">↓</p>
        </Section>
        <Section right opacity={opacitySecondSection}>
          <h1 className="font-semibold font-serif text-2xl">
            Our app takes you through a simulated interview experience 🔥
          </h1>
          <p className="text-gray-500">With Prep'd, you'll feel like you're in the hot seat, even if you're just in your living room.</p>
          <p className="animate-bounce  mt-6">↓</p>
        </Section>
        <Section opacity={opacityLastSection}>
          <h1 className="font-semibold font-serif text-2xl">
            🤙 Register now ! 
          </h1>
          <p className="text-gray-500">Or go learn how to center a dev</p>
         

        </Section>
      </div>
    </Scroll>
  );
};
