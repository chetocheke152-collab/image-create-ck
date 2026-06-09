console.log("script.js 読み込み成功");

const randomBtn =document.getElementById('randomBtn');
const titleInput = document.getElementById('titleInput');
const styleInput = document.getElementById('styleInput');
const sizePresetInput = document.getElementById('sizePresetInput');
const moodInput = document.getElementById('moodInput');
const colorInput = document.getElementById('colorInput');
const addColorBtn = document.getElementById('addColorBtn');
const colorList = document.getElementById('colorList');
const colorCount = document.getElementById('colorCount');
const settingInput = document.getElementById('settingInput');
const detailsInput = document.getElementById('detailsInput');
const promptOutput = document.getElementById('promptOutput');
const copyPromptBtn = document.getElementById('copyPromptBtn');
const copyYAMLBtn = document.getElementById('copyYAMLBtn');
const randomTitleBtn = document.getElementById('randomTitleBtn');
const randomMoodBtn = document.getElementById('randomMoodBtn');
const randomSettingBtn = document.getElementById('randomSettingBtn');
const randomColorBtn = document.getElementById('randomColorBtn');
const toggleRandomTools = document.getElementById('toggleRandomTools');
const randomTools = document.getElementById('randomTools');

let colors = ['オレンジ', '白', 'クリーム色'];

const randomThemes = [
  "かわいい子猫",
  "宇宙を旅する少女",
  "魔法使い",
  "サイバーパンク都市",
  "桜の妖精",
  "ドラゴン",
  "未来都市",
  "白い狼",
  "海底神殿",
  "天空の城"
];

const randomMoods = [
  "幻想的",
  "神秘的",
  "可愛い",
  "壮大",
  "癒し",
  "ドラマチック",
  "近未来的",
  "暖かい",
  "明るい",
  "映画的"
];

const randomSettings = [
  "夜の街",
  "宇宙空間",
  "森の中",
  "海辺",
  "雪山",
  "桜並木",
  "未来都市",
  "古代神殿",
  "雲の上",
  "図書館"
];

const randomColors = [
  "青",
  "赤",
  "紫",
  "ピンク",
  "白",
  "黒",
  "金",
  "銀",
  "オレンジ",
  "緑"
];


function randomItem(array){
  return array[
    Math.floor(Math.random() * array.length)
  ];
}

function randomTheme(){
  titleInput.value =
    randomItem(randomThemes);

  updatePrompt();
}

function randomMood(){
  moodInput.value =
    randomItem(randomMoods);

  updatePrompt();
}

function randomSetting(){
  settingInput.value =
    randomItem(randomSettings);

  updatePrompt();
}

function randomColor() {
  // 1〜5種類のどれかをランダムに選ぶ
  const count = Math.floor(Math.random() * 5) + 1;
  
  colors = [];
  for (let i = 0; i < count; i++) {
    // 同じ色が連続しないよう候補から選ぶ
    let candidate;
    let tries = 0;
    do {
      candidate = randomItem(randomColors);
      tries++;
    } while (colors.includes(candidate) && tries < 10);
    colors.push(candidate);
  }

  updateColorDisplay();
  updatePrompt();
}

function generateRandom(){

  randomTheme();
  randomMood();
  randomSetting();
  randomColor();
}

function updateColorDisplay() {

  colorCount.textContent = `(${colors.length})`;

  colorList.innerHTML = colors.map((color, idx) => `
    <div class="color-chip">
      ${color}
      <button class="remove-color-btn" onclick="removeColor(${idx})">
        ✕
      </button>
    </div>
  `).join('');
}

function removeColor(idx) {
  colors.splice(idx, 1);
  updateColorDisplay();
  updatePrompt();
}

window.removeColor = removeColor;

function addColor() {

  console.log("addColor実行");

  const value = colorInput.value.trim();

  if (!value) return;

  if (colors.length >= 5) {
    alert("色は最大5個までです");
    return;
  }

  colors.push(value);

  colorInput.value = '';

  updateColorDisplay();
  updatePrompt();
}

