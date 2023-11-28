import React from "react";

const styles = {
  main: "w-full h-full flex flex-col items-center px-16 py-2 overflow-y-auto",
  title:
    "text-2xl bg-slate-900 tracking-widest p-10 text-slate-100 font-bold mt-4 rounded",
};

const SideNotes = () => {
  return (
    <div className={styles.main}>
      <div className="w-full h-full p-6 text-slate-100">
        <h1 className={styles.title}>Jegyzetek</h1>
        <div className="w-full flex flex-col gap-4 bg-slate-900 p-10 tracking-wider">
          <h2 className="font-bold">Kérdések</h2>
          <p>
            Az alábbi kérdések merültek fel bennem a játék fejlesztése során:
          </p>
          <h2 className="font-bold mt-2">1. Listák és kimutatások</h2>
          <h2 className="font-bold">Kérdésem:</h2>
          <p className="leading-8">
            - A húzás utáni listák és kimutatások ugyanazon az oldalon
            jelenjenek meg, ahol a játék történik vagy egy külön oldalon?
          </p>
          <h2 className="font-bold">Döntésem:</h2>
          <p className="leading-8">
            - Miután a Játékos / Üzemeltető leadja a szelvényeket, megjelenik
            egy lista a leadott szelvényekkel és a hozzájuk tartozó
            információval. A húzás után bővül ez a lista a találatok számával, a
            szelvényekre kifizetett összegekkel, stb. Ezenkívül egy külön
            oldalon is (Statistics) elérhető egy részletesebb táblázat a
            szelvényekről, egy grafikon a találatok gyakoriságáról, valamint egy
            rövid összegzés a Játékos / Üzemeltető eredményességéről. Azért
            döntöttem úgy, hogy külön oldalt készítek az eredményekről, mert úgy
            gondoltam, hogy így kényelmesebben és átláthatóbban lehet navigálni
            majd a játék és a kimutatások között.
          </p>
          <h2 className="font-bold mt-2">2. Üzemeltető</h2>
          <h2 className="font-bold">Kérdésem:</h2>
          <p className="leading-8">
            - Ami nem volt egyértelmű számomra, hogy amikor Üzemeltetőként
            játszunk meg szelvényeket, akkor a kifizetendő nyeremények az
            Üzemeltető vagy a Játékos egyenlegéhez adódjanak hozzá?
          </p>
          <h2 className="font-bold">Döntésem:</h2>
          <p className="leading-8">
            - Úgy döntöttem, hogy a nyeremények a Játékos egyenlegéhez adódjanak
            hozzá. Az is logikus döntés lett volna, hogy az Üzemeltető
            egyenlegéhez adódjon hozzá a nyeremény, hiszen az Üzemeltető
            játszott, de mivel a szövegben az szerepelt, hogy ¨A Játékos
            nyereménye adódjon hozzá az egyenlegéhez¨, ezért az Üzemeltető által
            megjátszott szelvények nyereményösszegeit a Játékos egyenlegéhez
            rendeltem hozzá.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideNotes;
