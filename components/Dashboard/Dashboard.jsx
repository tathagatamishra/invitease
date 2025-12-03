// components/Dashboard/Dashboard.jsx
"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import SimpleBtn from "../UI/Buttons/SimpleBtn";
import { useRouter } from "next/navigation";
import "./Dashboard.css";
import {
  FiPlus,
  FiSettings,
  FiGrid,
  FiImage,
  FiBell,
  FiUserPlus,
} from "react-icons/fi";
import invitationCardsData from "../../data/invitationCards.json";
import userCardsData from "../../data/userCards.json";
import MasonryLayout from "../UI/MasonryLayout/MasonryLayout";
import SimpleCard from "../UI/Cards/SimpleCard";
import { LuCalendarDays } from "react-icons/lu";
import { LuBell } from "react-icons/lu";

export default function Dashboard() {
  const router = useRouter();
  const [invitationCards, setInvitationCards] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [maxCards, setMaxCards] = useState(8);

  const calculateMaxCards = useCallback(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width <= 500) return 2;
      if (width <= 810) return 4;
      if (width <= 1080) return 6;
      return 8;
    }
    return 8;
  }, []);

  const calculateColumns = useCallback(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width <= 500) return 1;
      if (width <= 810) return 2;
      if (width <= 1080) return 3;
      return 4;
    }
    return 4;
  }, []);

  useEffect(() => {
    setInvitationCards(invitationCardsData.invitationCards);
    setUserCards(userCardsData.userCards);
  }, []);

  useEffect(() => {
    // Set initial max cards
    setMaxCards(calculateMaxCards());
    // Update on resize
    const handleResize = () => {
      setMaxCards(calculateMaxCards());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateMaxCards]);
  const displayedCards = userCards.slice(0, maxCards - 1);

  const navigate = (page) => {
    router.push(page);
  };

  return (
    <main className="relative flex min-h-full w-full max-w-[1080px] flex-row items-center gap-6">
      <section className="sidebar h-full flex flex-col items-center justify-between py-4 rounded-3xl border border-solid border-black/[.08] overflow-hidden">
        <Image
          className="mb-10"
          src="/text-1764000615754.png"
          alt="Next.js logo"
          width={120}
          height={20}
          priority
          onClick={() => {
            navigate("/dashboard");
          }}
        />
        <div className="px-4 pb-4 w-full">
          <SimpleBtn
            icon={<FiPlus />}
            text="New event"
            theme="dark"
            width="w-full"
            tailwind=""
            onClick={() => {
              console.log("create new event");
            }}
          />
        </div>

        <div className="shadowDiv-t w-full h-2 min-h-2 z-2"></div>
        <div className="w-full h-full flex flex-col gap-4 px-4 py-4 overflow-y-auto z-1">
          {Array.from({ length: 10 }).map((_, index) => (
            <SimpleBtn
              key={index}
              text={"Event " + (index + 1)}
              theme="light"
              width="w-full"
              tailwind="justify-start"
              navigateTo="/login"
            />
          ))}
        </div>
        <div className="shadowDiv-b w-full h-2 min-h-2 z-2"></div>

        <div className="px-4 pt-4 w-full">
          <SimpleBtn
            icon={<FiSettings />}
            text="Manage events"
            theme="dark"
            width="w-full"
            tailwind=""
            onClick={() => {
              console.log("Manage events");
            }}
          />
        </div>
      </section>

      <section className="w-full h-full flex flex-col gap-6">
        <section className="topbar w-full h-fit flex flex-row items-center justify-end gap-4 p-4 rounded-3xl border border-solid border-black/[.08]">
          <SimpleBtn
            text="Calender"
            theme="light"
            height="h-12 min-h-12"
            width="w-12 md:w-[158px] min-w-12"
            padding="px-0 md:px-5"
            notify={true}
            textStyle="hidden md:block"
            icon={<LuCalendarDays />}
          />
          <SimpleBtn
            text="Notification"
            theme="light"
            height="h-12 min-h-12"
            width="w-12 md:w-[158px] min-w-12"
            padding="px-0 md:px-5"
            notify={true}
            textStyle="hidden md:block"
            icon={<FiBell />}
          />
          <SimpleBtn
            text="Contact"
            theme="light"
            height="h-12 min-h-12"
            width="w-12 md:w-[158px] min-w-12"
            padding="px-0 md:px-5"
            textStyle="hidden md:block"
            icon={<FiUserPlus />}
          />
          <SimpleBtn
            text=""
            theme="light"
            width="w-12 min-w-12"
            navigateTo="/account"
            backgroundImage="/assets/woman.png"
          />
        </section>

        <section className="maingrid w-full h-full flex flex-col rounded-3xl border border-solid border-black/[.08] overflow-hidden">
          <div className="shadowDiv-t w-full h-2 z-[2]"></div>

          <div className="w-full h-full flex flex-col gap-6 px-4 py-2 overflow-y-auto z-[1]">
            <section className="mb-4">
              <h3 className="mb-4 flex flex-row items-center gap-2">
                <FiImage className="text-[80%]" />
                My cards
              </h3>

              <section className="myCards grid grid-rows-2 grid-flow-col auto-cols-fr gap-4">
                <SimpleCard
                  text="Create"
                  icon={<FiPlus />}
                  theme="light"
                  height="h-full aspect-square"
                  width="w-full"
                />
                {displayedCards.map((card, index) => (
                  <SimpleCard
                    key={index}
                    text="Card"
                    theme="light"
                    bgImage={card.imageUrl}
                    height="h-full aspect-square"
                    width="w-full"
                  />
                ))}
              </section>
            </section>

            <section>
              <h3 className="mb-4 flex flex-row items-center gap-2">
                <FiGrid className="text-[80%]" />
                Explore cards
              </h3>

              <MasonryLayout
                items={invitationCards}
                calculateColumns={calculateColumns}
                tailwindStyle="cursor-pointer border border-solid border-black/[.08]"
                renderItem={(card) => (
                  <div
                    onClick={() => {
                      console.log("Selected card:", card);
                    }}
                  >
                    <Image
                      height={480}
                      width={480}
                      src={card.imageUrl}
                      alt={card.cardTitle}
                    />
                  </div>
                )}
              />
            </section>
          </div>

          <div className="shadowDiv-b w-full h-2 z-[2]"></div>
        </section>
      </section>
    </main>
  );
}