function generateYAML() {

  let yaml = `title: "${titleInput.value}"\n`;
  yaml += `style: "${styleInput.value}"\n`;
  yaml += `size_preset: "${sizePresetInput.options[sizePresetInput.selectedIndex].text}"\n`;
  yaml += `aspect_ratio: "${sizePresetInput.value}"\n`;
  yaml += `mood: "${moodInput.value}"\n`;

  if (colors.length) {

    yaml += `colors:\n`;

    colors.forEach(color => {
      yaml += `  - "${color}"\n`;
    });
  }

  if (settingInput.value) {
    yaml += `setting: "${settingInput.value}"\n`;
  }

  if (detailsInput.value) {
    yaml += `detail: "${detailsInput.value}"\n`;
  }

  return yaml;
}

function generatePrompt() {

  let prompt = '';

  if (titleInput.value) {
    prompt += `${titleInput.value}を作成してください`;
  }

  if (styleInput.value) {
    prompt += `。スタイル：${styleInput.value}`;
  }

  if (sizePresetInput.value) {

    prompt += `。出力サイズ：${sizePresetInput.options[sizePresetInput.selectedIndex].text}`;
  } 

  if (moodInput.value) {
    prompt += `。雰囲気：${moodInput.value}`;
  }

  if (settingInput.value) {
    prompt += `。背景：${settingInput.value}`;
  }

  if (colors.length) {
    prompt += `。色：${colors.join('、')}`;
  }

  if (detailsInput.value) {
    prompt += `。${detailsInput.value}`;
  }

  return prompt;
}

function updatePrompt() {
  promptOutput.textContent = generatePrompt();
}

function copyToClipboard(text, btn) {

  navigator.clipboard.writeText(text)
    .then(() => {

      const original = btn.innerHTML;

      btn.innerHTML = "✓ コピー済み";

      setTimeout(() => {
        btn.innerHTML = original;
      }, 2000);
    })
    .catch(err => {
      console.error(err);
      alert("コピーに失敗しました");
    });
}

addColorBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addColor();
});

colorInput.addEventListener('keydown', (e) => {

  if (e.key === 'Enter') {

    e.preventDefault();
    addColor();
  }
});

copyPromptBtn.addEventListener('click', () => {
  copyToClipboard(generatePrompt(), copyPromptBtn);
});

copyYAMLBtn.addEventListener('click', () => {
  copyToClipboard(generateYAML(), copyYAMLBtn);
});

titleInput.addEventListener('input', updatePrompt);
styleInput.addEventListener('change', updatePrompt);
sizePresetInput.addEventListener('change',updatePrompt);
moodInput.addEventListener('input', updatePrompt);
settingInput.addEventListener('input', updatePrompt);
detailsInput.addEventListener('input', updatePrompt);
randomBtn.addEventListener("click",generateRandom);
randomTitleBtn.addEventListener("click",randomTheme);
randomMoodBtn.addEventListener("click",randomMood);
randomSettingBtn.addEventListener("click",randomSetting);
randomColorBtn.addEventListener("click",randomColor);
toggleRandomTools.addEventListener('click',() => {randomTools.classList.toggle('hidden');
const opened =! randomTools.classList.contains('hidden');
toggleRandomTools.textContent = opened? '▲ 個別ランダム': '▼ 個別ランダム';});
updateColorDisplay();
updatePrompt();

const infoToggleBtn = document.getElementById('infoToggleBtn');
const infoText = document.getElementById('infoText');
const infoChevron = document.getElementById('infoChevron');
const infoLabel = document.getElementById('infoLabel');

infoToggleBtn.addEventListener('click', () => {
  const isOpen = infoText.classList.toggle('hidden') === false;
  infoChevron.classList.toggle('open', isOpen);
  infoLabel.textContent = isOpen ? '閉じる' : '推奨環境';
});
