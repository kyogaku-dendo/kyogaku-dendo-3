// アクセスカウンタのフェッチ
const fetchAccessCounter = async () => {
  const url = "https://renbai-counter.yokohama.dev/counter";
  try {
    const request = await fetch(url);
    return (await request.json()).count;
  } catch {
    return null;
  }
};

// アクセスカウンタの計測 & 表示
const displayAccessCounter = async () => {
  let count = await fetchAccessCounter();

  // トップページのみ表示
  const span = document.querySelector("#access-counter-no");
  if (!span) {
    return;
  }
  if (count === null) {
    count = 0;
  }
  const countStr = ("00000" + count).slice(-6);
  for (let i = 0; i < 6; i++) {
    const digit = countStr[i];
    const img = document.createElement("img");
    img.src = `img/digits/${digit}.gif`;
    span.appendChild(img);
  }
};

let i = 0;
let first = true;

const animateChars = () => {
  const chars = document.querySelectorAll(".char");
  if (!first) {
    const before = i - 1 >= 0 ? i - 1 : chars.length - 1;
    chars[before].classList.toggle("impact");
  }
  chars[i].classList.toggle("impact");
  i = i + 1 < chars.length ? i + 1 : 0;
  first = false;
  setTimeout(animateChars, 100);
};

window.addEventListener("load", async () => {
  displayAccessCounter();

  // 右クリック・コピーの禁止
  /*document.body.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    alert("右クリックは禁止です!!");
  });
  document.body.addEventListener("copy", (e) => {
    e.preventDefault();
    alert("コピーも禁止です!!");
  });*/

  animateChars();
});
