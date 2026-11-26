
// ========================================
// INTRO : 인트로 설정
// ========================================

const INTRO_DURATION = 6400;

const intro = document.getElementById('intro');
const archivePage = document.getElementById('archivePage');
let introTimer;

function finishIntro() {
  clearTimeout(introTimer);
  intro.classList.add('is-ending');
  archivePage.classList.add('is-visible');
}

function replayIntro() {
  clearTimeout(introTimer);

  intro.classList.remove('is-ending');
  archivePage.classList.remove('is-visible');

  document.querySelectorAll('.scene').forEach(scene => {
    scene.style.animation = 'none';
    void scene.offsetHeight;
    scene.style.animation = '';
  });

  const bar = document.getElementById('introProgress');

  if (bar) {
    bar.style.animation = 'none';
    void bar.offsetHeight;
    bar.style.animation = '';
  }

  introTimer = setTimeout(finishIntro, INTRO_DURATION);
}

document.getElementById('skipIntro').addEventListener('click', finishIntro);

document.getElementById('replayIntro').addEventListener('click', e => {
  e.preventDefault();
  replayIntro();
});

const replayButton = document.getElementById('replayButton');

if (replayButton) {
  replayButton.addEventListener('click', replayIntro);
}


// ========================================
// ARCHIVE : 카테고리 설정
// ========================================

const categories = {
  chair: ['의자', 'CHAIR'],
  clothes: ['의상', 'CLOTHES'],
  bag: ['가방', 'BAG'],
  table: ['테이블', 'TABLE'],
  architecture: ['건축물', 'ARCHITECTURE']
};


// ========================================
// PHOTO COMMENTS : 사진별 작가 및 설명
// ========================================

const descriptions = {
  chair: {
    "01": { title: "글로브 가든", titleEn: "Globe Garden", artist: "피터 옵스빅(Peter Opsvik)", comment: "나무와 가지에서 영감을 받아 원시 시대 인류가 나무 위에서 편안하게 휴식을 취하던 모습을 현대적으로 재해석한 작품입니다."},
    "02": { title: "불안정한 신체", titleEn: "restless body", artist: "위밍 후(Yuming Hu)", comment: "사람들이 앉은 뒤 무의식적으로 하는 꼼지락거림이나 미세한 신체 움직임(스트레칭, 발동작 등)을 반영해 제작된 실험적인 가구 시리즈입니다."},
    "03": { title: "Z-체어", titleEn: "Z-Chair", artist: "자하 하디드(Zaha Hadid)", comment: "공간 속에서 지그재그로 뻗어나가는 3차원적 유선형 형태를 지녔으며, 얇은 선과 넓은 면이 조화를 이루어 시각적인 우아함과 구조적 안정감을 동시에 제공합니다."},
    "04": { title: "파일론 체어", titleEn: "Pylon Chair", artist: "톰 딕슨(Tom Dixon)", comment: " 세상에서 가장 가벼운 의자를 만들려는 시도에서 출발한 아이코닉한 디자인 가구입니다."},
    "05": { title: "오링 체어 3", titleEn: "O-ring chair 3", artist: "방효빈(Bang Hyo-bin)", comment: "주얼리나 금속공예에서 부속품을 연결할 때 쓰는 작은 '오링(O-ring)' 요소를 확장하여, 고리들이 서로 맞물리며 구조를 이루도록 제작한 아트 퍼니처입니다."},
    "06": { title: "마이셀리움 체어", titleEn: "Mycelium Chair", artist: "에코사피엔스 (Ecosapiens)", comment: "느타리버섯과 균사체의 유기적인 주름과 부드러운 질감을 가구 디자인에 접목한 콘셉트 AI 아트 작품입니다. 나뭇가지 형태의 받침대 위에 포근한 패브릭과 버섯 갓의 곡선이 조화를 이루어 자연이 실내 공간에 스며든 듯한 몽환적이고 친환경적인 분위기를 자아냅니다."},
    "07": { title: "피보나치", titleEn: "Fibonacci", artist: "세바스티안 브라이코비치(Sebastian Brajkovic)", comment: "17세기풍의 고전적인 의자 형태를 피보나치 수열과 황금비의 수학적 비율에 맞춰 공간 속에서 왜곡·비틀어 만든 초현실주의적 가구입니다." },
    "08": { title: "풀 체어 2", titleEn: "Pool Chair 2", artist: "머디캡 (Muddycap)", comment: "자연물에서 볼 수 있는 유기적이고 뒤틀린 기하학적 형태를 기본 개념으로 단순한 기능적 가구를 넘어 의자라는 형태를 캔버스 삼아 예술성과 창의성을 유쾌하게 풀어내는 머디캡 특유의 디자인 세계관이 잘 드러납니다." },
    "09": { title: "메짜드로 스툴", titleEn: "Mezzadro Stool", artist: "자노타(Zanotta)", comment: "실제 농기계(트랙터)에 쓰이던 구멍 뚫린 철제 시트를 그대로 가져와 에나멜 도장 처리했습니다. 빗물이 빠지도록 설계된 구멍과 인체공학적인 굴곡이 특징입니다." },
    "10": { title: "셀라 스툴", titleEn: "Sella Stool", artist: "자노타(Zanotta)", comment: " 자전거 안장(Black racing bicycle saddle)과 분홍색으로 도색된 스틸 기둥, 오뚝이처럼 반구형으로 흔들리는 주철 베이스(Cast-iron base)로 구성되어 있습니다." },
    "11": { title: "UP5+UP6 ", titleEn: "UP5_6 ", artist: "가에타노 페세(Gaetano Pesce)", comment: "여성의 곡선과 몸매에서 영감을 받았으며, 둥근 공 모양의 오토만(Up 6)이 끈으로 의자(Up 5)와 연결되어 있어 여성의 억압(쇠사슬에 묶인 듯한 모습)을 은유적으로 표현한 디자인 아이콘입니다." },
    "12": { title: "섀도우 암체어", titleEn: "Shadow Armchair", artist: "가에타노 페세(Gaetano Pesce)", comment: " 푹신한 퀼팅 이불이나 쿠션 형태를 한 독특하고 조형적인 라운지 체어로, 포근함과 해체주의적 감성을 담고 있습니다" },
    "13": { title: "오르곤 체어", titleEn: "Orgone Chair", artist: "마크 뉴슨(Marc Newson)", comment: "알루미늄 소재에 자동차용 래커(Automotive lacquer)로 내외부를 도색한 유려한 곡선형 체어입니다. 전후 이탈리아 코치빌더들이 수작업으로 두들겨 만들었던 클래식 스포츠카의 유려하고 유기적인 차체 라인에서 영감을 받아 제작되었습니다." },
    "14": { title: "그린 스트리트 체어", titleEn: "Greene Street Chair", artist: "가에타노 페세(Gaetano Pesce)", comment: "표준화된 공장 대량생산 방식에 우연성과 수공예적 요소를 도입하기 위해, 재료가 완전히 굳기 전에 손자국을 남기거나 형태를 조금씩 변형하는 방식으로 각 제품에 고유성을 부여했습니다" },
    "15": { title: "빅 이지", titleEn: "Big Easy", artist: "론 아라드(Ron Arad)", comment: "1. 1988년 론 아라드가 제작한 차가운 스테인리스 스틸 의자의 조형미를 포근한 폴리우레탄 폼과 패브릭으로 재해석했습니다. 1. 아티스트의 실험적인 수공예 작품을 모로소의 기술력을 통해 대량 생산이 가능한 현대 가구로 성공시킨 기념비적인 모델입니다." },
    "16": { title: "R 쉘 체어", titleEn: "R Shell Chair", artist: "에바 추(Eva Chou)", comment: "컴퓨터로 생성한 3차원 모델의 와이어프레임 메쉬(wireframe mesh) 미감을 살리기 위해, 서로 맞기대고 있는 형태의 휘어진 두 개의 표면으로 건축적으로 설계되었습니다." },
    "17": { title: "프루스트 체어", titleEn: "Poltrona di Proust", artist: "알레산드로 멘디니(Alessandro Mendini)", comment: "18세기 로코코풍의 고풍스러운 바로크 양식 안락의자에 화려한 점묘화 패턴을 수작업으로 입혀, 과거와 현대의 감성이 결합된 포스트모더니즘 디자인의 아이콘으로 평가받습니다." },
    "18": { title: "본 체어", titleEn: "Bone Chair", artist: "요리스 라만(Joris Laarman)", comment: "자연의 뼈나 나무가 자라나는 방식을 모방한 3D 최적화 알고리즘 소프트웨어를 활용해 설계되었습니다. 힘을 많이 받는 부분에는 재료가 두껍게 쌓이고, 하중이 적게 받는 부분은 재료가 최소화되는 유기적인 구조를 가지고 있습니다." },
    "19": { title: "펠트 체어", titleEn: "MFelt Chair", artist: "마크 뉴슨(Marc Newson)", comment: " 유기적인 곡선과 미래지향적인 비정형 실루엣이 돋보이며, 노란색 외에도 오렌지, 레드, 그린, 블루, 화이트, 블랙 등 다양한 유광 컬러로 생산되었습니다." },
    "20": { title: "카본 체어", titleEn: "Carbon Chair", artist: "베르트얀 포트(Bertjan Pot)", comment: "찰스 임스(Charles Eames)의 고전적인 디자인에서 영감을 받은 실루엣에, 마치 실타래가 얽힌 듯한 독특하고 가벼운 와이어 형태의 구조가 특징입니다." },
    "21": { title: "라수 체어", titleEn: "Lassù Chair", artist: "알레산드로 멘디니(Alessandro Mendini)", comment: "가장 단순하고 본연의 기능(앉는 것)만을 지닌 의자를 거대한 피라미드 형태의 좌대 맨 위에 올려놓음으로써, 순수한 '기능'이 권위를 얻어 군림하는 현상을 비판적으로 표현한 작품입니다." },
    "22": { title: "크로스 체크 체어", titleEn: "Cross Check Chair", artist: "프랭크 게리(Frank Gehry)", comment: "어린 시절 가지고 놀던 나무 사과 상자에서 영감을 받아 탄생한 이 의자는, 프랭크 게리 특유의 유려한 건축적 곡선을 가구로 완벽히 구현한 걸작입니다. 별도의 무거운 프레임 없이 얇게 겹친 단풍나무 띠들이 리본처럼 교차하며 등받이부터 다리까지 하나로 이어지는 독창적인 구조를 띱니다." },
    "23": { title: "스핀 체어", titleEn: "Spun Chair", artist: "토마스 헤더윅(Thomas Heatherwick)", comment: "팽이 모양의 독창적인 오브제 형태를 지닌 의자로, 앉아서 360도로 회전할 수 있으며 정밀한 각도 설계로 쉽게 넘어지지 않습니다." },
    "24": { title: "리틀 앨버트", titleEn: "Little Albert", artist: "론 아라드(Ron Arad)", comment: "등받이 중앙에 뚫린 타원형 홀과 부드러운 곡선이 돋보이는 독창적인 외관을 가졌습니다. 100% 재활용 가능한 폴리에틸렌 소재를 회전 성형 방식으로 제작하여, 가볍고 튼튼하며 물이나 자외선에도 변형이 적습니다." },
    "25": { title: "하우 하이 더 문", titleEn: "How High the Moon", artist: "구라마타 시로(Shiro Kuramata)", comment: "내부 프레임이나 보강재 없이 철망 구조만으로 전통적인 안락의자의 실루엣을 구현해 투명하면서도 가벼운 시각적 효과를 줍니다." },
    "26": { title: "미스 블랑쉬", titleEn: "Miss Blanche", artist: "구라마타 시로(Shiro Kuramata)", comment: "투명한 아크릴 수지 속에 붉은 장미꽃들이 떠 있는 듯이 봉인되어 있으며, 테네시 윌리엄스의 희곡 《욕망이라는 이름의 전차》의 주인공 '블랑쉬 뒤부아'에게 영감을 받아 제작되었습니다." },
    "27": { title: "지그재그 체어", titleEn: "Zig-Zag Chair", artist: "게리트 리트벨트(Gerrit Rietveld)", comment: "네덜란드 데 스테일(De Stijl) 운동 및 미니멀리즘 디자인의 대표작으로, 네 개의 평평한 나무 판을 지그재그 형태(Z자)로 연결하여 만든 혁신적인 구조의 의자입니다." },
    "28": { title: "아모에베 하이백 체어", titleEn: "Amoebe Highback Chair", artist: "베르너 판톤(Verner Panton)", comment: "좌식 명상 문화의 동양의 라이프스타일에서 영감을 받았으며, 머리 위를 아늑하게 감싸며 뻗어 올라가는 하이백 등받이가 조형적인 캐노피 구조를 형성하여 넓고 개방된 공간 안에서도 프라이빗하고 안락한 은신처를 제공합니다." },
    "29": { title: "S-체어", titleEn: "S-Chair", artist: "톰 딕슨(Tom Dixon)", comment: "유려한 S자 곡선 실루엣과 감각적인 레드 컬러의 패브릭 또는 가죽 마감, 금속 베이스가 특징인 현대 산업 디자인의 대표작입니다." },
    "30": { title: "텅 체어", titleEn: "Tongue Chair", artist: "피에르 폴랑(Pierre Paulin)", comment: "다리 없이 등받이부터 좌판까지 하나의 매끄러운 혀 모양 곡선으로 이어지는 조각적 디자인의 라운지 체어입니다." },
    "31": { title: "하트 콘 체어", titleEn: "Heart Cone Chair", artist: "베르너 판톤(Verner Panton)", comment: "심장이 연상되는 대담한 하트 모양의 실루엣과 원뿔형(Cone) 바디, 스테인리스 스틸 크로스 베이스가 결합된 아이코닉한 라운지 체어입니다." },
    "32": { title: "리본 체어", titleEn: "Ribbon Chair", artist: "피에르 폴랑(Pierre Paulin)", comment: "끝이 이어진 리본처럼 유려하게 휘어지는 곡선 디자인으로, 어느 각도에서 보아도 조각 작품 같은 입체감을 줍니다." },
    "33": { title: "판톤 체어", titleEn: "Panton Chair", artist: "베르너 판톤 / 비트라(Verner Panton / Vitra)", comment: "뒷다리 없이 하나의 S자 곡선으로 이어져 앉을 때 적당한 탄성과 편안함을 주는 캔틸레버 구조로 되어 있으며, 인체공학적 곡선과 부드러운 플라스틱 소재 덕분에 쿠션 없이도 몸을 자연스럽게 감싸줍니다. 또한 이음새 없는 일체형 사출 성형 공법으로 제작되어 내구성이 뛰어납니다." },
    "34": { title: "컨슈머스 레스트 라운지 체어", titleEn: "Consumer's Rest Lounge Chair", artist: "프랭크 슈라이너(Frank Schreiner)", comment: "대형마트에서 흔히 볼 수 있는 쇼핑카트를 절단하고 구부리는 등 최소한의 변형만을 가해 안락의자(라운지 체어) 형태로 재탄생하여 과도한 소비주의와 자본주의 사회를 풍자하고 비판하는 시각을 담았습니다." },
    "35": { title: "피콕 체어", titleEn: "Peacock Chair", artist: "드로르 벤셰트리트(Dror Benshetrit)", comment: "바느질이나 접착제 없이 펠트 천을 주름잡아 겹쳐 끼우는 독창적인 방식으로 제작되어, 공작새가 깃털을 펼친 듯한 화려한 형태를 보여줍니다." },
    "36": { title: "펠트리 체어", titleEn: "Feltri Chair", artist: "가에타노 페셰(Gaetano Pesce)", comment: "마치 망토나 깃을 세운 듯한 포근하고 아늑한 형태가 특징으로, 두꺼운 양모 펠트 소재만으로 구조와 좌석을 동시에 구현한 혁신적인 가구입니다." },
    "37": { title: "라 셰즈", titleEn: "La Chaise", artist: "찰스 & 레이 임스(Charles & Ray Eames)", comment: "조각가 가스통 라셰즈(Gaston Lachaise)의 작품 <플로팅 피겨 (Floating Figure)>에서 영감을 받아 유기적인 곡선으로 제작되었습니다. : 화이트 래커 처리된 폴리우레탄(또는 초기 유리섬유) 쉘, 크롬 도금 스틸 다리, 오크 소재의 X자 베이스로 구성되어 있습니다." },
    "38": { title: "볼 체어", titleEn: "Ball Chair", artist: "에로 아르니오(Eero Aarnio)", comment: "공(Ball) 모양의 독창적인 구형 디자인으로, 내부는 아늑한 패브릭 쿠션으로 되어 있어 주변 소음을 차단하고 자신만의 아늑한 공간을 제공합니다." },
    "39": { title: "버블 체어", titleEn: "Bubble Chair", artist: "에로 아르니오(Eero Aarnio)", comment: "투명한 아크릴(또는 파이버글라스) 소재의 반구형(또는 구형) 쉘에 체인을 달아 천장에 매달아 쓰는 행잉 체어(Hanging Chair)입니다. 공중에 떠 있는 구조와 둥근 형태 덕분에 외부 소음을 일부 차단해 아늑한 착좌감을 주는 것이 특징입니다." },
    "40": { title: "파스틸 체어", titleEn: "Pastil Chair", artist: "에로 아르니오(Eero Aarnio)", comment: "사탕(Pastil) 모양에서 영감을 받은 독특한 곡선형 디자인으로, 유리섬유(Fiberglass) 소재로 제작되었으며 실내외 및 물위에서도 사용 가능한 팝아트·스페이스 파이어니어 시대의 아이콘 가구입니다." },
    "41": { title: "머쉬룸 체어", titleEn: "Mushroom Chair", artist: "피에르 폴랑(Pierre Paulin)", comment: "버섯을 닮은 유기적이고 감싸 안는 듯한 곡선형 실루엣이 특징이며, 스틸 프레임과 성형 폼 위에 신축성 있는 일체형 패브릭을 씌워 제작되었습니다." },
    "42": { title: "그루비 체어", titleEn: "Groovy Chair", artist: "피에르 폴랑(Pierre Paulin)", comment: "1973년에 발표된 곡선미가 돋보이는 스쿠프 형태의 라운지 체어로, 독특한 쉐입과 편안한 착좌감 덕분에 모던·미드센추리 인테리어 아이템으로 인기가 높습니다." },
    "43": { title: "플래트너 암체어", titleEn: "Platner Arm Chair", artist: "워렌 플래트너(Warren Platner)", comment: "수백 개의 수직 스틸 와이어를 용접하여 만든 독특한 원형 베이스와 성형 파이버글래스 쉘, 폼 쿠션으로 구성되어 있습니다. 960년대 모더니즘을 대표하는 조형미가 돋보이며, 우아하고 곡선적인 실루엣이 특징입니다." },
    "44": { title: "라비올로 체어", titleEn: "Raviolo Chair", artist: "론 아라드(Ron Arad)", comment: " 라비올리 파스타의 부드럽고 유연한 곡선에서 영감을 받아 하나의 리본이 자연스럽게 말려 들어간 듯한 조형미가 특징이며, 실내외에서 모두 사용 가능합니다." },
    "45": { title: "퍼즐 메이커 체어", titleEn: "Makerchair Puzzle", artist: "요리스 라만(Joris Laarman)", comment: "가정용 소형 FDM 3D 프린터의 크기 제한 한계를 극복하기 위해, 의자 전체 구조를 조각조각 분할된 입체적인 퍼즐 형태로 파츠들을 나누어 프린팅한 뒤, 스냅 커넥터 방식으로 조립하여 완성할 수 있는 구조입니다." },
    "46": { title: "이지 에지스", titleEn: "Easy Edges", artist: "프랭크 게리(Frank Gehry)", comment: "흔하고 저렴한 포장재인 골판지를 수십 겹으로 압축하고 적층하여, 일상적으로 사용할 수 있을 만큼 단단한 내구성과 강도를 확보했습니다." },
    "47": { title: "적청 체어", titleEn: "Red and Blue Chair", artist: "게리트 리트벨트(Gerrit Rietveld)", comment: "이 의자는 네덜란드 추상미술 운동인 '데 스틸(De Stijl)'의 신조형주의 정신을 대표하는 가구로, 직선과 평면, 강렬한 원색(빨강, 파랑, 노랑)의 조합을 통해 기하학적 조형미와 공간 구조를 표현한 20세기 모더니즘 디자인의 아이콘입니다." },
    "48": { title: "그래디언트 체어", titleEn: "Gradient Chair", artist: "요리스 라만(Joris Laarman)", comment: "컴퓨터 알고리즘과 셀룰러 레벨(세포 구조) 디자인을 적용하여, 하중을 많이 받는 부분은 단단하게 하고 무게가 덜 필요한 부분은 가벼운 거품(foam) 형태의 그라디언트 구조로 설계했습니다." },
    "49": { title: "노바디 체어", titleEn: "Nobody Chair", artist: "컴플롯 디자인(Komplot Design)", comment: "재활용 플라스틱을 가공하여 만든 펠트(PET felt) 소재로, 프레임이나 나사 없이 한 조각의 펠트를 압축 성형하여 만든 친환경적이고 가벼운 일체형 의자입니다." },
    "50": { title: "패스트 록킹 체어", titleEn: "Fast Rocking Chair", artist: "머디캡 (Muddycap)", comment: "지그재그 모양의 들쭉날쭉한 모서리와 곡선 형태를 통해 가만히 서 있을 때도 마치 매우 빠른 속도로 격렬하게 움직이는 듯한 착시 현상을 불러일으키는 것이 특징입니다." },
    "51": { title: "임스 RAR", titleEn: "Eames Rocking, Armchair, Rod Base", artist: "찰스 임스&레이 임스(Charles Eames & Ray Eames)", comment: " 아이코닉한 에펠탑 형태의 금속 와이어 구조와 편안한 곡선형 암체어 디자인에 흔들의자(Rocker) 베이스가 결합된 클래식 가구입니다." },
    "52": { title: "임스 DSW", titleEn: "Eames Dining, Armchair, Rod Base", artist: "찰스 임스&레이 임스(Charles Eames & Ray Eames)", comment: "인체의 곡선을 따라 부드럽게 성형된 청록색의 일체형 시트가 등과 허리를 안정적으로 감싸주며, 4개의 따뜻한 원목 다리 사이를 검은색 스틸 와이어가 에펠탑 모양으로 교차하며 단단히 지탱해 내구성과 조형미를 동시에 갖춘 실용적인 디자인 의자입니다." },
    "53": { title: "싱킹 맨스 체어", titleEn: "Thinking Man's Chair, Rod Base", artist: "재스퍼 모리슨(Jasper Morrison)", comment: "앤틱 의자에서 영감을 받아 구조적인 요소만 남겨 간결하게 설계된 철제 라운지 체어로, 양팔걸이에 작은 원형 테이블(컵이나 물건을 올려둘 수 있는 공간)이 달려 있는 것이 독특한 매력입니다." },
    "54": { title: "LC4", titleEn: "LC4", artist: "피에르 잔느레&샬롯 페리앙 (Pierre Jeanneret&Charlotte Perriand)", comment: "크롬 도금 스틸 프레임과 블랙 스틸 베이스, 천연 송치(털이 있는 가죽, Pelle con pelo) 매트리스 및 블랙 가죽 헤드레스트로 구성된 '휴식을 위한 기계(Chaise longue)' 콘셉트의 명품 라운지 체어입니다." },
    "55": { title: "플래그 할야드 체어", titleEn: "Flag Halyard Chair", artist: "한스 J. 웨그너(Hans J. Wegner)", comment: "견고한 스테인리스 스틸 프레임에 약 240미터 길이의 특수 깃발 줄을 촘촘히 엮어 시트와 등받이를 완성한 라운지 체어입니다. 차가운 금속 프레임과 단단한 끈의 감촉을 부드럽게 중화하기 위해 시트 위에는 풍성한 긴 털의 양피가 놓여 있으며, 상단에는 목을 편안하게 받쳐주는 원통형 가죽 헤드 쿠션이 장착되어 있습니다." },
    "56": { title: "그라비티 발란스", titleEn: "Gravity balance", artist: "피터 옵스빅(Peter Opsvik)", comment: "인체공학적 의자의 끝판왕이자 명품 무중력 의자로 매우 유명한 제품으로, 무게 중심을 어떻게 이동하느냐에 따라 독서나 업무를 위한 정자세, 무릎 의자 형태, 그리고 완벽한 무중력 휴식 자세까지 총 3가지 각도로 변형 가능합니다." },
    "57": { title: "소울 체어", titleEn: "Soul Chair", artist: "머디캡(Muddycap)", comment: "영화나 애니메이션에서 영혼이 육체를 탈출하는 시각적 연출에서 영감을 받아, 의자에서 영혼이 빠져나가는 순간을 중첩된 형태로 아름답게 구현한 작품입니다." },
    "58": { title: "스텔트만 체어", titleEn: "Steltman Chair", artist: "게리트 리트벨트(Gerrit Rietveld)", comment: "두 개의 의자가 서로 거울을 보듯 좌우 반대로 완벽한 대칭을 이루도록 디자인되었습니다. 이는 서로 다른 둘이 만나 하나가 되는 커플(결혼)의 상징적인 의미를 담고 있습니다." },
    "59": { title: "라운드백 암체어", titleEn: "Round-backed Armchair", artist: "샤오판(Shao Fan)", comment: "동양의 미학과 현대적인 미니멀리즘이 결합되어, 등받이와 팔걸이로 이어지는 우아한 원형 곡선, 그리고 하단의 직선적이고 넓은 판 형태의 뒷다리가 이루는 곡선과 직선, 비움과 채움의 완벽한 대비가 돋보이는 작품입니다." },
    "60": { title: "바실리 체어", titleEn: "Wassily Chair", artist: "마르셀 브로이어(Marcel Breuer)", comment: "전거 핸들에서 영감을 받은 구부러진 관 모양의 강철 프레임과 팽팽하게 당겨진 가죽 스트랩이 결합해 간결한 기하학적 조형미를 보여줍니다." },
    "61": { title: "버터플라이 체어", titleEn: "Butterfly Chair", artist: "안토니오 보넷 & 후안 쿠르찬 & 호르헤 페라리-하르도이(Antonio Bonet & Juan Kurchan & Jorge Ferrari-Hardoy)", comment: "나비의 날개를 펼친 듯한 입체적인 디자인과 얇고 튼튼한 금속 프레임이 결합된 가죽 의자입니다. 별도의 쿠션 없이도 프레임 네 모서리에 가죽 시트를 끼우는 간단한 구조로 만들어져 가볍고 유연하게 몸을 감싸줍니다." },
    "62": { title: "가든 체어", titleEn: "Garden Chair", artist: "베르트 뢰슈너(Bert Loeschner)", comment: "전 세계에서 가장 저렴하고 흔한 플라스틱 의자(모노블록) 를 활용한 현대미술 컬렉션으로, 의자의 한쪽 팔걸이가 사람의 팔처럼 부드럽게 뻗어 나와 자신이 비를 맞지 않도록 우산을 들고 있는 모습을 위트 있게 표현한 작품입니다." },
    "63": { title: "에그 체어", titleEn: "Egg chair", artist: "아르네 야콥센(Arne Jacobsen)", comment: " 달걀을 연상시키는 유려하고 조형적인 곡선과 몸을 감싸 안는 듯한 윙백(Wingback) 형태, 틸트 및 스위블 기능이 적용된 4발 스타 베이스가 특징입니다." },
    "64": { title: "임스 LCW", titleEn: "Eames Lounge Chair Wood", artist: "찰스 임스&레이 임스(Charles Eames & Ray Eames)", comment: "인체의 곡선에 맞춰 성형된 얇은 5겹 합판이 쿠션 없이도 몸을 부드럽게 감싸주어 뛰어난 착석감을 제공합니다. 등받이와 좌판 연결부에 장착된 고무 쇼크 마운트가 앉을 때의 충격을 흡수하고 미세한 움직임에 유연하게 반응하여 안락함을 더해줍니다." },
    "65": { title: "바르셀로나 체어", titleEn: "Barcelona Chair", artist: "루트비히 미스 반 데어 로에 & 릴리 라이히(Ludwig Mies van der Rohe & Lilly Reich)", comment: " X자 형태의 크롬 또는 블랙 스틸 프레임과 쿠션감 있는 가죽(또는 패브릭) 터프팅 시트가 조화를 이루는 20세기 모던 디자인의 아이콘입니다." },
    "66": { title: "스컬프 체어", titleEn: "Sculpt chair", artist: "마르텐 바스(Maarten Baas)", comment: "직접 손으로 그린 거칠고 삐뚤비뚤한 의자 스케치를 그대로 현실의 3차원 가구로 구현하여, 가구 제조에서 정석으로 통하는 완벽한 대칭이나 직선을 의도적으로 전복시킨 것이 특징입니다." },
    "67": { title: "몬스터 체어", titleEn: "Monster Chair", artist: "마르셀 반더스(Marcel Wanders)", comment: "귀여운 형상에 어울리지 않는 험상궂은 괴물의 얼굴 자수가 포인트. 우리 내면에 존재하는 빛과 어둠, 그리고 영원한 내적 갈등을 '몬스터'라는 매개체로 의자에 투영한 디자인입니다." },
    "68": { title: "스파게티 체어", titleEn: "Spaghetti Chair", artist: "잔도메니코 벨로티(Giandomenico Belotti)", comment: "스파게티 면처럼 가늘고 촘촘하게 엮인 PVC 줄이 등받이와 좌판을 이루어 독특한 탄성(착좌감)과 미니멀한 실루엣을 제공합니다." },
    "69": { title: "토고", titleEn: "Togo", artist: "미셸 뒤카로이(Michel Ducaroy)", comment: "목재나 금속 프레임 없이 서로 다른 밀도의 폼(Foam)만으로 제작되어 가볍고 안정적인 착석감을 제공하는 소파입니다. 인체공학적인 설계와 더불어 겉면을 감싸는 풍성한 주름 디테일, 그리고 바닥에 낮게 밀착되는 낮은 무게중심이 어우러져 몸을 포근하게 감싸주는 것이 특징입니다." },
    "70": { title: "움 체어", titleEn: "Womb Chair", artist: "에로 사리넨(Eero Saarinen)", comment: "베개로 가득 찬 바구니에 몸을 웅크린 듯 포근하게 감싸 안아주는 유선형의 쉘 구조가 가장 큰 특징입니다. 몸을 뒤로 젖히거나 다리를 올리는 등 어떤 자세로 앉아도 편안함을 유지하도록 넉넉한 좌석과 등받이 쿠션을 갖추고 있습니다." },
    "71": { title: "옥스 체어", titleEn: "Ox Chair", artist: "한스 J. 웨그너(Hans J. Wegner)", comment: "황소의 뿔을 연상시키는 독특한 형태의 둥근 헤드레스트와 넉넉하고 볼륨감 있는 실루엣이 강렬한 존재감을 드러내는 안락의자입니다. 몸을 포근하게 감싸주는 유선형의 가죽 쿠션이 편안한 착석감을 제공하며, 묵직한 상부와 대조를 이루는 가늘고 날렵한 스테인리스 스틸 프레임 다리가 세련되고 안정적인 균형미를 완성합니다." },
    "72": { title: "쉘 체어", titleEn: "Shell Chair", artist: "한스 J. 웨그너(Hans J. Wegner)", comment: "조개껍데기나 활짝 웃는 입모양처럼 양옆으로 부드럽게 치솟은 넓은 좌판과 완만한 곡선의 등받이가 어우러져 시각적인 아름다움을 선사합니다. 원목 성형 합판으로 매끄럽게 빚어낸 바디에 푹신한 가죽 쿠션을 더해 몸을 포근하게 감싸주며, 세 개의 다리로 지탱하는 독창적인 삼각 구조 덕분에 조형미와 흔들림 없는 안정감을 동시에 갖추고 있습니다." },
    "73": { title: "스완 체어", titleEn: "Swan Chair", artist: "아르네 야콥센(Arne Jacobsen)", comment: "백조가 날개를 펼친 듯한 우아한 실루엣이 돋보이는 이 의자는 직선 없이 오직 부드러운 곡선으로만 이루어진 조형미가 특징입니다. 팔걸이와 등받이가 하나로 자연스럽게 연결되어 몸을 포근하게 감싸주며, 매끄러운 브라운 가죽 마감과 간결한 블랙 4발 회전식 베이스가 조화를 이루어 어느 공간에서나 세련된 분위기를 연출합니다." },
    "74": { title: "에어런 체어", titleEn: "Aeron Chair", artist: "이브 베하르 / 허먼 밀러(Yves Béhar / Herman Miller)", comment: "통기성이 뛰어난 특수 메쉬 소재를 적용해 체중과 압박을 고르게 분산시켜 장시간 착석에도 쾌적함을 유지해 줍니다. 척추와 요추를 안정적으로 받쳐주는 지지 시스템과 세밀하게 각도를 조절할 수 있는 팔걸이 및 기울기 기능을 갖추어 사용자 체형과 자세에 맞춘 인체공학적 설계를 제공합니다. 또한 다양한 체격에 완벽하게 대응할 수 있도록 세 가지 크기로 구분되어 제작되었습니다." },
    "75": { title: "사이얼 체어", titleEn: "Sayl Chair", artist: "이브 베하르 / 허먼 밀러(Yves Béhar / Herman Miller)", comment: "프레임이 없는 독창적인 3D 인텔리전트 백과 Y-타워 지지대를 적용하여 척추의 곡선을 자연스럽고 편안하게 지탱해 줍니다. 통기성이 뛰어난 신축성 소재의 등받이가 사용자의 움직임에 유연하게 반응하며, 좌석 높이와 깊이 조절은 물론 팔걸이와 틸팅 강도까지 세밀하게 맞출 수 있어 장시간 앉아 있어도 쾌적합니다." },
    "76": { title: "프리덤 체어", titleEn: "Freedom Chair", artist: "닐스 디프리언트 / 휴먼스케일(Niels Diffrient / Humanscale)", comment: "사용자의 체중과 움직임에 맞춰 틸팅 강도가 자동으로 조절되는 셀프 리클라이닝 기능을 갖추어 별도의 레버 조작 없이도 편안한 자세를 유지해 줍니다. 양쪽 팔걸이가 하나로 연결되어 함께 움직이는 연동형 구조로 설계되어 팔 높낮이를 손쉽게 맞출 수 있으며, 몸의 굴곡을 따라 자연스럽게 밀착되는 인체공학적 쿠션 시트와 등받이가 장시간 착석 시에도 피로감을 줄여줍니다." },
    "77": { title: "임스 라운지 체어 앤 오토만", titleEn: "Eames Lounge Chair and Ottoman", artist: "찰스 임스&레이 임스(Charles Eames & Ray Eames)", comment: "인체의 곡선에 맞춰 3개의 구역으로 나뉜 유려한 성형합판 쉘 프레임과 풍성하고 부드러운 천연 가죽 쿠션이 결합되어 몸을 포근하게 감싸주는 최상의 착좌감을 제공합니다.등받이 쿠션이 쇼크 마운트라는 고무 부품을 통해 나무 쉘에 유연하게 연결되어 있어, 사용자가 기대어 앉을 때 미세하게 움직이며 체중에 맞춰 반응하는 인체공학적 구조를 갖추고 있습니다." },
    "78": { title: "파이미오 체어", titleEn: "Paimio Chair", artist: "알바 알토(Alvar Aalto)", comment: " 핀란드 파이미오(Paimio) 결핵 요양원을 위해 제작된 스칸디나비아 모더니즘의 대표적인 아이콘으로, 유려한 곡선의 자작나무 프레임과 인체공학적으로 휘어진 좌판이 특징입니다." },
    "79": { title: "암체어 400 탱크", titleEn: "Armchair 400 Tank", artist: "알바 알토(Alvar Aalto)", comment: "곡선으로 휘어진 짙은 갈색의 원목 프레임과 두툼한 올리브 그린 색상의 패브릭 쿠션이 조화를 이루는 라운지 체어입니다. 뒷다리 없이 앞쪽의 U자형 나무 프레임만으로 하중을 지탱하는 캔틸레버(Cantilever) 구조를 채택하여 시각적인 개방감과 은은한 탄성감을 동시에 제공합니다." },
    "80": { title: "퐁", titleEn: "Poäng", artist: "나카무라 노보루 / 이케아(Noboru Nakamura / IKEA)", comment: "층층이 겹쳐 만든 곡선형 자작나무 무늬목 프레임이 유연한 탄성을 제공하여 앉았을 때 편안하게 몸을 받쳐줍니다. 하단이 둥글게 휘어진 흔들의자 구조로 설계되어 부드러운 앞뒤 흔들림을 통해 휴식을 취할 수 있습니다." },
    "81": { title: "어바웃 어 체어", titleEn: "About A Chair AAC22", artist: "히 웰링 / 헤이(Hee Welling / HAY)", comment: "곡선형 등받이와 팔걸이가 하나로 이어진 일체형 쉘 구조로 몸을 포근하게 감싸주어 편안한 착좌감을 제공합니다. 매끈한 화이트 플라스틱 외피와 부드러운 그레이 패브릭 내피가 조화를 이루며, 하단에는 견고하게 뻗은 네 개의 원목 다리가 안정적인 지지력을 더해줍니다." },
    "82": { title: "LC7 스위블 체어", titleEn: "LC7 Swivel Chair", artist: "샬롯 페리앙(Charlotte Perriand)", comment: "둥근 원반 형태의 푹신한 좌판과 반원형으로 감싸는 두툼한 등받이 쿠션이 조화를 이루는 회전형 암체어입니다. 가느다란 강철 튜브 프레임이 좌판과 등받이를 간결하게 지탱하며, 360도 회전이 가능해 다이닝 체어나 데스크 체어로 모두 활용도가 높습니다." },
    "83": { title: "플리아 체어", titleEn: "Plia Chair", artist: "잔카를로 피레티 / 성(Giancarlo Piretti / Castelli)", comment: "투명한 폴리카보네이트 좌판과 등받이, 그리고 반짝이는 크롬 도금 스틸 프레임이 조화를 이루어 어느 공간에 두어도 답답함 없이 세련된 개방감을 주는 접이식 의자입니다. 특히 좌판 양옆의 독특한 원형 3디스크 경첩 구조 덕분에 의자를 부드럽고 슬림하게 접어 보관할 수 있으며, 인체 곡선에 맞춰 살짝 오목하게 디자인된 좌판과 등받이가 보기보다 안정적이고 편안한 착석감을 제공합니다." },
    "84": { title: "체스카 체어", titleEn: "Cesca Chair", artist: "마르셀 브로이어(Marcel Breuer)", comment: "하나의 강철 파이프가 끊김 없이 이어져 공중에 떠 있는 듯한 외팔보(캔틸레버) 구조 덕분에 앉았을 때 은은한 탄성과 편안한 착석감을 선사합니다. 차갑고 매끄러운 크롬 도금 스틸 프레임에 따뜻한 질감의 천연 라탄 소재 좌판과 블랙 원목 테두리가 어우러져 모던하면서도 클래식한 분위기를 자아냅니다. " },
    "85": { title: "루이스 고스트 체어", titleEn: "Louis Ghost Chair", artist: "필리프 스탁 / 카르텔(Philippe Starck / Kartell)", comment: ": 18세기크앙크 시대의 루이 15세 암체어 형태를 현대적인 플라스틱(폴리카보네이트) 소재로 재해석하여 클래식하면서도 미니멀한 느낌을 주는 투명 및 유광 디자인 체어입니다" },
    "86": { title: "라마리에", titleEn: "La Marie", artist: "필리프 스탁 / 카르텔(Philippe Starck / Kartell)", comment: "명한 폴리카보네이트 단일 몰드 기술로 제작되어 시각적인 개방감을 극대화한 의자입니다. 유리처럼 맑고 투명한 외관과 달리 충격과 스크래치에 매우 강하며 가벼운 무게로 실내외 어디서나 실용적으로 활용할 수 있습니다. " },
    "87": { title: "팁톤", titleEn: "Tip Ton", artist: "에드워드 바버 & 제이 오스거비 / 비트라(Edward Barber & Jay Osgerby / Vitra)", comment: ": 스키 모양의 하부 스키드 베이스가 앞으로 살짝 기울어지도록 설계되어, 일반적인 자세와 앞으로 살짝 숙여 집중하는 자세를 편안하게 유도하는 기능성 플라스틱 체어입니다." },
    "88": { title: "40/4", titleEn: "40/4", artist: "데이비드 로울랜드 / 하우(David Rowland / Howe)", comment: "4피트 높이의 공간에 최대 40개까지 수직으로 겹쳐 쌓을 수 있도록 설계된 초고밀도 스태킹 의자입니다. 얇은 강철 와이어 프레임과 인체공학적으로 완만하게 휘어진 시트 및 등받이가 결합되어 가벼운 무게에도 뛰어난 내구성과 착석감을 제공합니다." },
    "89": { title: "벨빌 체어", titleEn: "Belleville Chair", artist: "로난 & 에르완 부룰렉 / 비트라(Ronan & Erwan Bouroullec / Vitra)", comment: "이 의자는 프랑스 파리의 전통적인 비스트로 의자에서 영감을 받아 현대적인 감각으로 재해석한 하이브리드 디자인이 특징입니다. 다리에서 시작해 팔걸이와 등받이 상단까지 끊김 없이 하나로 유려하게 이어지는 슬림한 검은색 프레임 구조가 돋보입니다."},
    "90": { title: "카리마테 체어", titleEn: "Carimate Chair", artist: "비코 마지스트레티(Vico Magistretti)", comment: "선명한 빨간색 유광 래커로 마감된 원목 프레임과 천연 골풀을 엮어 만든 좌판이 조화를 이루는 제품입니다. 전통적인 농가용 의자의 소박한 형태를 현대적으로 재해석하여 군더더기 없는 간결한 실루엣을 보여줍니다." },
    "91": { title: "CH24 위시본 체어", titleEn: "Wishbone Chair", artist: "한스 J. 웨그너(Hans J. Wegner)", comment: "등받이에 자리한 유려한 Y자 곡선과 팔걸이까지 하나로 이어지는 스팀 벤딩 원목 프레임이 안정적인 지지력을 제공합니다. 좌판은 약 120미터 길이의 천연 페이퍼 코드를 수작업으로 촘촘하게 엮어내어 탄탄하면서도 통기성이 뛰어나며 사용할수록 체형에 맞게 길들여집니다." },
    "92": { title: "마스터스 체어", titleEn: "Masters Chair", artist: "필립 스탁(Philippe Starck)", comment: "세 개의 상징적인 체어 실루엣이 겹쳐지며 만들어내는 유려한 곡선형 등받이와 팔걸이가 돋보이는 제품입니다. 부드럽게 마감된 폴리프로필렌 소재로 제작되어 무게가 가벼우면서도 내구성이 뛰어나 실내외 어디서나 실용적으로 활용할 수 있습니다." },
    "93": { title: "214 체어", titleEn: "214 Chair", artist: "마이클 토넷 / 토넷(Michael Thonet / Thonet)", comment: "고온과 고압의 증기로 원목을 부드럽게 휘어 만드는 곡목 공법으로 제작되어 유려한 아치형 등받이 곡선과 가벼우면서도 견고한 내구성을 자랑합니다. 내추럴한 원목 프레임에 통기성이 뛰어난 천연 라탄 케인(Cane) 좌판을 결합해 장시간 앉아도 쾌적하며 시각적으로도 따뜻하고 클래식한 분위기를 연출합니다." },
    "94": { title: "에어 체어", titleEn: "Air Chair", artist: "재스퍼 모리슨 / 마기스(Jasper Morrison / Magis)", comment: "유리섬유가 더해진 폴리프로필렌 소재에 에어몰딩 공법을 적용하여 속이 빈 튜브 형태로 제작됨으로써 가벼운 무게와 뛰어난 내구성을 동시에 갖췄습니다. 불필요한 장식을 배제한 간결하고 미니멀한 곡선 디자인과 좌판 중앙의 물빠짐 겸 손잡이 홈 덕분에 실내외 어디서나 쾌적하고 실용적으로 사용할 수 있습니다." },
    "95": { title: "원 체어", titleEn: "Chair_One", artist: "콘스탄틴 그르칙 / 마기스(Konstantin Grcic / Magis)", comment: "빈티지한 질감이 살아있는 밝은 아이보리 톤의 프레임과 짙은 다크 브라운 컬러의 좌판이 대비를 이루는 투톤 디자인의 원목 식탁 의자입니다. 등받이는 7개의 수직 살대로 이루어진 클래식한 슬랫백(Slat-back) 구조를 갖추어 개방감과 안정적인 지지력을 동시에 제공합니다." },
    "96": { title: "모노블럭 체어", titleEn: "Monobloc Chair", artist: "앙리 마소네 (Henry Massonnet)", comment: "하나의 플라스틱 금형으로 통째로 찍어내어 이음새가 없고 무게가 매우 가벼운 것이 특징입니다. 비와 햇빛 등 외부 환경에 강해 야외에서도 변형이나 부식 없이 오래 사용할 수 있으며, 여러 개를 차곡차곡 포개어 쌓을 수 있어 보관과 이동이 매우 편리합니다." },
    "97": { title: "CH88 체어", titleEn: "CH88 Chair", artist: "한스 J. 베그너 / 칼 한센 & 쇤 (Hans J. Wegner / Carl Hansen & Søn)", comment: "따뜻하고 부드러운 곡선의 원목 소재와 간결하고 날렵한 금속 스틸 프레임이 조화를 이루며 우아한 실루엣을 보여줍니다." },
    "98": { title: "CH20 엘보우 체어", titleEn: "CH20 Elbow Chair", artist: "한스 J. 베그너 / 칼 한센 & 쇤 (Hans J. Wegner / Carl Hansen & Søn)", comment: "단단한 원목 통나무를 증기로 쪄서 둥글게 휘어낸 스팀 벤딩 등받이가 허리와 팔꿈치를 동시에 부드럽고 안정적으로 감싸주며, 어느 자세로 기대어 앉아도 편안한 착석감을 제공합니다. 좌판은 프레임 위에 얹힌 듯한 경쾌한 구조로 디자인되었고 내부에 고밀도 폼을 채워 가죽이나 패브릭으로 마감해 폭신하고 아늑한 사용감을 완성합니다." },
    "99": { title: "CH23 체어", titleEn: "CH23 Chair", artist: "한스 J. 베그너 / 칼 한센 & 쇤 (Hans J. Wegner / Carl Hansen & Søn)", comment: "원목 프레임과 수작업으로 엮은 페이퍼 코드 좌판이 조화를 이루는 제품입니다. 등을 편안하게 감싸주는 완만한 곡선 형태의 등받이와 튼튼한 다리 지지대가 안정적인 착석감을 제공합니다. 자연스러운 나뭇결과 통기성이 뛰어난 라탄 느낌의 좌판 디자인 덕분에 계절에 상관없이 쾌적하고 따뜻하게 사용할 수 있습니다." },
    "100": { title: "카살레 다이닝 체어", titleEn: "Casale Dining Chair", artist: "스튜디오 카슈카슈(Studio Kaschkasch)", comment: "단순해 보이지만 등받이와 시트의 완벽한 각도 조절, 다리가 모여드는 하부 프레임의 정교한 짜임새 등 장인정신이 돋보이는 디테일이 가득한 미니멀 디자인입니다." }
  },

  clothes: {
    "01": { title: "분노", titleEn: "Anger", artist: "레이 카와쿠보(Rei Kawakubo)-꼼데가르송(Comme des Garçons)", comment: "혼란스러운 세상 속에서도 '창의성과 경쾌함'을 통해 희망을 찾겠다는 메시지를 담았습니다." },
    "02": { title: "버블 드레스", titleEn: "Bubble Dress", artist: "후세인 샬라얀(Hussein Chalayan)", comment: "인체 주변을 떠다니는 비눗방울이나 분자 구조, 혹은 미래의 우주복 같은 기하학적 보호막을 시각적으로 구현한 작품입니다." },
    "03": { title: "버섯의 포자와 균사체 네트워크", titleEn: "Fungal Network", artist: "아이리스 반 헤르펜(Iris van Herpen)", comment: "드레스 양옆으로 뻗어 나온 수많은 갈래의 가느다란 구조물은 버섯의 주름이나 균사체가 뻗어나가는 모습을 형상화했습니다." },
    "04": { title: "파리 패션위크 컬렉션", titleEn: "Paris Fashion Week", artist: "가레스 퓨 (Gareth Pugh)", comment: "앞면은 순백색의 깔끔한 미래지향적 느낌을 주는 반면, 주름 장식의 뒷면과 의상의 측면·안쪽 라인은 날카로운 검은색으로 처리해 입체감과 그래픽적인 착시 효과를 극대화했습니다." },
    "05": { title: "오트 쿠튀르", titleEn: "Haute Couture", artist: "빅터 앤 롤프(Viktor & Rolf)", comment: "당시 이들은 옷 안에 거대한 풍선이나 패딩을 넣어 버섯구름처럼 목과 어깨가 기형적으로 부풀어 오른 실루엣을 선보였는데, 26년 만에 그 실루엣을 다시 가져왔습니다." },
    "06": { title: "파리 패션위크 컬렉션", titleEn: "Paris Fashion Week", artist: "크레이그 그린 (Craig Green)", comment: "옷의 해체와 보호라는 핵심 철학을 웨어러블하면서도 실험적인 원단 조작으로 풀어낸 작품입니다." },
    "07": { title: "일렉트로닉 아이", titleEn: "Electric Eye", artist: "월터 반 베이렌동크(Walter Van Beirendonck)", comment: "원색의 3D 패딩 입체 조형물(추상적인 동물이나 만화적 형태)을 비대칭으로 덧대어, 전통적인 남성 정장의 실루엣을 유머러스하고 기하학적으로 해체한 작품입니다." },
    "08": { title: "1995 F/W 로봇 슈트", titleEn: "1995 F/W Robot Suit", artist: "티에리 뮈글러 (Thierry Mugler)", comment: "차가운 은빛 크롬 도금 금속판과 투명한 플렉시글라스(Plexiglas)를 결합해 제작했습니다. 가슴과 복부, 허벅지 일부가 투명하게 뚫려 있어 기계의 차가움과 인간 신체의 관능미가 극적으로 대비되는 것이 특징입니다." },
    "09": { title: "파리 패션위크 컬렉션 ", titleEn: "Paris Fashion Week", artist: "이세이 미야케 (Issey Miyake)", comment: "한 장의 천(A Piece of Cloth)'이라는 브랜드의 핵심 철학을 바탕으로, 일본 전통 종이 공예나 종이접기(오리가미)처럼 각이 잡힌 입체적인 후드와 넉넉한 실루엣의 순백색 아우터를 조합한 의상입니다." },
    "10": { title: "웨딩", titleEn: "Wedding", artist: "요지 야마모토 (Yohji Yamamoto)", comment: "언뜻 보면 단정하고 우아한 순백색 투피스 정장과 진주 장식 베일 모자처럼 보이지만, 모델들이 순백의 웨딩드레스를 입고 등장해 런웨이 위에서 직접 옷의 일부를 떼어내거나 해체하는 연출을 선보였습니다." },
    "11": { title: "2026 파리 패션위크 컬렉션", titleEn: "2026 Paris Fashion Week", artist: "준야 와타나베(Junya Watanabe)", comment: "가죽 재킷, 퀼팅 패딩, 무스탕 시어링, 그리고 바이크 헬멧이나 보호 장구처럼 각진 입체 구조물들을 쪼개고 다시 조립해 상체를 갑옷처럼 과장시킨 의상입니다." },
    "12": { title: "2022 파리 패션위크 컬렉션", titleEn: "2022 Paris Fashion Week", artist: "안드레아스 크론탈러 (Andreas Kronthaler)", comment: "꽃무늬(플로럴) 자카드 패턴이 들어간 짙은 푸른색의 초대형 오버사이즈 로브 코트와, 같은 패턴의 트레이닝 팬츠(조거 팬츠)를 매치해 왕실의 예복과 현대의 라운지웨어를 결합한 룩입니다." },
    "13": { title: "인간 백팩", titleEn: "Cyclops Human Backpack", artist: "릭 오웬스 (Rick Owens)", comment: "옷이라는 개념을 넘어 살아있는 사람의 신체 자체를 의상의 부품(하네스와 드레이핑)으로 결합했습니다." },
    "14": { title: "스펀지밥 드레스", titleEn: "SpongeBob Dress", artist: "모스키노 / 제레미 스콧 (Jeremy Scott)", comment: "노란색 바탕에 검은색 구멍 무늬가 들어간 오버사이즈 니트 스웨터를 원피스처럼 연출하고, 그 위에 익살스러운 표정의 스펀지밥 얼굴을 대담하게 프린트했습니다." },
    "15": { title: "랍스터 드레스", titleEn: "Lobster Dresses", artist: "엘사 스키아파렐리 (Elsa Schiaparelli)", comment: "20세기 초현실주의 화가 살바도르 달리가 평소 작품에서 랍스터를 에로티시즘과 욕망의 상징으로 자주 사용했는데, 스키아파렐리는 이를 우아한 이브닝드레스 위에 대담하게 옮겨 놓았습니다." },
    "16": { title: "설표 드레스", titleEn: "Snow Leopard Dress", artist: "다니엘 로즈베리 (Daniel Roseberry)", comment: "어깨끈이 없는 스트랩리스 튜브톱 드레스 가슴 중앙에 입을 크게 벌리고 포효하는 실물 크기의 정교한 설표 머리가 부착되어 있으며, 드레스 전체가 눈표범의 모피 무늬로 이어져 있습니다." },
    "17": { title: "2025 오트 쿠튀르 컬렉션", titleEn: "2025 Haute Couture", artist: "지암바티스타 발리 (Giambattista Valli)", comment: "가슴 라인을 따라 입체적인 장미 꽃잎 아플리케 장식을 더하고, 어깨 아래로 자연스럽게 흘러내리는 오프숄더 드레이핑과 길게 끌리는 트레인(옷자락)으로 고전적이고 낭만적인 쿠튀르 미학을 극대화했습니다." },
    "18": { title: "2021 컬렉션", titleEn: "2021 Collection", artist: "몰리 고다드 (Molly Goddard)", comment: "빤빤한 코튼(면) 포플린 소재로 만든 쨍한 초록색 페플럼 톱과 밑단에 러플이 달린 와이드 크롭 팬츠 투피스와 분홍색 양말, 붉은색 플랫폼 클로그, 파란색 크로셰 모자, 그리고 손에 든 핫핑크 러플 가방까지 보색 대비가 극대화된 과감한 컬러 매치를 선보였습니다." },
    "19": { title: "장미 아플리케 셔츠", titleEn: "Rose Applique Shirt", artist: "시몬 로샤 (Simone Rocha)", comment: "고티에의 상징인 코르셋 아일릿(구멍)과 레이스업 끈 디테일을 드레스의 팔과 치마 절개선 전체에 촘촘하게 적용해 구조적인 실루엣을 만들었습니다." },
    "20": { title: "2025 런던 패션위크 컬렉션", titleEn: "2025 London Fashion Week", artist: "찰스 제프리 러버보이 (Charles Jeffrey LOVERBOY)", comment: "브랜드 10주년을 기념하는 역사적인 마일스톤이었던 이 컬렉션에서, 하늘색 스웨터 전면에 위트 있는 그래픽과 체인/밧줄 모티브를 담고, 머리에는 화이트 발라클라바와 캡을 레이어드한 유니크하고 영한 스트리트 무드를 선보였습니다." },
    "21": { title: "실험적 드레스", titleEn: "Unwearable Dresses", artist: "파코 라반 (Paco Rabanne)", comment: "대신 네모난 알루미늄 금속 판(또는 거울처럼 반짝이는 로도이드 플라스틱 조각)의 모서리에 구멍을 뚫고, 철사 고리(점프 링)를 끼워 펜치(플라이어)로 하나하나 엮어 조립했습니다." },
    "22": { title: "2019 '히프노시스' 컬렉션", titleEn: "Hypnosis", artist: "이리스 반 헤르펜 (Iris van Herpen)", comment: "수천 겹의 얇은 실크 오간자 원단을 물결무늬로 주름 잡아 정교하게 레이저 컷팅한 뒤, 걸을 때마다 착시 현상처럼 일렁이도록 만든 의상입니다." },
    "23": { title: "패딩 볼륨 드레스", titleEn: "Padded Volume Dress", artist: "언더커버 (Undercover)", comment: "브랜드 10주년을 기념하는 역사적인 마일스톤이었던 이 컬렉션에서, 하늘색 스웨터 전면에 위트 있는 그래픽과 체인/밧줄 모티브를 담고, 머리에는 화이트 발라클라바와 캡을 레이어드한 유니크하고 영한 스트리트 무드를 선보였습니다." },
    "24": { title: "신화 속 조각상 컬렉션", titleEn: "Mythical Sculptures", artist: "톰 브라운 (Thom Browne)", comment: "회색과 흰색 톤의 실크 새틴 원단으로 만든 수백 송이의 입체 꽃 장식을 전신 코트 전체에 촘촘하게 수놓아 하나의 거대한 꽃기둥이나 화석화된 정원 조각상 같은 압도적인 실루엣을 완성했습니다." },
    "25": { title: "2025 레디 두 웨어 컬렉션", titleEn: "Ready to Wear", artist: "안 드뮐미스터 (Ann Demeulemeester)", comment: "깊이 파인 브이넥 상의와 섬세한 블랙 레이스 밑단, 길게 흩날리는 원단 자락과 끈, 그리고 무릎까지 오는 풍성한 프린지(술) 장식 부츠를 매치해 낭만적이면서도 거친 보헤미안 고딕 무드를 연출했습니다." },
    "26": { title: "살아있는 잔디", titleEn: "Living Grass Coat", artist: "조나단 앤더슨 (Jonathan Anderson)", comment: "모직 코트와 스니커즈 표면에 특수 처리된 토양과 치아씨드·귀리 씨앗을 심어, 파리 외곽의 온실에서 20일간 직접 물을 주며 실제 풀(잔디)을 키워낸 살아있는 의상입니다." },
    "27": { title: "마돈나 콘 브라 코르셋", titleEn: "Madonna's Cone Bra", artist: "장 폴 고티에 (Jean Paul Gaultier)", comment: "은은한 살구빛 실크 새틴 원단에 촘촘한 스티치(바느질 선)를 넣어 뾰족한 원뿔 모양이 무너지지 않고 단단하게 서 있도록 입체적으로 설계했습니다." },
    "28": { title: "2009 오트 쿠튀르 컬렉션", titleEn: "2009 Haute Couture", artist: "존 갈리아노 (John Galliano)", comment: "17세기 네덜란드 황금기 회화(요하네스 베르메르 등)와 델프트 청화 백자 도자기에서 영감을 받은 컬렉션입니다." },
    "29": { title: "미니 크리니", titleEn: "Mini Crini", artist: "비비안 웨스트우드 (Vivienne Westwood)", comment: "19세기 빅토리아 시대에 여성의 하체를 거대한 종 모양으로 부풀리던 속치마 틀(크리놀린)을 1960년대식 짧은 미니스커트 길이로 과감하게 축소해 결합했습니다." },
    "30": { title: "2011 오트 쿠튀르 컬렉션", titleEn: "Floral Enchantment", artist: "엘리 사브 (Elie Saab)", comment: "은은한 복숭아빛 살구색 시스루 망사 드레스 전면에 입체적인 꽃잎 아플리케(천 조각을 덧대어 입체감을 주는 장식)와 비즈 자수를 풍성하게 수놓아 숲속의 요정 같은 우아한 분위기를 연출했습니다." }

},

  bag: {
    "01": { title: "북 클러치", titleEn: "Book Clutch", artist: "올림피아 르 탱(Olympia Le-Tan)", comment: "고전 소설이나 명화의 책 표지를 그대로 옮겨 놓은 듯한 직사각형 모양의 하드 케이스 클러치 백입니다. 정교한 수작업 자수로 책 표지 그림을 표현했으며, 안감 역시 다채로운 리버티꽃무늬 패브릭으로 마감되어 있어 소장 가치가 높은 패션 포인트 아이템 입니다." },
    "02": { title: "크리스탈 버클 디자인 미노디에르", titleEn: "Crystal Buckle Design Minaudière", artist: "주디스 리버(Judith Leiber)", comment: "클래식한 사첼 백 형태를 구현해 겉면 전체를 수천 개의 실버 스와로브스키 크리스털로 촘촘하게 수놓은 백입니다. 골드 톤의 금속 프레임과 둥근 탑 핸들, 가방 앞면의 정교한 금빛 버클 장식이 보석처럼 화려한 존재감을 줍니다." },
    "03": { title: "너클 클러치", titleEn: "Knuckle Clutch", artist: "알렉산더 맥퀸(Alexander McQueen)", comment: "가방 윗부분에 네 손가락을 끼울 수 있는 너클 모양의 링 손잡이가 달린 알렉산더 맥퀸의 대표적인 박스 클러치 백입니다. 브랜드의 상징인 해골과 스와로브스키 크리스털, 꽃 등 화려하고 반항적인 보석 장식이 더해진 금속 링이 주얼리처럼 돋보입니다." },
    "04": { title: "카퓌신 미니 인피니티 도트", titleEn: "Capucines Mini Infinity Dots", artist: "루이비통 × 야요이 쿠사마(Louis Vuitton × Yayoi Kusama)", comment: "강렬한 레드 컬러의 부드러운 토리옹 가죽 위에 일본 현대미술가 쿠사마 야요이의 상징인 하 얀색 '인피니티 도트(무한 물방울)' 패턴을 입체적으로 새긴 한정판 미니 핸드백입니다. 사다리꼴 모양의 클래식한 카퓌신 실루엣에 실버 톤의 LV 이니셜 장식과 둥근 윗손잡이, 탈부착 가능한 도트 패턴 가죽 스트랩이 어우러져 예술 작품 같은 화려함이 포인트 입니다." },
    "05": { title: "아이즈 백", titleEn: "Eyes Bag", artist: "안야 힌드마치(Anya Hindmarch)", comment: "가방 전면에 둥글게 뜬 두 눈(Eyes) 모양의 가죽 아플리케 패치가 포인트인 영국 디자이너브랜드 안야 힌드마치의 시그니처 컬렉션입니다. 가볍고 튼튼한 소재로 제작되며, 지퍼 포켓 위에 눈동자가 장식되어 마치 가방이 표정을 짓는 듯한 유머러스한 매력이 있습니다." },
    "06": { title: "판도라 박스 백", titleEn: "Pandora Box Bag", artist: "샬롯 올림피아(Charlotte Olympia)", comment: "투명한 직사각형 아크릴 하드 케이스와 키치한 금속 잠금장치가 포인트입니다. 내부의 소지품을 가릴 수 있도록 골드나 레오파드 패턴 등의 탈부착 가능한 파우치가 함께 구성되어 있으며, 보석 상자처럼 매끈하고 독특한 디자인입니다." },
    "07": { title: "크리스프 패킷 클러치", titleEn: "Crisp Packet Clutch", artist: "안야 힌드마치(Anya Hindmarch)", comment: "구겨진 감자칩 봉지 모양을 유머러스하게 형상화한 클러치 백입니다. 골드나 실버 컬러의 광택 있는 소재로 과자 봉지의 자연스러운 주름과 톱니 모양 마감 디테일을 정교하게 구현했습니다." },
    "08": { title: "켈로그 프로스티드 플레이크 클러치", titleEn: "Kellogg's Frosted Flakes Clutch", artist: "안야 힌드마치(Anya Hindmarch)", comment: "켈로그의 대표적인 시리얼 '콘푸로스트' 패키지를 유머러스하게 재현했습니다. 호랑이 캐릭터 '토니(Tony the Tiger)'와 로고, 그릇에 담긴 시리얼 알갱이의 디테일이 돋보이는 디자인입니다." },
    "09": { title: "펌프킨 백", titleEn: "Pumpkin Bag", artist: "루이비통 × 쿠사마 야요이(Louis Vuitton × Yayoi Kusama)", comment: "현대미술가 쿠사마 야요이의 대표작 '호박(Pumpkin)' 을 모티브한 제품입니다. 조각 작품같은 볼륨감과 실루엣으로 예술적 소장 가치와 실용성을 동시에 갖추었습니다." },
    "10": { title: "엘리펀트 포켓", titleEn: "Elephant Pocket", artist: "로에베(Loewe)", comment: "가방 전면에는 코끼리의 둥근 귀와 길게 뻗은 코가 입체적으로 표현되어 있으며, 한쪽 귀에는 브랜드의 상징인 애너그램 로고가 정교하게 음각되어 위트를 더합니다." },
    "11": { title: "버니 백", titleEn: "Bunny Bag", artist: "로에베(Loewe)", comment: "매듭으로 묶어 연출한 길쭉한 토끼 귀 디테일과 앙증맞은 폼폼 꼬리, 펀칭 기법으로 표현된눈 장식이 어우러져 동화적이고 위트 있는 분위기를 자아냅니다." },
    "12": { title: "1969 백", titleEn: "B1969 Bag", artist: "파코 라반(Paco Rabanne)", comment: "수백 개의 작은 디스크 조각을 고리로 하나하나 수작업으로 연결해, 움직일 때마다 유연하게흐르는 듯한 실루엣과 화려한 반짝임을 연출합니다." },
    "13": { title: "1969 스트라스 나노 백", titleEn: "1969 Strass Nano Bag", artist: "라반(Rabanne)", comment: "가방 바디 전체를 감싸는 둥근 크리스털 디테일 아래로 길이가 각기 다르게 떨어지는 크리스털 프린지 장식이 더해져 움직일 때마다 샹들리에처럼 우아하게 흔들리며 빛을 발합니다" },
    "14": { title: "글래스 스와이프 백", titleEn: "Glass Swipe Bag", artist: "코페르니(Coperni)", comment: "코페르니의 스와이프 백을 현대미술 조각품처럼 재해석한 제품입니다. 속이 훤히 들여다보이는 투명한 디자인과 빛의 각도에 따라 영롱하게 굴절되는 광택감이 독보적인 미래지향적무드를 완성합니다." },
    "15": { title: "3D 스파이럴 백", titleEn: "3D Spiral Bag", artist: "지타 탄(ZITA TAN)", comment: "소라의 껍데기가 자연스럽게 휘어지며 이어지는 곡선 부분이 손잡이 역할을 겸하도록 설계되어, 강렬한 조형미와 초현실적이고 미래적인 실루엣을 자아냅니다." },
    "16": { title: "문어 멀티 백", titleEn: "Octopus Multi Bag", artist: "코케코(Cokeco)", comment: "둥근 머리 부분의 수납공간과 역동적으로 뻗은 여덟 개의 다리, 다리 안쪽의 오돌토돌한 빨판 디테일까지 정교하게 구현되어 마치 살아 있는 문어가 몸을 감싸 안고 있는 듯한 위트 있고 강렬한 비주얼을 연출합니다." },
    "17": { title: "립 백", titleEn: "Rib Bag", artist: "익스트로코드(ExtroCode)", comment: "촘촘한 갈비뼈 형태의 프레임 사이로 내부 파우치가 은은하게 비치는 시스루 디자인이 특징이며, 개성 있는 포인트 룩에 독보적인 존재감을 더하는 아이템으로 활용할 수 있습니다." },
    "18": { title: "기타 투웨이 백팩", titleEn: "Guitar Shaped Bag", artist: "히아투스(HIATUS)", comment: "강렬한 레드와 블랙 컬러의 대비가 돋보이는 일렉트릭 기타 실루엣의 위트 있는 백팩입니다.록 펑크 무드를 자아내는 별과 하트 패치, 메탈 체인 장식 디테일이 더해져 키치하면서도 키덜트적인 감성을 극대화합니다." },
    "19": { title: "레트로 다이얼 전화기 크로스바디 백", titleEn: "Retro Rotary Telephone Crossbody Bag", artist: "노벨티(Novelty)", comment: "가방 정면에 다이얼 장식이 입체적으로 자리해 키치한 레트로 감성을 자아내며, 상단의 입체적인 수화기 디테일이 실제 전화기 같은 재미를 선사합니다." },
    "20": { title: "체리 생크림 커스터드 푸딩 백", titleEn: "Cherry Cream Custard Pudding Handbag", artist: "구루루(GURURU)", comment: "디저트 커스터드 푸딩의 입체적인 실루엣과 디테일, 지퍼에 달린 작은 곰돌이 참 장식이 아기자기한 포인트를 더해 사랑스러운 키덜트 감성을 극대화한 아이템 입니다." },
    "21": { title: "캐슬 백팩", titleEn: "Castle Backpack / SS16 'Evil Clown' Collection", artist: "다카하시 준(JunTakahashi)", comment: "중세 고성의 웅장한 건축미를 뾰족한 첨탑과 성벽, 작은 창문과 아치형 성문 디테일까지 입체적으로 구현해 마치 등 위에 하나의 성을 짊어진 듯한 초현실적인 실루엣을 완성한 백팩입니다." },
    "22": { title: "더 클립 백", titleEn: "The Clip Bag - Blue", artist: "조승은(Siena Seung-Eun Cho)", comment: "사무실 책상 위에서 흔히 볼 수 있는 서류용 바인더 클립의 실루엣과 구조적 움직임을 그대로 확장해, 핸드백으로 재탄생시킨 아이템입니다." },
    "23": { title: "캔디 쓰리웨이 백", titleEn: "Candy 3 way Bag", artist: "제인 마플(Jane Marple)", comment: "양끝을 스트라이프 리본으로 묶은 달콤한 캔디 포장지의 입체적인 실루엣을 그대로 재현했습니다." },
    "24": { title: "드레이프 플로럴 숄더백", titleEn: "Draped Floral Shoulder Bag", artist: "김지수(KIMZISU)", comment: "은은하게 번진 듯 몽환적인 플라워 그래픽 위에 불규칙하게 잡힌 입체 드레이프 주름 디테일이 어우러져, 유려한 실루엣을 완성한 빅 사이즈 숄더백입니다." },
    "25": { title: "리아 피라미드 버건디 핸드백", titleEn: "LIA Pyramid Burgundy Iconic Handbag", artist: "니타수리(NITASURI)", comment: "네 개의 삼각형 패널과 둥근 탑 핸들, 드로스트링 스트랩이 어우러져 펼쳤을 때와 닫았을 때전혀 다른 입체적인 피라미드 실루엣을 완성하는 건축적 오브제 백입니다." },
    "26": { title: "바오바오 루센트", titleEn: "Bao Bao Lucent", artist: "이세이 미야케(Issey Miyake)", comment: "부드러운 망사(메시) 원단 위에 큼직한 삼각형 조각(패널)들을 촘촘히 이어 붙여 만든 토트백입니다. 빈 가방일 때는 종이처럼 납작하게 접히지만 물건을 넣으면 내용물에 따라 입체적인다각형 모양으로 자연스럽게 변하며, 아주 가볍고 손잡이 길이 조절이 가능합니다." },
    "27": { title: "스와이프 백", titleEn: "Swipe Bag", artist: "코페르니(Coperni)", comment: "아이폰의 '밀어서 잠금해제(Swipe)' 아이콘에서 영감을 받아 탄생한 타원형 가죽 핸드백입니다. 손잡이와 몸통이 하나로 매끄럽게 이어지는 독창적인 계란형 실루엣이 특징입니다." },
    "28": { title: "체인 리드 백", titleEn: "Chain Lid Bag", artist: "JW 앤더슨(JW Anderson)", comment: "화장품 파우치나 도시락 통처럼 위쪽 뚜껑(Lid)을 들어 올려 여닫는 모양에서 이름을 딴 핸드백입니다. 단정하게 각이 잡힌 사각형 몸통 앞면에 브랜드를 상징하는 큼직하고 볼드한 금색 체인 장식이 달려 있어 세련된 포인트를 줍니다." },
    "29": { title: "아크 백", titleEn: "Ark Bag", artist: "컬트 가이아(Cult Gaia)", comment: "일본의 전통 대나무 바구니에서 영감을 받아 탄생한 반원형 토트백입니다. 얇은 대나무 살을부채꼴로 촘촘하게 엮어 만든 조형적인 디자인과 손잡이가 가방 윗부분에 뚫려 있는 일체형구조가 포인트입니다." },
    "30": { title: "플라멩코 클러치", titleEn: "Flamenco Clutch", artist: "로에베(Loewe)", comment: "복주머니처럼 양옆의 가죽 끈을 당겨 입구를 오므리는 디자인이 특징 입니다. 끈 끝에 달린 동그란 가죽 매듭장식과 손에 닿는 촉감이 매우 부드러운 고급 가죽 소재가 포인트이며, 탈부착 가능한 끈이 함께 있어 클러치로 손에 쥐거나 크로스로 맬 수 있습니다." },
    "31": { title: "셜리 백", titleEn: "Shirley Bag", artist: "스타우드(Staud)", comment: "속이 훤히 비치는 투명한 PVC 소재의 몸통에 튼튼한 가죽 손잡이를 결합한 스타우드의 대표적인 토트백입니다. 가방 안에 소지품을 가릴 수 있는 탈부착형 지퍼 파우치가 함께 들어 있어 실용적이며, 둥글게 뚫린 사각형 가죽 핸들 디자인이 깔끔하고 시원한 포인트를 주어 여름철 데일리 백으로 인기가 많습니다." },
    "32": { title: "비셋 버킷 백", titleEn: "Bissett Bucket Bag", artist: "스타우드(Staud)", comment: "작은 양동이(버킷)처럼 둥글고 반듯한 원통형 모양이 특징인 스타우드의 대표적인 가죽 핸드백입니다. 흐물거리지 않고 탄탄하게 각이 잡힌 매끈한 가죽 몸통에 곡선형 윗손잡이가 달려있으며, 안쪽에는 끈으로 입구를 조일 수 있는 스웨이드 복주머니 안감이 있어 소지품을 안전하게 보관할 수 있습니다." },
    "33": { title: "모로 토트", titleEn: "Moreau Tote", artist: "모로 파리(Moreau Paris)", comment: "프랑스 전통 트렁크 브랜드 모로 파리를 대표하는 가볍고 튼튼한 코팅 캔버스 토트백입니다. 고리 모양이 촘촘하게 엮인 브랜드 고유의 기하학 무늬가 특징이며, 넉넉한 수납공간과 튼튼한 가죽 손잡이 덕분에 여행용이나 직장인 데일리 백으로 많이 사용됩니다." },
    "35": { title: "르 밤비노", titleEn: "Le Bambino", artist: "자크뮈스(Jacquemus)", comment: "작은 편지 봉투처럼 반듯하게 각이 잡힌 직사각형 모양의 가죽 플랩 백입니다. 볼륨감 있는도톰한 윗손잡이와 덮개 중앙을 가로지르는 자석 잠금 탭, 그리고 앞면 모서리의 작은 금색로고 장식이 깔끔한 포인트를 주며, 탈부착 가능한 긴 가죽 끈이 함께 있어 토트백이나 크로스백으로 가볍게 들기 좋습니다." },
    "34": { title: "르 치키토", titleEn: "Le Chiquito", artist: "자크뮈스(Jacquemus)", comment: "작은 사다리꼴 몸통에 비해 유독 크고 동그란 윗손잡이가 달려 있어 독특한 비율을 자랑하는가죽 미니 백입니다. 앞면 모서리에 달린 작은 금색 브랜드 로고 장식이 포인트 입니다." },
    "36": { title: "실린더 백", titleEn: "Cylinder Bag", artist: "찰스앤키스(Charles & Keith)", comment: "원통(실린더) 모양의 입체적인 실루엣을 가진 가죽 핸드백입니다. 깔끔하게 각이 잡힌 몸통에 윗손잡이와 탈부착 가능한 긴 끈이 함께 있어 토트백과 크로스백으로 가볍게 연출하기 좋습니다." },
    "37": { title: "호텐시아 백", titleEn: "Hortensia Bag", artist: "반들러(Wandler)", comment: "반달 모양의 둥근 바닥과 양옆이 날개처럼 살짝 퍼진 사다리꼴 실루엣이 조화를 이루는 반들러의 대표적인 가죽 핸드백입니다. 덮개(플랩) 형태의 깔끔한 자석 잠금장치와 앞뒷면의 실용적인 포켓 구성이 특징입니다." },
    "38": { title: "아르카디 백", titleEn: "Arcadie Bag", artist: "미우미우(Miu Miu)", comment: "클래식한 볼링 백에서 영감을 받아 직사각형 모양으로 정갈하게 각이 잡힌 형태 입니다. 가벼운 패딩이 더해져 은은한 볼륨감이 느껴지는 매끈한 가죽 소재로 선보이며, 앞면 중앙의로고와 둥근 윗손잡이, 탈부착 가능한 긴 끈이 함께 있어 데일리 백으로 인기가 많습니다." },
    "39": { title: "파스티치노 백", titleEn: "Pasticcino Bag", artist: "위크엔드 막스마라(Weekend Max Mara)", comment: "폭신하고 둥그스름한 주름 모양이 특징인 클러치 백입니다. 입구 윗부분에 달린 커다란 구슬두 개가 맞물리는 복고풍 잠금장치가 귀여운 포인트 입니다." },
    "40": { title: "키스락 프레임 백", titleEn: "Kiss-Lock Frame Bag", artist: "코치(Coach)", comment: "옛날 동전지갑처럼 입구 금속 프레임 위쪽에 달린 두 개의 둥근 잠금쇠가 맞물려 '딸깍' 소리를 내며 닫히는 클래식한 가죽 핸드백입니다. 부드러운 가죽 몸통이 입구 금속 틀에 고정되어 입구가 넓게 열리고 복고풍의 우아한 분위기를 연출할 수 있습니다." },
    "41": { title: "쉘 백", titleEn: "Shell Bag", artist: "로에베(Loewe)", comment: "조개껍데기(쉘)처럼 부채꼴 모양으로 우아하게 펼쳐지는 입체적인 주름 실루엣이 특징입니다. 입구를 따라 뚫린 구멍에 가느다란 가죽 스트랩이 연결되어 있고 손잡이 한쪽에 로에베의 시그니처 아나그램 가죽 참 장식이 달려 있어 여름철 데일리 백이나 리조트 백으로 인기가 많습니다." },
    "42": { title: "클라우드 클러치", titleEn: "Cloud Clutch", artist: "만수르 가브리엘(Mansur Gavriel)", comment: "몽글몽글한 구름처럼 입구 부분이 자연스럽게 주름지며 폭신하게 오므라드는 실루엣이 특징입니다. 손에 닿는 촉감이 매우 부드러운 이탈리아산 양가죽과 겉으로 드러나지 않는 곡선형자석 프레임 잠금장치로 미니멀하고 우아한 분위기를 연출하며, 손에 쥐는 클러치나 탈부착가능한 가죽 끈을 연결해 숄더백·크로스백으로 가볍게 들기 좋습니다." },
    "43": { title: "글램 슬램", titleEn: "Glam Slam", artist: "메종 마르지엘라(Maison Margiela)", comment: "폭신한 베개나 쿠션을 떠올리게 하는 둥글고 볼륨감 있는 마틀라세 퀼팅 실루엣이 특징인 메종 마르지엘라의 대표적인 가죽 백입니다. 매우 부드러운 양가죽 소재와 앞면 중앙의 시그니처 숫자 로고 패치가 깔끔하면서도 개성 있는 포인트를 줍니다." },
    "44": { title: "132 5. 오리가미 백", titleEn: "132 5. Origami Bag", artist: "이세이 미야케(Issey Miyake)", comment: "일본의 종이접기(오리가미)에서 영감을 얻어, 평평한 2차원 평면으로 납작하게 접어 보관할수 있으면서도 손에 들거나 내용물을 넣으면 자연스럽게 3차원 입체 실루엣으로 변형됩니다. 매트한 블랙 원단과 얇고 긴 스트랩이 어우러져 미니멀하면서도 독창적인 조형미를 보여줍니다." },
    "45": { title: "세르펜티 포에버", titleEn: "Serpenti Forever", artist: "불가리(Bvlgari)", comment: "불가리를 상징하는 뱀(세르펜티) 모양의 잠금장치가 가장 큰 특징인 가죽 숄더백·크로스백입니다. 보석처럼 정교하게 세공된 뱀 머리 장식에 에나멜이나 원석으로 눈을 표현해 화려하고고급스러운 포인트를 주며, 뱀의 비늘을 닮은 정교한 금색 체인 스트랩이 더해져 우아한 분위기를 줍니다." },
    "46": { title: "스몰 벌룬 백", titleEn: "Small Balloon Bag", artist: "로에베(Loewe)", comment: "열기구에서 영감을 받은 둥글고 입체적인 실루엣이 특징입니다. 탄탄하게 형태를 잡아주는하단부와 자연스럽게 주름이 잡히는 상단부가 조화를 이루어 경쾌하면서도 클래식한 분위기를 연출합니다." },
    "47": { title: "소켓 크로스바디 백", titleEn: "Socket Crossbody Bag", artist: "파베파베(PabePabe)", comment: "일상 속 벽면 콘센트와 전원 플러그의 형태를 가방 정면의 여밈 구조로 치환하여, 입체 플러그 장식을 콘센트 구멍에 실제로 꽂아 가방을 여닫는 유머러스한 기믹이 돋보이는 아이템입니다." },
    "48": { title: "하츠네 미쿠 빅 마우스 봉제 이타백 백팩", titleEn: "Hatsune Miku Big Mouth Plush ItaBackpack", artist: "비모에(BEMOE)", comment: "크게 벌린 입 모양의 투명 윈도우 포켓 안에 캔뱃지나 굿즈를 진열할 수 있도록 제작된 다기능 이타백 백팩입니다." },
    "49": { title: "쇼이 가챠 2 백팩", titleEn: "Showy Gacha 2 Backpack", artist: "타카라토미 아츠(Takara TomyA.R.T.S)", comment: "일본 가챠 상륙 60주년을 기념해 실제 캡슐 뽑기 기계의 외관과 직접 돌릴 수 있는 다이얼 기믹, 배출구 디테일을 그대로 축소 재현했으며, 상단 투명 윈도우 공간에 캡슐이나 굿즈를 가득 채워 꾸밀 수 있는 백팩입니다." },
    "50": { title: "폴카 도트 이타백 백팩", titleEn: "Polka Dot Clear Window Ita Backpack", artist: "시크 아우라(ChicAura)", comment: "인형과 굿즈를 수납할 수 있는 투명 윈도우 포켓이 구성되어 자유로운 커스터마이징이 돋보이는 캐주얼 데일리 이타백 백팩입니다." },
    "51": { title: "미니 플렉스 백", titleEn: "Mini Flex Bag", artist: "믈루예(MLOUYE)", comment: "기하학적 삼각 패널의 입체적인 형태와 대비감이 돋보이는 핸들의 매치가 돋보이는 컨버터블 미니 백입니다." },
    "52": { title: "네버풀", titleEn: "Neverfull", artist: "루이 비통(Louis Vuitton)", comment: "'결코 가득 차지 않는다'는 이름처럼 가볍고 유연하면서도 엄청난 수납력을 자랑하며, 측면가죽 끈을 조이거나 풀어 실루엣을 조절할 수 있고 내부에 탈부착 가능한 지퍼 파우치가 포함되어 일상부터 여행까지 폭넓게 활용됩니다." },
    "53": { title: "카바스 팬텀", titleEn: "Cabas Phantom", artist: "셀린느(Céline)", comment: "피비 파일로(Phoebe Philo)가 이끌던 시절 선보인 셀린느의 대표적인 미니멀 가죽 토트백입니다. 부드럽고 유연한 송아지 가죽 소재와 군더더기 없는 실루엣이 특징이며, 양옆의 가죽 스트랩을 묶거나 풀어 가방의 형태와 수납공간을 자유롭게 변형할 수 있어 데일리 백과오피스 백으로 큰 사랑을 받았습니다." },
    "54": { title: "N/S 파크 토트", titleEn: "N/S Park Tote", artist: "- 더 로우(The Row)", comment: "유연하고 탄탄한 소재와 군더더기 없는 버킷 실루엣이 특징입니다. 불필요한 장식을 줄이고 수납과 형태에 집중하여 디테일만으로 절제된 우아함과 실용성을 완성했습니다." },
    "55": { title: "아이비 미디엄 레더 토트", titleEn: "Ivy Medium Leather Tote", artist: "미우 미우(Miu Miu)", comment: "간결하고 현대적인 실루엣과 부드럽고 유연한 가죽 질감이 돋보이는 미우 미우의 데일리 레더 쇼퍼백입니다. 전면의 은은한 엠보싱 MIU MIU 레터링 로고와 일체형 더블 핸들, 내부 지퍼 포켓 구성을 갖춰 미니멀하면서도 세련된 스타일과 넉넉한 수납력을 동시에 제공합니다." },
    "56": { title: "방카 우니꼬 쇼퍼", titleEn: "Vankka Unikko Shopper", artist: "마리메꼬(Marimekko)", comment: "핀란드어로 '튼튼하다'는 뜻을 지닌 방카(Vankka) 라인에 마리메꼬의 상징적인 우니꼬(Unikko) 플라워 패턴을 더한 캔버스 쇼퍼백입니다. 탄탄한 두께감의 코튼·리넨 혼방 또는 데님 소재로 제작되어 내구성이 뛰어나며, 넉넉한 사이즈와 경쾌한 로고·플라워 프린트가 어우러져 데일리 백부터 장바구니까지 실용적으로 활용할 수 있습니다." },
    "57": { title: "베이스워터", titleEn: "Bayswater", artist: "멀버리(Mulberry)", comment: "2003년 출시된 영국 럭셔리 브랜드 멀버리의 시그니처 가죽 백입니다. 클래식한 토트 형태에 잠금장치를 더한 가방으로, 내부 벨트 스트랩을 조절해 수납공간을 넓힐 수 있어 숄더백은 물론 현대적인 오픈형 토트백 라인까지 폭넓게 사랑받는 제품입니다." },
    "58": { title: "레오 카우하이드 숄더백 블랙", titleEn: "Leo Bag - Black", artist: "카피아기 서머(Capiaghi Summer)", comment: "카우 패턴과 중앙을 가로지르는 넓은 스트랩, 두 개의 스냅 버튼 클로저로 입체적인 트라이앵글 호보 실루엣을 완성한 숄더백입니다" },
    "59": { title: "아르코 토트", titleEn: "Arco Tote", artist: "보테가 베네타(Bottega Veneta)", comment: "건축적인 아치형 곡선에서 영감을 받아 탄생한 보테가 베네타의 시그니처 토트백입니다. 깔끔한 직사각형 실루엣과 둥근 탑 핸들, 내부의 탈부착 가능한 지퍼 파우치를 갖춰 우아하면서도 실용적인 데일리 백입니다." },
    "60": { title: "해먹 스몰 레더 탑 핸들 백", titleEn: "Hammock Small Leather Top-Handle Bag", artist: "로에베(Loewe)", comment: "해먹의 유연한 구조에서 영감을 받아 측면 패널을 접거나 펼쳐 입체적인 실루엣을 자유자재로 변형할 수 있으며, 탑 핸들·숄더·크로스바디 등 다양한 방식으로 착용할 수 있어 조형미와 실용성을 동시에 갖췄습니다." },
    "61": { title: "PS1", titleEn: "PS1", artist: "프로엔자 스쿨러(Proenza Schouler)", comment: "전통적인 워크웨어 메신저 백과 스쿨백에서 영감을 받았으며, 부드럽고 유연한 가죽 소재, 전면의 메탈 플립 락 및 더블 벨트 스트랩, 탈부착 가능한 숄더 스트랩을 갖춰 세련된 무드와뛰어난 실용성을 동시에 제공합니다." },
    "62": { title: "퍼즐", titleEn: "Puzzle", artist: "로에베(Loewe)", comment: "종이접기에서 영감을 받은 정교한 기하학적 가죽 패널 조각들을 이어 붙여 입체적인 직육면체 형태를 완성했으며, 가방을 납작하게 접을 수 있는 유연한 구조의 디자인 입니다." },
    "63": { title: "5AC", titleEn: "5AC", artist: "- 메종 마르지엘라(Maison Margiela)", comment: "프랑스어로 가방을 뜻하는 'sac'를 숫자 코드로 표기한 이름입니다. 내부 구조를 바깥으로드러내는 독특한 접힘 디자인은 두 가지 실루엣으로 연출할 수 있으며, 넘버링 로고 패치와 자물쇠·키 참 디테일을 갖춰 개성과 실용성을 겸비했습니다." },
    "64": { title: "무스비", titleEn: "Musubi", artist: "아크네 스튜디오(Acne Studios)", comment: "일본 전통 의복인 기모노의 오비(Obi) 띠 매듭에서 영감을 받아 탄생한 가죽 가방입니다. 양 측면에 자리한 입체적인 '무스비' 매듭 장식이 조형적인 포인트를 주며, 다양한 사이즈와 탑핸들 및 숄더 스트랩 구성을 갖춰 미니멀하면서도 독창적인 데일리 백입니다." },
    "65": { title: "고야르딘 생루이", titleEn: "Goyardine Saint Louis", artist: "고야드(Goyard", comment: "물과 오염에 강한 브랜드 특유의 패턴 캔버스 소재로 만들어졌으며, 안과 겉을 뒤집어 양면으로 쓸 수 있고 작은 파우치도 함께 들어 있어 일상이나 여행용으로 실용적입니다." },
    "66": { title: "북 토트", titleEn: "Book Tote", artist: "디올(Dior)", comment: "책을 넣는 가방에서 이름을 땄으며, 정교한 자수 패턴과 가운데 큼직하게 새겨진 'CHRISTIAN DIOR' 로고가 특징입니다. 각이 잡혀 있어 물건을 많이 넣어도 모양이 잘 무너지지 않습니다." },
    "67": { title: "에브리데이 토트 / 쇼핑백", titleEn: "Everyday Tote / Shopping Bag", artist: "텔파(Telfar)", comment: "뉴욕 브랜드 텔파를 대표하는 네모난 모양의 비건 가죽 토트백입니다. 가볍고 튼튼하며 사이즈와 색상이 다양해 성별에 상관없이 사용하기 좋습니다." },
    "68": { title: "문 백", titleEn: "Moon Bag", artist: "스타우드(Staud)", comment: "미국 패션 브랜드 스타우드를 대표하는 둥근 초승달 모양의 가죽 핸드백입니다. 손잡이와 몸체가 하나로 자연스럽게 이어지는 독특한 곡선 실루엣이 특징입니다" },
    "69": { title: "조디", titleEn: "The Jodie", artist: "보테가 베네타(Bottega Veneta)", comment: "보테가 베네타를 대표하는 부드러운 반달 모양의 가죽 호보백입니다. 가죽 조각을 촘촘하게 엮은 브랜드 특유의 위빙 기법으로 만들어졌으며, 손잡이 한쪽에 묶인 큼직한 매듭 디테일이 포인트입니다." },
    "70": { title: "안디아모", titleEn: "Andiamo", artist: "보테가 베네타(Bottega Veneta)", comment: "이탈리아어로 '가자'라는 뜻을 가진 토트백입니다. 가죽 조각을 촘촘히 엮은 브랜드 특유의위빙 소재와 앞면의 금빛 매듭 장식이 돋보이며, 수납공간이 넉넉해 실용적입니다." },
    "71": { title: "재키 1961", titleEn: "Jackie 1961", artist: "구찌(Gucci)", comment: "미국 영부인이었던 재클린 케네디가 애용해 이름을 얻은 구찌의 대표적인 반달 모양 숄더백입니다. 앞면 가운데 달린 길쭉한 금속 잠금장치(피스톤 클로저)와 날렵하게 솟은 곡선 라인이 특징입니다." },
    "72": { title: "5 à 7", titleEn: "5 à 7", artist: "생로랑(Saint Laurent)", comment: "프랑스어로 퇴근 후 약속을 즐기는 시간(오후 5시~7시)을 뜻합니다. 군더더기 없이 매끈한반달형 디자인에 앞면의 YSL 로고 고리를 걸어 여닫는 방식이 포인트이며, 낮에는 단정하게, 저녁에는 세련되게 맬 수 있어 데일리 백으로 인기가 많습니다." },
    "73": { title: "삭 드 주르", titleEn: "Sac de Jour", artist: "생로랑(Saint Laurent)", comment: "프랑스어로 '오늘의 가방(데이 백)'을 뜻합니다. 반듯하고 단정한 디자인에 옆면이 아코디언처럼 접히는 구조와 작은 자물쇠 장식이 포인트입니다." },
    "74": { title: "갤러리아", titleEn: "Galleria", artist: "프라다(Prada)", comment: "이탈리아 밀라노에 있는 프라다의 첫 번째 매장과 동일한 이름입니다. 스크래치와 오염에 강한 격자무늬 사피아노 가죽과 앞면의 삼각형 로고 장식이 특징이며, 양옆에 지퍼 포켓이 있어 물건을 정리하기 좋고 끈을 연결해 크로스백으로도 맬 수 있어 직장인 데일리 백으로 인기가 많습니다." },
    "75": { title: "두블레 백 / 더블 백", titleEn: "Double Bag", artist: "프라다(Prada)", comment: "가방 안쪽 가운데 칸막이가 있어 수납공간이 두 개로 나뉘는 사각형 가죽 토트백입니다. 스크래치에 강한 격자무늬 사피아노 가죽과 앞면의 삼각형 로고 장식이 특징입니다." },
    "76": { title: "그레인드 가죽 스몰 마르씨 백", titleEn: "Small Marcie Bag in Grained Leather", artist: "끌로에(Chloé)", comment: "끌로에의 대표 핸드백인 마르씨 백을 한층 아담한 스몰 사이즈로 줄인 더블 캐리 백입니다. 손으로 가죽을 촘촘하게 감싼 둥근 윗손잡이와 긴 크로스 끈이 함께 있어 두 가지 스타일로맬 수 있습니다." },
    "77": { title: "바오바오 카트 S 토트백", titleEn: "Bao Bao Cart S Tote Bag", artist: "이세이 미야케(Issey Miyake)", comment: "유니섹스 라인 '쿠로(KURO)' 시리즈에서 선보이는 세로형 쇼퍼 토트백입니다. 캔버스 바탕 위에 작은 삼각형 피스들이 촘촘하게 배열되어 움직임과 소지품에 따라 입체적인 실루엣을 만들어냅니다" },
    "78": { title: "오라 미니 숄더백 스톤", titleEn: "Ora Mini Shoulder Bag Stone", artist: "에스터 에크메(AESTHEREKME)", comment: "유연한 물방울 실루엣과 사선으로 교차하는 곡선 절개 라인이 포인트인 일체형 미니멀 디자인입니다." },
    "79": { title: "블랙 페리 토트백", titleEn: "Black Perry Tote Bag", artist: "토리버치(Tory Burch)", comment: "스크래치에 강하고 가벼운 페블 소가죽 소재에 미니멀한 상단 중앙 로고와 세로 스트랩 라인을 더해 단정하고 세련된 디자인을 자랑합니다. 넉넉한 길이의 얇은 더블 숄더 스트랩 덕분에 두꺼운 외투 위에도 어깨에 편안하게 걸칠 수 있으며, 내부 중앙의 패딩 지퍼 포켓이 공간을 세 구역으로 깔끔하게 나누어 줍니다. 13~15인치 노트북과 A4 서류까지 여유롭게 들어가는 실용적인 수납력을 갖추고 있어 직장인 출근용 데일리백이나 대학생 가방으로 인기가 높습니다." },
    "80": { title: "보트 앤 토트", titleEn: "Boat and Tote", artist: "레온 레온우드 빈(Leon Leonwood Bean)", comment: "1944년 냉동식품 운반용 가방으로 처음 출시된 토트백입니다. 24온스의 두꺼운 원단과 이중 바닥 구조를 적용해 최대 500파운드(약 227kg)의 하중을 견디도록 수작업으로 제작됩니다." },
    "81": { title: "F52 마이애미 바이스", titleEn: "F52 Miami Vice", artist: "프라이탁 (FREITAG)", comment: "스위스의 일반 종이 쇼핑백 형태에서 영감을 받아 디자인된 업사이클링 토트백입니다. 버려진 트럭 방수포를 재활용해 제작하므로 모든 제품이 세상에 단 하나뿐인 고유한 패턴과 색상을 지니며, 뛰어난 방수성과 넉넉한 수납공간을 자랑합니다." },
    "82": { title: "블랙 홀 더플", titleEn: "Black Hole Duffel", artist: "파타고니아 (Patagonia)", comment: "100% 재활용 폴리에스터 원단에 무광 TPU 필름 코팅을 더해 뛰어난 방수성과 내마모성을갖춘 아웃도어 더플백입니다. 탈부착 가능한 백팩 숄더 스트랩이 있어 상황에 따라 메거나 들 수 있으며, 사용하지 않을 때는 본체 주머니에 작게 접어 보관할 수 있습니다." },
    "83": { title: "안티고나", titleEn: "Antigona", artist: "지방시(Givenchy)", comment: "그리스 신화 속 인물에서 이름을 딴 사다리꼴 모양의 가죽 토트백입니다. 탄탄하게 각이 잡힌 실루엣과 윗부분의 오각형 로고 패치, 큼직한 지퍼 장식이 특징입니다." },
    "84": { title: "트롤리 더플", titleEn: "Trolley Duffle", artist: "이스트팩(Eastpak)", comment: "소프트 더플백의 유연함과 캐리어의 이동 편의성을 결합한 바퀴 달린 여행용 가방입니다. 내구성과 방수성이 뛰어난 소재에 손잡이와 부드러운 휠 시스템을 갖췄으며, 2단 분리 수납공간과 압축 스트랩으로 많은 짐도 깔끔하게 정리할 수 있습니다." },
    "85": { title: "검은 고양이 꼬리 토트백", titleEn: "Black Cat Tail Tote Bag", artist: "기성 제품(No Brand)", comment: "길게 뻗은 고양이의 꼬리가 가방의 블랙 숄더 스트랩으로 그대로 이어져 반대편 꼬리 끝까지 연결되는 착시 디자인의 데일리 토트백입니다." },
    "86": { title: "마켓 토트", titleEn: "Market Tote", artist: "바쿠(Baggu)", comment: "지속 가능성과 실용성을 추구하는 미국 브랜드 바쿠(Baggu)의 데일리 쇼퍼백입니다. 가볍고 튼튼하며, 넉넉한 수납공간과 탑 핸들 및 숄더 스트랩을 갖춰 장보기부터 일상용 에코백까지 폭넓게 활용할 수 있습니다." },
    "87": { title: "스탠다드 바쿠", titleEn: "Standard Baggu", artist: "바쿠(Baggu)", comment: "일회용 비닐봉지를 대체하기 위해 디자인된 리유저블 백입니다. 최대 약 22kg의 무게를 견디며, 사용하지 않을 때는 함께 제공되는 납작한 파우치에 접어 넣어 간편하게 휴대할 수 있습니다." },
    "88": { title: "유틸리티 토트", titleEn: "Utility Tote", artist: "엘엘빈(L.L.Bean)", comment: "미국 아웃도어 브랜드 엘엘빈의 견고하고 실용적인 다목적 토트백입니다. 무거운 짐도 거뜬히 지탱하며, 다수의 외부 포켓과 넉넉한 수납공간을 갖춰 일상부터 캠핑·장보기까지 폭넓게 활용할 수 있습니다." },
    "89": { title: "보트 토트", titleEn: "Boat Tote", artist: "랜즈엔드(Lands' End)", comment: "1977년 처음 출시된 미국 라이프스타일 브랜드 랜즈엔드의 클래식 캔버스 토트백입니다. 탄탄한 코튼 캔버스 소재와 보강된 바닥 설계로 가방 스스로 형태를 유지하며 무거운 짐도 뜬히 지탱하고, 내부와 외부의 실용적인 포켓 구성 및 다양한 색상·이니셜 자수 옵션으로 데일리 백부터 여행·해변용까지 폭넓게 활용됩니다." },
    "90": { title: "르 플리아쥬 오리지널", titleEn: "Le Pliage Original", artist: "롱샴(Longchamp)", comment: "사용하지 않을 때 작은 문고판 책 크기로 납작하게 접어 보관할 수 있어 데일리 백부터 여행용 보조 가방까지 폭넓게 활용됩니다." },
    "91": { title: "모로 토트", titleEn: "Moreau Tote", artist: "모로 파리(Moreau Paris)", comment: "프랑스 전통 트렁크 브랜드 모로 파리를 대표하는 가볍고 튼튼한 코팅 캔버스 토트백입니다. 고리 모양이 촘촘하게 엮인 브랜드 고유의 기하학 무늬가 특징이며, 넉넉한 수납공간과 튼튼한 가죽 손잡이 덕분에 여행용이나 직장인 데일리 백으로 많이 사용됩니다" },
    "92": { title: "키폴", titleEn: "Keepall", artist: "루이 비통(Louis Vuitton)", comment: "1930년 출시된 루이 비통의 아이코닉한 소프트 트래블 백입니다. 가볍고 유연한 구조로 여행 시 수납이 용이하며, 모노그램 캔버스와 천연 가죽 트리밍이 어우러진 클래식한 더플백 디자인의 정수로 꼽힙니다." },
    "93": { title: "베이스 캠프 더플", titleEn: "Base Camp Duffel", artist: "더 노스 페이스 (The North Face)", comment: "강력한 방수성과 마모 저항력을 지닌 소재로 제작되었습니다. 넓은 D자형 지퍼 입구와 인체공학적 숄더 스트랩을 갖춰 여행부터 극한의 아웃도어 활동까지 다양하게 활용할 수 있습니다." },
    "94": { title: "카고 더플", titleEn: "Cargo Duffle", artist: "칼하트 WIP(Carhartt WIP)", comment: "워크웨어 헤리티지를 바탕으로 제작된 더플백입니다. 내구성이 뛰어나며, 넉넉한 메인 수납공간과 전·측면 포켓, 탈부착 가능한 숄더 스트랩 및 시그니처 스퀘어 라벨 디테일을 갖췄습니다." },
    "95": { title: "러기드 트윌 더플", titleEn: "Rugged Twill Duffle", artist: "필슨 (Filson)", comment: "내구성 높은 트윌 원단으로 제작한 실용적인 여행용 더플백 입니다. 튼튼한 황동 지퍼를 적용해 거친 야외 환경에서도 오랫동안 견고하게 사용할 수 있습니다." },
    "96": { title: "더플 백", titleEn: "Duffle Bag", artist: "리모와(RIMOWA)", comment: "이탈리아에서 제작된 리모와 '네버 스틸(Never Still)' 컬렉션의 소프트 트래블 백입니다. 브랜드의 상징인 그루브(홈) 디테일이 가죽 및 나일론 소재에 현대적으로 반영되었으며, 캐리어 손잡이에 결합할 수 있는 슬리브와 탈부착 스트랩을 갖춰 일상과 단기 여행 모두에 실용적입니다." },
    "97": { title: "오리지널스 레트로 스포츠 숄더백 브라운", titleEn: "Originals Retro Sports Shoulder Bag", artist: "아디다스 오리지널스(adidas Originals)", comment: "볼링백 실루엣 바디 중앙에 톤온톤 엠보싱 트레포일 로고를 새기고, 전면 지퍼 포켓과 양측면 플랩 포켓, 그리고 카라비너에 8볼·열쇠 참과 투톤 로프 스트랩을 매치한 레트로 무드의 숄더백입니다." },
    "98": { title: "그런지 펑크 스트라이프 멀티 포켓 백팩", titleEn: "ROMWE Grunge Punk Striped Multi-Pocket Backpack", artist: "롬위(ROMWE)", comment: "가로 스트라이프 바디와 더블 버클 플랩, 다수의 포켓, 인형 키링 참을 더해 키치한 Y2K·그런지 펑크 무드를 연출할 수 있습니다." },
    "99": { title: "누푸리 팩 20", titleEn: "Nupuri Pack 20", artist: "몽벨(mont-bell)", comment: "차분한 다크 그레이 컬러의 유선형 아웃도어 백팩 바디 정면에 히든 지퍼 포켓을 배치하고, 측면 드로스트링과 하단 수납 구조로 등산부터 일상 데일리룩까지 실용적으로 활용할 수 있습니다." },
    "100": { title: "나일론 데일리 백팩", titleEn: "NOI1388 Nylon Daily Backpack", artist: "노이아고(NOIAGO)", comment: "화이트+라이트 그레이 컬러 배색과 전면 그리드 립스톱 패널을 조합하고, 중앙의 메탈릭 타원형 심볼 장식과 상단 D링·버클 스트랩, 측면 조임 버클 디테일로 스포티한 고프코어 룩과잘 어울립니다." }

  },

  table: {
  "01": { title: "메타모르포시스", titleEn: "Metamorphosis", artist: "세바스티안 에라수리스(Sebastian ErraZuriz)", comment: "나뭇가지나 덩굴이 자라나는 듯한 유기적인 곡선 형태의 다리 구조 위에 검은색 상판이 결합된 조각적인 콘솔 테이블 디자인입니다. " },
  "02": { title: "초대받지 않은 손님", titleEn: "Came Uninvited", artist: "빈센트 데카트(Vincent Decat)", comment: "프랑스 파리 기반 디자이너 빈센트 드카가 로스트 왁스 기법과 파티나 마감으로 청동을 주조해 제작한 조각 사이드 테이블입니다. 가상의 자연 속 생명체가 변이해 살아 움직이는 듯한 유기적 형태를 띠며, 가구를 단순한 사물이 아닌 애착을 느끼는 반려 존재처럼 표현했습니다." },
  "03": { title: "블루 조형 커피 테이블", titleEn: "Sculptural Coffee Table in Blue", artist: "케이시 맥카퍼티 (Casey McCafferty)", comment: "신화에서 영감을 받아 사방으로 뻗어 나가는 듯한 역동적인 다리 형태와 재료 본연의 결을 살린 유기적인 곡선이 돋보이는 조각적 테이블입니다. 강렬한 블루 컬러의 상판 중앙에 솟은 원형 돌출부와 한쪽 다리에 달린 검은색 손잡이 형태의 디테일이 어우러져, 실용 가구를 넘어 하나의 현대 조각 작품 같은 독창적인 조형미를 보여줍니다." },
  "04": { title: "어비스 테이블", titleEn: "Abyss Table", artist: "마티아 보네티 (Mattia Bonetti)", comment: "매끄럽고 광택이 나는 니켈 도금 알루미늄 상판 아래에 다채로운 푸른빛과 초록빛으로 채색된 청동 다리를 결합하여 깊은 바다의 심연을 표현한 디자인 가구입니다. 산호초와 해초, 상판 위에 맺힌 물방울을 연상시키는 유기적이고 초현실적인 조형미가 특징이며, 기능적인 가구를 넘어 하나의 예술 조각품 같은 독창적인 분위기를 자아냅니다." },
  "05": { title: "올빼미 콜라주 테이블", titleEn: "Unique 'Owl Collage' Table", artist: "데이비드 와이즈먼 (David Wiseman)", comment: "광택이 나는 금빛 청동(브론즈)으로 나뭇가지와 기하학적 고리들이 얽힌 유기적인 구조를 만들고, 그 중앙에 정교하게 조각된 올빼미를 배치한 조형 가구입니다. 자연에서 영감을 받은 섬세한 금속 프레임 위에 투명한 원형 유리 상판을 얹어 실용성과 예술적 조각미를 동시에 극대화했습니다." },
  "06": { title: "티쉬", titleEn: "Tisch", artist: "프란츠 베스트 (Franz West)", comment: "거친 질감의 흰색 석고와 거즈, 나무, 유리 등을 조합하여 일상적인 가구인 테이블 형태로 제작한 조각 작품으로, 조각과 실용 오브제의 경계를 허무는 작가 특유의 조형 언어를 보여줍니다. 투박하게 빚어낸 쐐기 모양의 두 다리와 상판 유리 아래 비치는 회화적 요소가 결합해, 관객의 신체적 개입과 사용을 유도하는 유머러스하고 비정형적인 미학을 특징으로 합니다." },
  "07": { title: "안티 테이블", titleEn: "Anti Table", artist: "지미 들라투르 (Jimmy Delatour)", comment: "중앙에 커다란 빈 공간을 뚫어 테이블의 기본적인 형태를 해체한 작품입니다. 대리석의 무게감과 비어 있는 공간이 대비됩니다." },
  "08": { title: "언인텐디드 로우 테이블 II", titleEn: "Unintended Low Table II", artist: "김윤환(Yunhwan Kim)", comment: "나무 조각을 연결하고 방향을 변형하는 과정에서 나타나는 우연한 형태를 발전시킨 작품입니다. 물결치듯 이어지는 목재의 굴곡과 추상적인 덩어리가 테이블의 기능과 조각적 표현을 결합합니다." },
  "09": { title: "올레인 커피 테이블", titleEn: "Ollain Coffee Table", artist: "텔루리코 / 프란체스코 파체 (Tellurico / Francesco Pace)", comment: "이탈리아의 전통 스투코(회반죽) 공예 기법을 현대적인 조각 형태로 재해석한 한정판 커피 테이블입니다. 손으로 직접 깎은 발포폴리스티렌(EPS) 구조 위에 제스모나이트(Jesmonite)와 재활용 가공 폐기물을 여러 겹 덧발라 완성했으며, 바위나 자연물처럼 투박하고 유기적인 표면 질감이 특징입니다." },
  "10": { title: "더 리틱스 3", titleEn: "The Lithics 3", artist: "엘리아트 리치 (Elliat Rich)", comment: "청동, 석재, 목재, 유리 등 서로 다른 물성의 재료를 비정형 조각 형태로 결합한 조형적인 사이드 테이블입니다. 각 파편의 경계면을 거친 질감의 청동 주물 접합부로 고정하여 자연 암석 지층이 맞물린 듯한 독창적인 균형미를 보여줍니다." },
  "11": { title: "이중성", titleEn: "Tweevoud", artist: "얀 드리스 (Jan Dries)", comment: "순백의 카라라 대리석을 정교하게 깎아 기하학적인 직선과 유연하게 휘어지는 유기적 곡면이 조화를 이루도록 구성한 추상 조각입니다. 두 개의 분리된 입체 덩어리가 서로 마주 보며 만들어내는 빈 공간과 빛의 명암 대비를 통해 명상적이고 고요한 균형미를 극대화했습니다." },
  "12": { title: "익스팬션 테이블", titleEn: "Expansion Table", artist: "세자르 발다치니(César Baldaccini)", comment: "작가의 대표적인 익스팬션 기법을 가구에 적용한 작품입니다. 녹아내리는 금속처럼 불규칙하게 부풀어 오른 청동 받침대와 유리 상판이 대비됩니다." },
  "13": { title: "테이블 팜", titleEn: "Table femme", artist: "필립 히킬리 (Philippe Hiquily)", comment: "여체의 곡선에서 영감을 얻은 유기적인 생체 형태(biomorphic)의 황동(브라스) 다리 구조가 특징인 1979년작 조형 테이블입니다. 매끄럽게 연마된 금속 하부의 역동적인 볼륨감과 그 위에 얹힌 투명한 정사각형 유리 상판의 간결함이 극적인 대비를 이룹니다." },
  "14": { title: "드립 사이드 테이블", titleEn: "Drip Side Table", artist: "애덤 블랙맨 / 데이비드 크루즈 (Blackman Cruz / Adam Blackman, David Cruz)", comment: "연마하고 수작업으로 파티나(부식 착색) 마감한 주조 청동으로 제작된 한정판 테이블로, 액체가 흘러내리는 듯한 유려하고 조각적인 실루엣이 돋보입니다. 지름 약 37.5cm(14.75인치), 높이 약 62.2cm(24.5인치) 크기에 모든 작품이 수작업으로 완성되어 각기 미세하게 다른 고유한 표면 질감과 색감을 지닙니다." },
  "15": { title: "태초의 잔상 018-499", titleEn: "Afterimage of Beginning 018-499", artist: "최병훈 (Byung Hoon Choi)", comment: "거친 자연석의 원시적인 질감과 매끄럽게 다듬어 검은 옻칠(우레탄) 마감한 목재의 유기적 곡선이 아슬아슬하게 균형을 이루며 조화를 보여주는 한국 1세대 아트 퍼니처 작가의 대표 연작입니다. 가구의 실용적인 기능을 넘어 장식을 최소화한 절제미와 자연 본연의 물성을 통해 관람객에게 고요한 사색과 명상의 시간을 제안하는 조각적 오브제입니다." },
  "16": { title: "네뷸라", titleEn: "Nebula", artist: "키노 게랭(Kino Guérin)", comment: "적층 합판과 천연 목재 무늬목을 유려하게 구부려 매듭 모양으로 만든 조각적인 벽면 거치형 콘솔 테이블입니다. 벽에 고정되는 상단 선반과 바닥을 지지하는 우아한 소용돌이 곡선이 하나로 이어져, 공간에 예술적인 포인트와 실용적인 수납 기능을 동시에 제공합니다." },
  "17": { title: "디스커버리 커피 테이블 콘셉트", titleEn: "Discovery - coffee table concept", artist: "스빌렌 가몰로프 (Svilen Gamolov)", comment: "마치 한 장의 리본이 부드럽게 꼬이며 이어지는 듯한 흑백 대비의 곡선형 하단 구조 위에 투명한 직사각형 유리 상판을 얹은 미래지향적이고 조형적인 커피 테이블입니다. 불가리아 출신 산업 디자이너 스빌렌 가몰로프가 선보인 'BULGARIA' 가구 시리즈의 일부로, 플라스틱이나 합판 등의 소재로 제작할 수 있도록 고안되어 실용적인 가구와 현대 조각 작품의 경계를 허무는 감각적인 공간 연출을 가능하게 합니다." },
  "18": { title: "아일랜드 커피 테이블", titleEn: "Island Coffee Table", artist: "콘스탄체 슈베다(Constanze Schweda)", comment: "단 한 장의 3mm 두께 강철판을 절단하고 구부리는 '키리가미(Kirigami)' 기법을 적용해 용접 없이 입체적인 조각 형태로 완성한 커피 테이블입니다. 바깥쪽 테두리와 안쪽 상판이 유려한 곡선으로 이어지며 공중에 떠 있는 듯한 가벼운 시각적 효과와 조형미를 동시에 보여줍니다." },
  "19": { title: "살버", titleEn: "Salver", artist: "알렉스 라스무센 (Alex Rasmussen)", comment: "물방울을 닮은 유기적인 유선형 실루엣 내부에 중심에서 바깥쪽으로 퍼져 나가는 정교한 동심원 형태의 계단식 능선(리플 패턴)이 조각된 알루미늄 오브제입니다. 닐 페이 스튜디오(Neal Feay Studio)의 디지털 CNC 밀링 가공과 아노다이징(양극산화) 공법을 통해 금속 특유의 차분한 광택과 빛의 각도에 따라 변하는 입체적인 음영을 극대화한 것이 특징입니다." },
  "20": { title: "아잘레아 커피 테이블", titleEn: "Azalea Coffee Table", artist: "닉소 비저너리 디자인 - 미르코 / 미켈레 다넬루초 (NYXO Visionary Design - Mirko / Michele Daneluzzo)", comment: "꽃과 계절의 순환에서 영감을 받아 경량 발포 바이오플라스틱을 3D 프린팅하여 제작한 조각적인 커피 테이블입니다. 아래에서 위로 올라갈수록 유기적인 곡선과 물결무늬 레이어가 입체적으로 확장되며, 그 위에 형태를 맞춘 유리 상판을 얹어 우아한 조형미와 실용성을 동시에 구현했습니다." },
  "21": { title: "쿼크 브론즈 커피 테이블", titleEn: "Quark Bronze Coffee Table", artist: "엠마누엘 바블레드 (Emmanuel Babled)", comment: " 물질의 기본 입자인 쿼크에서 영감을 받아 비정형적이고 유기적인 유선형 실루엣을 구현한 한정판 로우 테이블입니다. 디지털 가공 기술과 전통적인 브론즈 주조 수공예 기법을 결합하여 매끄러운 브러시드 상판과 거울처럼 광택이 나는 하부 곡선이 대비되는 조각적 조형미가 돋보입니다." },
  "22": { title: "큐트 컷", titleEn: "Cute Cut", artist: "세드릭 라곳(Cédric Ragot)", comment: "유기적이고 매끄러운 조약돌 형태에 크기가 다른 두 개의 평평한 상판이 결합된 디자인이 특징입니다. 보통 폴리에스터 수지와 유리섬유(fiberglass) 소재에 광택 래커 마감으로 제작되어 실내외 공간에 모두 활용할 수 있도록 만들어졌습니다." },
  "23": { title: "카파 커피 테이블", titleEn: "Kappa Coffee Table", artist: "체사레 레오나르디 / 프랑카 스타지 (Cesare Leonardi / Franca Stagi)", comment: "1970년경 이탈리아 브랜드 피암(Fiarm)을 위해 디자인된 파이버글라스(유리섬유 강화 플라스틱) 소재의 로우 테이블입니다. 종이를 접은 듯한 유려한 비대칭 굴곡 구조가 특징이며, 중앙의 깊게 파인 홈을 활용해 책이나 잡지를 자연스럽게 꽂아 보관하고 진열할 수 있습니다." },
  "24": { title: "트래버틴 3구 사이드", titleEn: "Travertine 3-Section Side Table", artist: "작가 미상 (Unknown)", comment: "천연 베이지 트래버틴 석재 특유의 다공성 질감과 둥글게 마감된 원형 상판이 어우러져 유기적이고 조각적인 분위기를 자아내는 사이드 테이블입니다. 크기가 다른 세 개의 구(Sphere)가 비대칭적으로 맞물려 상판을 지탱하는 독창적인 균형미를 보여주며, 공간에 절제된 예술적 포인트를 더해줍니다." },
  "25": { title: "일루션 테이블", titleEn: "Illusion Table", artist: "존 브라우어 (John Brauer)", comment: "투명한 아크릴(PMMA) 소재를 수작업으로 구부려 마치 보이지 않는 원형 테이블 위에 식탁보가 공중에 떠 있듯 덮인 착시 효과를 자아내는 디자인 가구입니다. 코펜하겐 카페의 식탁보에서 영감을 받아 제작되었으며, 주름진 모서리가 다리 역할을 하여 기능성과 예술적 조형미를 동시에 갖춘 것이 특징입니다." },
  "26": { title: "스텀블 어폰", titleEn: "Stumble Upon", artist: "알레산드로 이솔라(Alessandro Isola)", comment: "카펫의 한쪽 끝이 말려 올라가며 생기는 주름과 곡선에서 착안한 디자인 가구로, 부드러운 패브릭 러그와 매끄러운 반사 표면의 테이블이 하나로 이어진 형태가 특징입니다." },
  "27": { title: "코쿤", titleEn: "Cocoon", artist: "데니즈 악타이(Deniz Aktay)", comment: "은 원목 합판을 종이처럼 유려하게 접고 말아 올린 조형미가 돋보이는 디자인입니다. 매끄러운 곡선 상판으로 테이블의 실용성을 살리는 동시에, 접힌 면 사이의 틈새를 활용해 책이나 잡지를 자연스럽게 꽂아 보관할 수 있도록 구성했습니다." },
  "35": { title: "엠파이어 사이드 테이블", titleEn: "Empire Side Table", artist: "RH (Restoration Hardware)", comment: "1970년대 디자인에서 영감을 받은 기하학적 형태의 사이드 테이블로, 대각선 금속 프레임이 교차하며 중앙에 다이아몬드 모양을 형성하는 이중 피라미드(모래시계) 구조가 돋보입니다. 매트하거나 은은한 광택이 도는 골드 톤의 사각 튜브형 메탈 베이스 위에 투명한 강화유리 상판을 얹어, 구조적인 조형미를 위에서도 온전히 감상할 수 있도록 디자인되었습니다." },
  "36": { title: "기모노 스툴", titleEn: "Kimono Stool", artist: "네이선 골즈워시 (Nathan Goldsworthy)", comment: "일본 전통 기모노의 옷깃과 오리가미(종이접기) 기법에서 영감을 받아 절곡된 알루미늄 판재로 제작된 조각적인 형태의 스툴입니다. 상단 좌판이 캔틸레버 구조로 설계되어 앉았을 때 은은한 탄성감을 제공하며, 가볍고 내구성이 뛰어나 실내외 스툴이나 사이드 테이블로 폭넓게 활용됩니다." },
  "28": { title: "릴리 패드 커피 테이블", titleEn: "Lily Pad Coffee Table", artist: "마이클 아람(Michael Aram)", comment: "연꽃잎 모양의 여러 금속 상판과 곡선형 줄기 다리가 결합된 수작업 디자인 테이블로, 잎의 개수나 구성에 따라 여러 사양으로 제작됩니다." },
  "29": { title: "셀 캔들 홀더", titleEn: "Cell Candle Holders", artist: "자하 하디드(Zaha Hadid)", comment: "세포의 증식과 분열에서 영감을 받은 유기적이고 비정형적인 곡선 형태가 특징인 촛대 컬렉션입니다. 광택이 나는 스테인리스 스틸 소재로 제작되었으며, 구리(코퍼) 톤과 블랙 마감의 여러 모듈이 높낮이를 달리하며 조합된 모습을 보여줍니다." },
  "30": { title: "무제", titleEn: "Untitled", artist: "작가 미상 (Unknown)", comment: "거친 질감의 회색 다각형 판재와 가늘고 뻗어 나가는 다리 구조가 결합된 모듈형 유닛을 여러 층으로 겹쳐 계단식 입체 형태를 구현했습니다. 각 유닛을 수평·수직으로 자유롭게 확장하고 적층할 수 있어, 건축적 파빌리온이나 가변형 테이블·조형물 디자인의 실험적 특성을 보여줍니다." },
  "31": { title: "무제", titleEn: "Untitled", artist: "작가 미상 (Unknown)", comment: "세 개의 원형 상판을 삼각형 격자(트러스) 구조로 유기적으로 연결하고, 가장자리를 따라 배치한 여러 가닥의 가느다란 나무 다리로 지탱한 건축·조형 콘셉트 모형입니다. 위에서 비추는 조명에 의해 상판의 기하학적 타공 패턴과 가느다란 기둥들이 바닥에 선명한 빛과 그림자의 대비를 만들어내는 것이 특징입니다." },
  "37": { title: "타바스 로우 테이블", titleEn: "Tabasse Low Table", artist: "아드리앙 캄프 (Adrien Camp)", comment: "얇은 알루미늄 판재를 오리가미(종이접기)처럼 접어 만든 비대칭적이고 기하학적인 실루엣이 돋보이는 로우 테이블입니다. 한쪽 다리가 위로 꺾여 올라간 독특한 구조는 잡지나 책을 꽂아 보관할 수 있는 실용적인 수납공간 역할을 동시에 수행합니다." },
  "32": { title: "마돈나 델 몬테", titleEn: "Madonna del Monte", artist: "노에 뒤쇼푸르-로랑스 (Noé Duchaufour-Lawrance)", comment: "이탈리아 베네치아 무라노 장인의 수작업으로 제작된 두꺼운 주조 유리 상판이 차가운 산업용 아연 및 알루미늄 금속 프레임 위로 부드럽게 녹아내리며 물결치는 듯한 대비를 이룹니다. 유리의 유동적인 곡선과 금속의 직선적인 구조가 어우러져 마치 물이 흐르다 멈춘 듯한 조형미를 보여주는 아트 퍼니처입니다." },
  "33": { title: "궐", titleEn: "Gwol", artist: "이정훈 (Jung-hoon Lee)", comment: "한옥 지붕 처마 끝을 장식하는 원통형 기와인 '수막새'에서 영감을 받아 전통의 미감을 현대적으로 재해석한 아트 퍼니처입니다. 차가운 스테인리스 스틸과 전통 문양이 새겨진 화강암 등의 이질적인 재료를 결합해 과거와 현재가 조화를 이루는 조형미를 보여줍니다." },
  "34": { title: "서클릿 칵테일 테이블", titleEn: "Circlet Cocktail Table", artist: "번하트(Bernhardt)", comment: "높이와 크기가 다른 여러 개의 원형 튤립 테이블이 가느다란 기둥을 통해 연결된 일체형 베이스 위에 자리 잡은 조각적인 디자인입니다." },
  "38": { title: "머큐릭 테이블 & 텔라 벽난로", titleEn: "Mercuric Tables & Tela Fireplace", artist: "자하 하디드 (Zaha Hadid)", comment: "이탈리아 대리석 브랜드 치트코(Citco)와 협업한 한정판 컬렉션으로, 정밀 가공 기술을 통해 단단한 천연 대리석에 유려한 곡선과 물결치듯 흐르는 유기적인 조형미를 부여한 작품입니다. 서로 다른 세 가지 형태의 테이블을 사용자의 취향에 따라 자유롭게 배치할 수 있으며, 벽면에 부착된 유선형 오브제 역시 공간과 자연스럽게 어우러지는 조각적 존재감을 드러냅니다." },
  "39": { title: "울트라스텔라 커피 테이블", titleEn: "UltraStellar Coffee Table", artist: "자하 하디드 (Zaha Hadid)", comment: "2016년 데이비드 길 갤러리를 위해 디자인된 유작 컬렉션으로, 네 개의 호두나무 조각이 역동적으로 맞물린 유기적 형태의 테이블입니다. 상판 중앙을 향해 물결치듯 깊게 패인 유선형 굴곡이 우아한 입체감과 구조적인 역동성을 동시에 보여줍니다." },
  "40": { title: "그로브스 커피 테이블", titleEn: "Coffee Table 'Groves'", artist: "세바스찬 브라이코비치 / Sebastian Brajkovic", comment: "물결치듯 유려하게 굽이치고 골이 파인 조형적인 알루미늄 베이스 위에 투명한 아크릴 상판을 결합하여 우아한 곡선미를 극대화한 디자인입니다. 네덜란드 출신 디자이너 특유의 정교한 조형 감각을 바탕으로, 마치 조각 작품이 공간을 지탱하는 듯한 현대적이고 예술적인 조형 가구의 매력을 보여줍니다." },
  "41": { title: "올레아 커피 테이블", titleEn: "Olea Coffee Table", artist: "엠마 도네르베르그 / 아벨 카르카모 (Emma Donnersberg / Abel Cárcamo)", comment: "거친 질감의 주조 청동을 소재로 하여 각기 다른 높이의 세 상판이 하나로 유기적으로 이어진 비정형 조형 테이블입니다. 자연에서 영감을 받은 조각적인 실루엣과 중후한 금속의 광택이 어우러져 공간에 강렬한 예술적 존재감을 부여합니다." },
  "42": { title: "듄", titleEn: "Dune", artist: "자하 하디드 (Zaha Hadid)", comment: "바람에 깎인 사막의 모래언덕에서 영감을 받아, 상판과 다리의 경계 없이 유려하게 이어지는 유기적이고 미래지향적인 곡선미가 돋보이는 디자인 가구입니다. 알루미늄 소재 위에 고광택 폴리우레탄 래커를 입혀 매끄러운 금속성 질감과 깊이 있는 색감을 구현했으며, 실용적인 가구를 넘어 공간에 역동적인 조형미를 더하는 조각 작품의 성격을 지닙니다." },
  "43": { title: "앤틱 황동 조각 코이 베이스 커피 테이블", titleEn: "Antique Brass Sculptural Koi Base Coffee Table", artist: "작가 미상 (Unknown)", comment: "앤틱 마감된 황동 소재의 비단잉어(코이) 조각상 세 마리가 유영하는 듯한 역동적인 포즈로 투명한 원형 강화유리 상판을 안정적으로 지탱하고 있는 조형적인 테이블입니다. 비늘과 지느러미의 섬세한 금속 질감이 돋보이며, 상판 유리를 통해 물고기 조각의 입체적인 디테일이 그대로 투영되어 공간에 예술적이고 이국적인 포인트를 더해줍니다." },
  "44": { title: "타에스 커피 테이블", titleEn: "Taes Coffee Table", artist: "아드 보스 / 모코 암스테르담 (Aad Bos / MOKKO Amsterdam)", comment: "고대 종교나 의식에 쓰이던 경사진 건축 단상에서 영감을 받아, 원목 판재를 비대칭 계단식으로 겹쳐 올린 조형미가 돋보이는 테이블입니다. 매트한 블랙 마감과 뚜렷한 나뭇결이 어우러져 미니멀하면서도 중후한 브루탈리즘적 공간감을 연출합니다." },
  "45": { title: "월 커피 테이블", titleEn: "Whorl Coffee Table", artist: "닐 아로노위츠 (Neal Aronowitz)", comment: "단단하고 무겁다는 기존 콘크리트의 고정관념을 깨고, 유연하게 성형할 수 있는 신소재인 콘크리트 캔버스(Concrete Canvas)를 수작업으로 빚어 마치 리본이나 천이 물결치듯 흐르는 조형미를 구현한 테이블입니다. 중력을 거스르는 듯 가볍고 우아한 곡선 디자인과 안료 시멘트 모르타르를 얇게 펴 발라 매끄럽게 연마한 표면 마감으로 예술적 아름다움과 일상적인 실용성을 동시에 갖추었습니다." },
  "46": { title: "피시스 커피 테이블 No.8", titleEn: "Fishes Coffee Table No8", artist: "호엘 에스칼로나 (Joel Escalona)", comment: "루마니아 조각가 콘스탄틴 브랑쿠시의 대표작 '물고기(Fish, 1930)'에서 영감을 받아 제작된 조각적인 원목 커피 테이블입니다. 길쭉한 타원형의 블랙 틴트 원목 상판 아래에 조약돌처럼 둥글게 깎아낸 두 개의 다리가 균형을 이루며 고요하고 평온한 공간감을 연출합니다." },
  "47": { title: "노구치 러더 테이블", titleEn: "Noguchi Rudder Table", artist: "이사무 노구치(Isamu Noguchi)", comment: "부드러운 곡선형의 비대칭 삼각형 상판에 배의 키(rudder)를 닮은 나무 다리 하나와 두 개의 금속 헤어핀 다리를 결합해 조각적인 조형미를 살린 커피 테이블입니다. 1940년대 미드센추리 모던 디자인을 대표하는 작품으로, 이질적인 소재의 대비와 가벼운 시각적 균형감이 돋보입니다." },
  "48": { title: "임스 일립티컬 테이블", titleEn: "Eames Elliptical Table", artist: "찰스 임스 / 레이 임스(Charles Eames / Ray Eames)", comment: "길고 낮은 타원형 합판 상판이 서핑보드를 닮아 '서핑보드 테이블'로도 불리며, 하단에는 구조적 안정감과 가벼운 시각적 느낌을 동시에 주는 크롬 와이어 트러스 베이스가 결합되어 있습니다. 1951년 발표된 미드센추리 모던의 대표적 커피 테이블로, 넓은 소파 앞에 두고 여럿이 함께 사용하기에 실용적입니다." },
  "49": { title: "플래트너 커피 테이블", titleEn: "Platner Coffee Table", artist: "워렌 플래트너(Warren Platner)", comment: "수백 개의 수직 강철 와이어 로드를 원형 프레임에 정교하게 용접하여 마치 조각품처럼 우아하고 부드러운 곡선미를 구현한 미드센추리 모던 디자인의 아이콘입니다. 18K 골드 도금 마감의 베이스와 투명한 강화 유리 상판이 조화를 이루어 시야를 가리지 않으면서도 공간에 화려하고 세련된 개방감을 선사합니다." },
  "50": { title: "알몬드 패턴 테이블", titleEn: "Almond Pattern Table", artist: "니콜라스 파티 (Nicolas Party)", comment: "목재 원형 테이블의 상판과 네 다리 전체에 아몬드 모양의 다채로운 색채 패턴을 아크릴로 직접 그려 넣고 유리 상판을 얹은 작품입니다. 일상적인 가구를 하나의 회화적 캔버스로 확장하여 공간 자체를 유쾌하고 초현실적인 예술 경험으로 탈바꿈시키는 작가 특유의 미학이 돋보입니다." },
  "51": { title: "나라 테이블", titleEn: "Nara Table", artist: "구라마타 시로 (Shiro Kuramata)", comment: "1983년 이탈리아 디자인 그룹 '멤피스 밀라노(Memphis Milano)'를 위해 제작된 정사각형 사이드 테이블로, 일본의 절제된 미니멀리즘과 서구의 포스트모던 감성이 조화를 이룬 작품입니다. 흰색 콘크리트 테라조 소재의 단순하고 견고한 구조에 알록달록한 색유리 조각을 흩뿌려 넣어 유머러스하고 역동적인 대비를 만들어냈습니다." },
  "52": { title: "브로큰 글라스 커피 테이블", titleEn: "Broken Glass Coffee Table", artist: "대니 레인 (Danny Lane)", comment: "두꺼운 판유리를 수작업으로 깨뜨리고 깎아내어 거칠고 불규칙한 모서리 질감을 그대로 살린 조각적 가구입니다. 1980년대 이탈리아 유리 가구 브랜드 피암(FIAM Italia)과의 협업 시기를 대표하는 디자인으로, 날카로운 듯하면서도 물결치는 유리 단면이 빛을 굴절시켜 강렬한 조형미를 보여줍니다." },
  "53": { title: "더 플레인 커피 테이블", titleEn: "The Plane Coffee Table", artist: "브루노 / 아티 데코레이션 (Bruno / Arty Décoration)", comment: "어린 시절 종이비행기를 접던 향수와 상상력을 불러일으키는 조형적인 디자인의 거실용 테이블입니다. 정교하게 접어 올린 분체 도장 스틸 상판의 현대적인 감각에 따뜻한 질감의 원목(오크) 다리를 결합해 실용성과 예술성을 동시에 살렸습니다." },
  "54": { title: "호쿠 사이드 테이블 / 니보", titleEn: "Hoku side table / Casala Nivo", artist: "미하엘 힐거스 (Michael Hilgers)", comment: "단단한 스틸 소재를 종이나 천이 파도처럼 부드럽게 접힌 듯한 유려한 곡선으로 가공하여, 조형적인 아름다움은 물론 상하단 두 층으로 나뉜 실용적인 수납공간까지 동시에 구현한 미니멀리즘 사이드 테이블입니다." },
  "55": { title: "루나 커피 테이블", titleEn: "Luna Coffee Table", artist: "작가 미상 (Unknown)", comment: "우아한 베이지 톤의 천연 대리석 타원형 상판과 두 개의 짙은 갈색 원통형 원목 다리가 대비를 이루며 균형 잡힌 조형미를 보여주는 모던 거실 테이블입니다. 자연스러운 석재의 결이 공간에 고급스러운 질감을 더하고, 부드러운 곡선 라인과 묵직한 기둥 구조가 어우러져 현대적이고 세련된 인테리어 분위기를 연출합니다." },
  "56": { title: "뤼야 커피 테이블", titleEn: "Rüya Orta Sehpa", artist: "작가 미상 (Unknown)", comment: "화이트 대리석 패턴의 직사각형 MDF 상판과 아래로 갈수록 얇아지는 월넛 색상의 원목 다리가 어우러져 모던하고 따뜻한 분위기를 연출하는 거실 테이블입니다. 얇은 상판 두께와 간결한 직선 구조 덕분에 공간이 답답해 보이지 않으며, 다양한 인테리어에 무난하게 조화되는 실용적인 디자인이 특징입니다." },
  "57": { title: "게리동 바스 커피 테이블", titleEn: "Guéridon Bas Coffee Table", artist: "장 프루베(Jean Prouve)", comment: "944년 디자인된 이 테이블은 천연 원목의 묵직한 원형 상판과 세 개의 각진 목재 다리가 조화를 이루며 건축적인 안정감을 자아냅니다. 상판 아래쪽에서 다리와 연결되는 분체 도장된 금속 브래킷이 목재의 따뜻한 질감과 대비되며 구조적 견고함과 미니멀한 미학을 동시에 완성합니다." },
  "58": { title: "토비-이시 다이닝 테이블", titleEn: "Tobi-Ishi Dining Table", artist: "에드워드 바버 / 제이 오스거비 (Edward Barber / Jay Osgerby)", comment: "일본 전통 정원의 장식용 징검돌(Tobi-Ishi)에서 영감을 받아 조각 작품처럼 완성한 비앤비 이탈리아(B&B Italia)의 테이블입니다. 둥근 상판 아래 수직으로 엇갈리게 배치된 두 개의 기둥 다리는 바라보는 각도에 따라 실루엣이 다르게 변하며 독창적인 조형미를 자아냅니다." },
  "59": { title: "트라페즈 테이블", titleEn: "Trapèze Table", artist: "장 프루베 (Jean Prouvé)", comment: "파리 근교 앙토니(Antony)의 시테 대학교(Cité Universitaire) 기숙사를 위해 디자인된 테이블로, 서커스의 공중그네를 뜻하는 이름처럼 접힌 강철판으로 만든 사다리꼴 모양의 다리가 특징입니다. 구조적 안정성과 조형미를 동시에 갖춘 디자인으로, 길게 뻗은 직사각형 상판 아래 비스듬히 자리 잡은 두 개의 넓은 다리가 독특한 균형감을 선사합니다." },
  "60": { title: "우든 사이드 테이블", titleEn: "Wooden Side Table", artist: "로낭 / 에르완 부홀렉 (Ronan / Erwan Bouroullec)", comment: "우아하게 얇은 상판과 볼륨감 있는 기둥형 하부 베이스의 조형적 대비가 돋보이는 목재 사이드 테이블입니다. 고품질 성형 합판으로 제작되어 가벼우면서도 견고하며, 간결한 실루엣으로 다양한 공간에 자연스럽게 어우러집니다." },
  "61": { title: "노구치 다이닝 테이블", titleEn: "Noguchi Dining Table", artist: "이사무 노구치 (Isamu Noguchi)", comment: "조각가 이사무 노구치가 디자인하고 스위스 가구 브랜드 비트라(Vitra)에서 제작한 대표작으로, 가구를 넘어 하나의 예술 작품 같은 조형미를 자랑합니다. 묵직한 주철 베이스 위로 교차하며 뻗어 올라가는 크롬 도금 강철 와이어 다리가 특징이며, 시각적으로 가볍고 우아하면서도 뛰어난 안정감을 제공합니다." },
  "62": { title: "플래트너 다이닝 테이블", titleEn: "Platner Dining Table", artist: "워런 플래트너 (Warren Platner)", comment: "수많은 강철 막대를 둥글게 구부려 용접한 조각적인 받침대 위에 투명한 원형 유리 상판을 얹어, 빛의 각도에 따라 금속 와이어가 겹치며 다채로운 그림자 무늬를 만들어내는 것이 특징입니다. 시선이 막히지 않는 개방감과 함께 현대적이면서도 우아한 조형미를 동시에 갖추어 공간을 한층 감각적으로 연출해 줍니다." },
  "63": { title: "노구치 커피 테이블", titleEn: "Noguchi Coffee Table", artist: "이사무 노구치 (Isamu Noguchi)", comment: "직각으로 맞물린 두 개의 곡선형 목재 다리가 묵직하고 둥근 삼각형 강화유리 상판을 안정적으로 지탱하는 조형적인 디자인의 테이블입니다. 1944년 디자인된 이 작품은 유기적인 생물 형태(Biomorphic)의 미학을 가구에 접목하여 조각 작품과 실용 가구의 경계를 허물었다는 평가를 받습니다." },
  "64": { title: "드롭 리프 HM6 테이블", titleEn: "Drop Leaf HM6 Table", artist: "페터르 비트 / 올라 묄고르닐센 (Peter Hvidt / Orla Mølgaard-Nielsen)", comment: "중앙 경첩을 이용해 양쪽 반원형 상판을 아래로 접을 수 있는 게이트 레그 구조로 설계되어 좁은 공간에서도 슬림하게 보관할 수 있습니다. 필요에 따라 상판을 펼쳐 콘솔 테이블부터 넉넉한 원형 다이닝 테이블까지 유연하게 활용할 수 있는 미드센추리 모던 스타일의 대표작입니다." },
  "65": { title: "빅 테이블", titleEn: "Big Table", artist: "알랭 질스 (Alain Gilles)", comment: "레이저로 정밀하게 커팅된 4개의 비대칭 스틸 다리가 서로 다른 각도로 기울어져 역동적인 움직임과 조형미를 자아내는 보날도(Bonaldo)의 대표 테이블입니다. 안정감 있고 직선적인 상판과 개성 넘치는 다리 구조가 감각적인 대비를 이루며, 상판 소재와 컬러를 다양하게 커스터마이징할 수 있어 어떤 공간에서도 독보적인 오브제 역할을 합니다." },
  "66": { title: "버터플라이 테이블", titleEn: "Butterfly Table", artist: "누클레오+(Nucleo+)", comment: "이탈리아 가구 브랜드 카텔란 이탈리아(Cattelan Italia)에서 선보인 작품으로, 나비 날개나 리본이 우아하게 얽힌 듯한 조각적인 스틸 베이스가 돋보입니다. 가볍고 투명한 15mm 강화 유리 상판과 묵직하고 유려한 곡선의 금속 다리가 극적인 대비를 이루며 현대적인 다이닝 공간에 건축적인 예술미를 더합니다." },
  "67": { title: "레알레 테이블", titleEn: "Reale Table", artist: "카를로 몰리노 (Carlo Mollino)", comment: "유기적이고 역동적인 조각적 목재 프레임 위에 투명한 강화유리 상판을 얹어 정교한 구조미를 극대화한 테이블입니다. 항공기 설계에서 영감을 받은 듯한 가벼우면서도 견고한 다리 결합 방식이 특징이며, 기능적인 가구를 넘어 공간에 예술적 오브제 같은 존재감을 부여합니다." },
  "68": { title: "안드로메다 72 다이닝 테이블", titleEn: "Andromeda 72 Dining Table", artist: "리플렉스 안젤로 (Reflex Angelo)", comment: "거칠게 정으로 쪼아낸 부시해머드(Bush-hammered) 마감의 화강암 베이스가 역동적인 곡선을 그리며 얽혀 조각적인 중후함을 자아냅니다. 여기에 모서리를 45도로 정교하게 깎아낸 15mm 두께의 투명 유리 상판을 결합하여, 견고한 석재의 질감과 유리의 시각적 가벼움이 우아한 대비를 이루는 현대적인 디자인이 특징입니다." },
  "69": { title: "슈뢰더 테이블", titleEn: "Schröder Table", artist: "게리트 리트벨트 (Gerrit Rietveld)", comment: "1923년 네덜란드의 데 스틸(De Stijl) 운동을 대표하는 건축가 겸 디자이너가 슈뢰더 하우스를 위해 제작한 비대칭 사이드 테이블입니다. 빨강·파랑·노랑의 삼원색과 무채색(검정·흰색)을 수직·수평의 기하학적 면으로 교차 구성하여, 실용적인 가구를 넘어 공간 속에 놓인 한 점의 입체 조형 예술품 같은 독창적인 조형미를 보여줍니다." },
  "70": { title: "켄트 테이블", titleEn: "Kent Table", artist: "볼프강 C. R. 메츠거 (Wolfgang C. R. Mezger)", comment: "비대칭적 곡선 형태의 천연 석재 상판과 두 개의 반원형 알루미늄 주물 기둥 다리가 조화를 이루는 조형적인 다이닝 테이블입니다. 기존의 정형화된 대칭 구조에서 벗어나 독창적인 좌석 배치를 가능하게 하며, 석재 특유의 화려한 마블링과 날렵한 상판 모서리가 공간에 고급스럽고 세련된 분위기를 더해줍니다." },
  "71": { title: "팔마 테이블", titleEn: "Palma Table", artist: "로널드 사손 (Ronald Sasson)", comment: "이탈리아 원목 가구 브랜드 리바 1920(Riva 1920)에서 선보인 이 테이블은 모서리를 부드럽게 다듬은 집성 원목 상판과 모아이 석상에서 영감을 받은 조각적인 블랙 피그먼트 원목 다리가 어우러져 우아하면서도 강렬한 조형미를 자랑합니다. 서로 마주 보며 비대칭으로 배치된 두 개의 볼륨감 있는 다리는 시각적 균형감은 물론 뛰어난 안정성을 제공합니다." },
  "72": { title: "트로피 트윈 테이블_오크", titleEn: "Trophy Twin Table_Oak", artist: "이승석 (Lee Seung-seok)", comment: "얇고 매끄러운 타원형 오크 원목 상판 아래로 유려하게 곡선을 그리며 뻗어 내린 트로피 형상의 두 기둥 다리가 결합된 조형적 디자인의 테이블입니다. 견고한 수제 원목 짜임새와 반원형 하단 베이스가 시각적 안정감을 주며, 식탁이나 거실 테이블 등 공간의 분위기에 맞춰 깊이감 있는 우드 인테리어를 완성해 줍니다." },
  "73": { title: "오크 파머하우스 다이닝 테이블", titleEn: "Oak Farmhouse Dining Table", artist: "작가 미상 (Unknown)", comment: "자연스러운 밝은 원목 상판과 X자 형태로 교차하는 견고한 트레슬(Trestle) 다리 구조가 조화를 이루는 직사각형 식탁입니다. 두꺼운 목재 프레임과 중앙을 가로지르는 하단 지지대가 안정감을 주며, 내추럴한 나뭇결 마감으로 공간에 따뜻하고 클래식한 분위기를 더해줍니다." },
  "74": { title: "까시나 9 테이블", titleEn: "Cassina 9 Table", artist: "피에로 리소니 (Piero Lissoni)", comment: "묵직한 원통형 대리석 베이스와 슬림한 금속 기둥, 얇은 상판이 결합해 대담한 비례미와 극도의 미니멀리즘을 보여주는 테이블입니다. 군더더기 없는 기하학적 실루엣과 천연 대리석의 우아한 결이 조화를 이루어 현대적인 공간에 조각적인 존재감을 더합니다." },
  "75": { title: "콰데르나 테이블", titleEn: "Quaderna Table", artist: "슈퍼스튜디오 (Superstudio)", comment: "1970년 이탈리아의 실험적 건축 그룹 슈퍼스튜디오가 디자인하고 자노타(Zanotta)에서 제작한 반모더니즘(Anti-design)의 아이콘입니다. 상판과 다리 전체가 3cm 간격의 흰색과 검은색 격자(그리드) 패턴 래미네이트로 빈틈없이 마감되어, 중심이나 위계가 없는 평등한 공간과 초현실적인 조형미를 구현했습니다." },
  "76": { title: "도제 테이블", titleEn: "Doge Table", artist: "카를로 스카르파 (Carlo Scarpa)", comment: "1968년 이탈리아 건축가 카를로 스카르파가 디자인한 도제 테이블은 초이성주의(Ultrarazionale) 운동을 대표하는 상징적인 가구입니다. 정밀하게 절삭된 새틴 스틸 프레임과 황동 볼트 결합부 위에 웅장한 투명 유리 상판을 얹어 구조적 미학과 조각적인 조형미를 동시에 드러냅니다." },
  "77": { title: "LC6 테이블", titleEn: "LC6 Table", artist: "르 코르뷔지에 / 피에르 잔느레 / 샤를로트 페리앙 (Le Corbusier / Pierre Jeanneret / Charlotte Perriand)", comment: "항공기 날개에 쓰이는 타원형 단면의 강철 튜브를 하부 프레임으로 사용하여 구조적 견고함과 유선형의 조형미를 동시에 구현한 1929년작 모더니즘 테이블입니다.프레임 네 모서리의 높이 조절이 가능한 나사형 지지대 핀이 유리 상판을 살짝 띄워 지탱함으로써, 무거운 스틸 베이스와 투명한 상판이 시각적으로 분리되어 공중에 떠 있는 듯한 가벼운 인상을 줍니다." },
  "78": { title: "샘 부아 테이블", titleEn: "Table S.A.M. Bois", artist: "장 프루베 / Jean Prouvé", comment: "2차 세계대전 중 금속 자원이 부족하던 시기에 다리를 원목으로 제작하여 구조적 안정감과 따뜻한 분위기를 동시에 구현한 테이블입니다. 하중이 실리는 부분을 고려해 사선으로 뻗은 조형적인 나무 다리와 이를 단단히 연결하는 하부의 블랙 강철 크로스바 디테일이 돋보입니다." },
  "79": { title: "네스 테이블", titleEn: "NesTable", artist: "재스퍼 모리슨 (Jasper Morrison)", comment: "비트라(Vitra)에서 출시한 미니멀한 디자인의 이동식 사이드 테이블로, 사용자의 자세와 환경에 맞춰 상판의 높이와 각도를 자유롭게 조절할 수 있습니다. U자형 하단 프레임 덕분에 소파나 침대 아래로 바짝 밀어 넣어 노트북 작업이나 독서용으로 활용하기에 매우 실용적입니다." },
  "80": { title: "바르셀로나 테이블", titleEn: "Barcelona Table", artist: "루드비히 미스 반 데어 로에 (Ludwig Mies van der Rohe)", comment: "투명한 유리 상판 아래 X자 형태로 교차하는 크롬 도금 스틸 프레임이 결합되어, 군더더기 없는 간결함과 구조적 미학을 극대화한 모더니즘 대표 가구입니다. 1929년 바르셀로나 국제박람회 독일관을 위해 고안된 바르셀로나 체어와 한 세트를 이루도록 디자인되었으며, 시각적 개방감이 뛰어나 어느 공간에나 조화롭게 어우러집니다." },
  "81": { title: "아발론 커피 테이블", titleEn: "Abalon Coffee Table", artist: "로낭 / 에르완 부홀레 (Ronan / Erwan Bouroullec)", comment: "얇고 간결한 원형 상판과 중심 기둥에서 네 방향으로 부드럽게 뻗어나가는 4발 스타 베이스가 조화를 이루며 우아한 실루엣을 완성하는 로우 테이블입니다. 절제된 형태미와 은은한 컬러 배색 덕분에 주거 공간과 상업용 라운지 등 어느 인테리어에나 자연스럽게 스며드는 현대적인 디자인이 특징입니다." },
  "82": { title: "코펜하겐 라운드 테이블 CPH20", titleEn: "Copenhague Round Table CPH 20", artist: "로낭 / 에르완 부룰렉 (Ronan / Erwan Bouroullec)", comment: "부룰렉 형제가 덴마크 코펜하겐 대학교의 요청을 받아 디자인한 북유럽 스타일의 원형 테이블입니다. 세 개의 각진 오크 원목 다리가 안정감과 조형미를 더해주며, 부드러운 원형 상판이 결합해 가정은 물론 사무실과 카페 등 다양한 공간에 자연스럽게 어우러집니다." },
  "83": { title: "코펜하그 CPH 30 익스텐션 테이블", titleEn: "Copenhague CPH 30 Extendable Table", artist: "로낭 / 에르완 부룰렉 (Ronan / Erwan Bouroullec)", comment: "코펜하겐 대학교 가구 프로젝트를 모태로 탄생한 이 테이블은 컬렉션 특유의 사선 다리가 주는 조형미와 긁힘이나 얼룩에 강한 무광 리놀륨 상판의 실용성을 겸비했습니다. 중앙의 슬라이딩 메커니즘을 통해 확장판을 손쉽게 추가할 수 있어 주거 공간은 물론 오피스나 공공장소까지 환경에 맞춰 길이를 유연하게 조절할 수 있는 것이 특징입니다." },
  "84": { title: "슈퍼 엘립티컬 테이블", titleEn: "Super-Elliptical Table", artist: "피에트 하인 / 브루노 맛손 (Piet Hein / Bruno Mathsson)", comment: "수학자 피에트 하인이 고안한 직사각형과 타원의 조화로운 곡선인 '초타원(Superellipse)' 형태를 상판에 적용해 어느 자리에서든 편안하게 마주 앉을 수 있는 테이블입니다. 여기에 브루노 맛손이 디자인한 가느다란 크롬 스틸 소재의 스팬 다리를 결합하여 시각적으로 가볍고 세련된 북유럽 모던 디자인의 정수를 보여줍니다." },
  "85": { title: "타이드 2 테이블", titleEn: "Tyde 2 Table", artist: "로낭 / 에르완 부룰레크 (Ronan / Erwan Bouroullec)", comment: "깔끔한 직선과 둥근 모서리, 소음을 줄여주는 폴리에스터 플리스 케이블 트레이 등 기계적인 부품을 숨겨 편안하고 간결한 외관을 구현한 전동 높이 조절 데스크입니다. 앉은 자세와 선 자세를 자유롭게 오가며 작업할 수 있도록 설계되어 홈 오피스부터 대규모 업무 공간까지 유연하게 활용할 수 있습니다." },
  "86": { title: "벨빌 테이블", titleEn: "Belleville Table", artist: "로낭 / 에르완 부홀레 (Ronan / Erwan Bouroullec)", comment: "클래식한 프랑스 비스트로 테이블의 형태를 현대적으로 재해석한 제품으로, 바닥으로 갈수록 유려하게 갈라지며 뻗어 나가는 얇은 다리 프레임이 가볍고 우아한 인상을 줍니다. 원목, 무늬목, 멜라민, HPL 등 상판 소재를 다양하게 선택할 수 있어 다이닝룸부터 오피스, 야외 테라스까지 폭넓은 공간에 유연하게 어우러집니다." },
  "87": { title: "임스 세그먼티드 베이스 컨퍼런스 테이블", titleEn: "Eames Segmented Base Conference Table", artist: "찰스 임스 / 레이 임스 (Charles Eames / Ray Eames)", comment: "1964년 디자인된 이 테이블은 모듈형 알루미늄 다리 시스템을 적용하여 상판 크기에 따라 하부 구조를 유연하게 확장할 수 있도록 설계되었습니다. 둥근 오발형 상판과 블랙 비닐 엣지, 그리고 세련된 크롬 다리의 조화가 돋보이며 회의실과 다이닝 공간 모두에 잘 어울리는 미드센추리 모던의 대표작입니다." },
  "88": { title: "임스 컨트랙트 베이스 테이블", titleEn: "Eames Contract Base Table", artist: "찰스 임스 / 레이 임스 (Charles Eames / Ray Eames)", comment: "1958년 허먼밀러(Herman Miller)를 통해 선보인 이 테이블은 알루미늄 주물 방식의 견고한 십자형 베이스와 검은색 중앙 기둥이 조화를 이루어 착석자의 다리 공간을 넓게 확보해 주는 실용적인 디자인이 특징입니다. 얇고 매끄러운 원형 상판에 검은색 비닐 엣지를 마감해 세련된 비례감을 보여주며, 주거 공간부터 사무 공간까지 어떤 모던 인테리어에도 자연스럽게 어우러집니다." },
  "89": { title: "비스트로 테이블", titleEn: "Bistro Table", artist: "로낭 / 에르완 부훌렉 (Ronan / Erwan Bouroullec)", comment: "슬림한 중앙 기둥과 우아하게 뻗은 십자형 스틸 베이스가 결합해 어느 공간에도 자연스럽게 어우러지는 미니멀한 디자인의 바 테이블입니다. 가벼운 시각적 균형감과 견고한 내구성을 동시에 갖추었으며, 상판과 다리 마감재를 다양하게 조합할 수 있어 카페나 오피스, 주거 공간 등 실내외 어디서나 폭넓게 활용됩니다." },
  "90": { title: "소프트 워크 테이블", titleEn: "Soft Work Table", artist: "에드워드 바버 / 제이 오스거비 (Edward Barber / Jay Osgerby)", comment: "모서리가 둥근 보트형(타원형) 우드 상판과 슬림한 X자형 블랙 스틸 베이스가 결합해 공간의 동선을 방해하지 않고 다리 공간을 넉넉히 확보해 주는 사이드 테이블입니다. 2021년 스위스 가구 브랜드 비트라(Vitra)에서 선보인 제품으로, 주거 공간부터 오피스 라운지까지 소파 곁에서 노트북 작업이나 간단한 티타임을 즐기기에 알맞도록 실용성과 절제된 조형미를 함께 담아냈습니다." },
  "91": { title: "비스트로 테이블", titleEn: "Bistro Table", artist: "로낭 / 에르완 부홀렉 (Ronan / Erwan Bouroullec)", comment: "2009년 스위스 가구 브랜드 비트라(Vitra)에서 소프트셸 체어와 조화를 이루도록 선보인 절제된 디자인의 다목적 테이블입니다. 간결한 십자형(4스타) 메탈 베이스와 다양한 마감의 얇은 상판이 결합해 실내 다이닝 공간부터 카페, 야외 테라스까지 폭넓게 어우러지는 실용성과 안정감을 갖추고 있습니다." },
  "92": { title: "사리넨 다이닝 오벌 테이블 ", titleEn: "Saarinen Dining Oval Table", artist: "에로 사리넨 (Eero Saarinen)", comment: "에로 사리넨이 1957년 발표한 미드센추리 모던 대표작으로, 기존 테이블 아래 복잡하게 얽힌 다리들을 없애기 위해 단 하나의 유선형 페데스탈 기둥으로 상판을 지탱하도록 설계했습니다. 튤립 줄기를 닮은 우아한 곡선과 군더더기 없는 타원형 상판이 어우러져 공간에 시각적 개방감과 조형미를 더해줍니다." },
  "93": { title: "오케이셔널 로우 테이블", titleEn: "Occasional Low Table", artist: "재스퍼 모리슨 (Jasper Morrison)", comment: "불필요한 장식을 배제하고 본질에 집중하는 디자이너의 '수퍼 노말(Super Normal)' 철학이 반영된 미니멀한 디자인의 원형 사이드 테이블입니다. 얇은 금속 베이스가 낮은 소파 프레임 아래로 자연스럽게 들어가 공간 활용도가 높으며, 세 가지 높이(35, 45, 55cm)와 원목 또는 분체 도장 알루미늄 상판으로 구성되어 다양한 인테리어에 조화롭게 어우러집니다." },
  "94": { title: "더르소 로우 테이블", titleEn: "D'Urso Low Table", artist: "조셉 더르소 (Joseph D'Urso)", comment: "1980년대에 가구 브랜드 놀(Knoll)을 위해 디자인된 제품으로, 산업용 트롤리나 카트에서 영감을 받아 원형 상판에 강철 프레임과 바퀴(캐스터)를 결합한 것이 특징입니다. 공간의 제약 없이 쉽게 이동하여 배치할 수 있는 실용성과 미니멀하면서도 경쾌한 모던 디자인이 조화를 이루어 주거 공간은 물론 라운지나 사무 공간에서도 폭넓게 활용됩니다." },
  "95": { title: "라치오 커피 테이블", titleEn: "Laccio Coffee Table", artist: "마르셀 브로이어 (Marcel Breuer)", comment: "이음매 없이 구부린 크롬 도금 강철 튜브 프레임과 매끈한 라미네이트 상판이 결합해 바우하우스 특유의 미니멀하고 간결한 미학을 보여줍니다. 바실리 체어에서 영감을 받아 1925년에 디자인되었으며, 작은 사이즈의 사이드 테이블과 겹쳐서 활용할 수 있어 실용성과 조형미를 모두 갖춘 현대 디자인의 아이콘입니다." },
  "96": { title: "임스 와이어 베이스 로우 테이블", titleEn: "Eames Wire Base Low Table", artist: "찰스 임스 / 레이 임스 (Charles Eames / Ray Eames)", comment: "1950년 임스 부부가 손님에게 차를 대접하기 위해 디자인한 소형 사이드 테이블로, 적층 합판 상판에 가느다란 철제 와이어 다리를 결합해 가벼우면서도 튼튼합니다. 컴팩트한 크기로 이동과 보관이 쉬워 거실이나 침실 등 다양한 공간에서 단독 또는 여러 개를 조합해 실용적으로 활용할 수 있습니다." },
  "97": { title: "알토 테이블 90A", titleEn: "Aalto Table 90A", artist: "알바 알토 (Alvar Aalto)", comment: "핀란드산 자작나무 원목을 증기로 쪄서 구부리는 독자적인 벤트우드(L-레그) 기법을 적용해 별도의 하부 프레임 없이 상판과 다리를 견고하고 간결하게 결합한 원형 테이블입니다. 따뜻한 자연미가 돋보이는 미니멀한 실루엣 덕분에 식탁이나 작업용 테이블 등 다양한 공간에 자연스럽게 어우러지며 실용성과 조형미를 동시에 갖추었습니다." },
  "98": { title: "플레이트 커피 테이블", titleEn: "Plate Coffee Table", artist: "재스퍼 모리슨 / Jasper Morrison", comment: "재스퍼 모리슨의 ‘슈퍼 노멀(Super Normal)’ 디자인 철학이 담긴 테이블로, 군더더기 없는 간결한 비례와 절제된 실루엣이 돋보이는 제품입니다. 부드러운 곡선으로 섬세하게 마감된 상판 하단과 견고한 알루미늄 베이스가 조화를 이루어, 어떤 공간에도 자연스럽게 녹아드는 실용적이고 세련된 미학을 보여줍니다." },
  "99": { title: "비트라 플레이트 다이닝 테이블", titleEn: "Vitra Plate Dining Table", artist: "재스퍼 모리슨 (Jasper Morrison)", comment: "'특별한 것은 평범한 것보다 유용하지 못하다'는 디자이너의 철학이 담긴 미니멀한 디자인의 테이블로, 불필요한 장식을 배제한 클래식한 형태와 균형 잡힌 비율이 특징입니다. 얇고 매끄러운 상판과 부드러운 곡선으로 이어지는 견고한 알루미늄 프레임 다리가 정교하게 조화를 이루어 어떤 공간에도 자연스럽게 어우러집니다." },
  "100": { title: "스퀘어 커피 테이블", titleEn: "Square Coffee Table", artist: "플로렌스 놀 / Florence Knoll", comment: "건축가 미스 반 데어 로에의 영향을 받아 불필요한 장식을 배제한 간결한 직선과 비례미를 강조한 미드센추리 모던 스타일의 대표작입니다. 고급스러운 나뭇결의 로즈우드 상판과 차가운 광택의 크롬 도금 스틸 프레임이 절묘한 대비를 이루며, 좁은 홈(Reveal) 디테일을 통해 상판이 공중에 떠 있는 듯한 가볍고 세련된 인상을 줍니다." }
  

  },

  architecture: {
    "01": { title: "루 루보 뇌 건강센터", titleEn: "Cleveland Clinic Lou Ruvo Center for Brain Health", artist: "프랭크 게리 (Frank Gehry)", comment: "2010년에 완공된 뇌 질환 전문 의료 및 연구 시설로, 알츠하이머병과 파킨슨병 등 퇴행성 뇌 질환의 치료와 연구를 목적으로 설계되었습니다. 건물은 직선적인 의료 시설과 물결처럼 휘어진 스테인리스 스틸 외관의 행사 공간으로 구성되었으며, 약 200개의 불규칙한 창문을 통해 독특한 조형미와 자연광을 확보했습니다." },

"02": { title: "댄싱 하우스", titleEn: "Dancing House", artist: "블라도 밀루니치 (Vlado Milunić) / 프랭크 게리 (Frank Gehry)", comment: "체코 프라하 블타바강 인근에 위치한 9층 규모의 건축물로, 1996년에 완공되었습니다. 춤을 추는 남녀의 모습을 형상화한 비대칭 구조가 특징이며, 두 개의 건물은 각각 무용수 프레드 아스테어와 진저 로저스를 상징합니다. 네덜란드 보험회사 내셔널 네덜란드(Nationale-Nederlanden)의 투자를 통해 건립되었습니다." },

"03": { title: "아제르바이잔 국립 카펫 박물관", titleEn: "Azerbaijan National Carpet Museum", artist: " 프란츠 얀츠 (Franz Janz)", comment: "아제르바이잔 바쿠의 해안 국립공원에 위치하며, 전통 카펫을 말아 놓은 모습을 형상화한 독특한 외관이 특징입니다. 2014년에 개관했으며, 건축물 자체에 아제르바이잔의 대표적인 전통 공예인 카펫 직조 문화를 반영하여 국가의 문화적 정체성을 표현했습니다." },

"04": { title: "크시비 도메크", titleEn: "Krzywy Domek", artist: "슈체판 쇼틴스키 (Szczepan Szotyński) / 레셰크 잘레스키 (Leszek Zaleski)", comment: "2004년에 완공된 폴란드 소포트의 상업·업무 복합 건축물로, 동화 삽화에서 영감을 얻은 물결치는 외벽과 비대칭적인 창문, 굽은 지붕이 특징입니다. 독특하게 왜곡된 형태를 통해 마치 건물이 녹아내리거나 움직이는 듯한 시각적 효과를 구현했습니다." },

"05": { title: "아토미움", titleEn: "Atomium", artist: "앙드레 바테르켄 (André Waterkeyn) / 앙드레 폴락 (André Polak) / 장 폴라크 (Jean Polak)", comment: "벨기에 브뤼셀에 위치한 기념 건축물로, 철의 결정을 약 1,650억 배 확대하여 표현한 구조가 특징입니다. 1958년 브뤼셀 세계 박람회를 위해 건설되었으며, 9개의 거대한 구형 구조물을 연결해 원자 모형을 연상시키는 독특한 형태를 구현했습니다." },

"06": { title: "앵무조개 하우스", titleEn: "Nautilus House", artist: "하비에르 세노시아인 (Javier Senosiain)", comment: " 멕시코 멕시코시티 인근 나우칼판에 위치한 주택으로, 2007년에 완공되었습니다. 앵무조개의 나선형 껍데기에서 영감을 얻은 유기적인 구조가 특징이며, 나선형 동선과 다채로운 스테인드글라스를 활용하여 자연광이 실내 공간에 다양한 색채로 퍼지도록 설계했습니다." },

"07": { title: "카사 카라콜", titleEn: "Casa Caracol", artist: "에두아르도 오캄포 (Eduardo Ocampo)", comment: "멕시코 이슬라 무헤레스에 위치한 조개껍데기 모양의 주택으로, 바닷가에 쌓인 소라와 조개껍데기에서 영감을 얻어 설계되었습니다. 외관뿐 아니라 내부 공간과 계단, 욕실까지 곡선과 나선형 구조를 적용했으며, 조개껍데기를 활용한 세면대와 장식 등 바다를 주제로 한 세부 요소가 특징입니다." },

"08": { title: "원더웍스", titleEn: "WonderWorks", artist: "니컬슨 디자인 인터내셔널 (Nichoson Design International", comment: "미국 테네시주 피전포지에 위치한 실내 과학·체험형 테마 시설로, 건물이 거꾸로 뒤집혀 지붕이 땅에 닿은 듯한 독특한 외관이 특징입니다. 마치 거대한 토네이도에 휩쓸려 연구소가 뒤집힌 채 떨어진 모습을 연출했으며, 내부에는 100개 이상의 과학 체험 전시와 놀이 시설이 마련되어 있습니다." },

"09": { title: "롱거버거 바스켓 빌딩", titleEn: "Longaberger Basket Building", artist: "NBBJ / 코르다·네메스 엔지니어링 (Korda/Nemeth Engineering)", comment: "미국 오하이오주 뉴어크에 위치한 7층 규모의 건축물로, 바구니 제조업체 롱거버거사의 대표 제품인 피크닉 바구니를 약 160배 확대하여 외관에 구현했습니다. 바구니의 손잡이까지 실제 구조물로 제작했으며, 철골 구조와 바구니의 엮인 무늬를 표현한 외벽이 특징입니다." },

"10": { title: "쿤스트하우스 그라츠", titleEn: "Kunsthaus Graz", artist: "피터 쿡 (Peter Cook) / 콜린 푸르니에 (Colin Fournier)", comment: "오스트리아 그라츠에 위치한 현대미술관으로, 유기체나 우주선을 연상시키는 비정형적인 곡선 형태가 특징입니다. 푸른색 아크릴 패널 약 1,288개로 외벽을 구성했으며, 외벽에 설치된 조명 장치가 빛과 이미지를 표현하는 미디어 파사드 역할을 합니다." },

"11": { title: "달팽이 하우스", titleEn: "Snail House", artist: "시메온 시메오노프 (Simeon Simeonov)", comment: " 불가리아 소피아의 시메오노보 지역에 위치한 5층 규모의 주택으로, 거대한 달팽이가 기어가는 모습을 형상화했습니다. 빨강, 주황, 초록, 파랑 등 다채로운 색상과 곡선형 외벽이 특징이며, 달팽이의 입처럼 표현된 출입문과 등 위의 벌 모양 굴뚝 등 건물의 설비까지 디자인 요소로 활용했습니다." },

"12": { title: "팔레 불", titleEn: "Palais Bulles, Bubble Palace", artist: "안티 로바그 (Antti Lovag)", comment: "프랑스 테울쉬르메르(Théoule-sur-Mer)의 지중해 연안 언덕에 위치한 주택으로, 비눗방울처럼 둥글게 이어진 유기적인 형태가 특징입니다. 직선과 직각을 최소화하고 원형 공간과 타원형 창문을 연결해 동굴이나 거품이 모여 있는 듯한 독특한 외관을 구현했습니다." },

"13": { title: "항응아 게스트하우스", titleEn: "Hằng Nga Guesthouse", artist: "당 비엣 응아 (Đặng Việt Nga)", comment: "베트남 달랏에 위치한 독특한 형태의 게스트하우스로, 거대한 나무와 동화 속 세계를 연상시키는 유기적인 건축 양식이 특징입니다. 나무뿌리와 동굴, 거미줄 등 자연에서 영감을 얻은 곡선형 구조를 활용했으며, 기린과 동물 조형물, 불규칙한 창문과 좁은 계단 및 다리 등이 건물 곳곳에 배치되어 있습니다." },

"14": { title: "카사 바트요", titleEn: "Casa Batlló", artist: "안토니 가우디 (Antoni Gaudí) / 조셉 마리아 주졸 (Josep Maria Jujol)", comment: "스페인 바르셀로나 파세이그 데 그라시아 거리에 위치한 주택으로, 바다와 자연에서 영감을 얻은 유기적인 곡선과 화려한 색상의 외관이 특징입니다. 깨진 유리와 세라믹 조각을 활용한 모자이크 외벽, 뼈를 연상시키는 기둥과 가면 모양의 발코니, 용의 등을 닮은 지붕이 독특한 분위기를 만들어 냅니다." },

"15": { title: "메트로폴 파라솔", titleEn: "Metropol Parasol", artist: "위르겐 마이어 (Jürgen Mayer)", comment: "스페인 세비야에 위치한 대형 공공 구조물로, 거대한 버섯이나 나무의 캐노피가 여러 개 연결된 듯한 형태가 특징입니다. 물결처럼 휘어진 목재 격자 구조가 넓은 광장을 덮고 있으며, 내부에는 고고학 유적 전시장과 시장, 옥상 산책로 및 전망대가 조성되어 있습니다." },

"16": { title: "미래 박물관", titleEn: "Museum of the Future", artist: "숀 킬라 (Shaun Killa)", comment: "아랍에미리트 두바이에 위치한 미래 기술 및 과학 전시 박물관으로, 중앙이 비어 있는 거대한 타원형 고리 형태가 특징입니다. 스테인리스 스틸과 유리로 구성된 외벽에는 아랍어 서예 문구가 창문처럼 새겨져 있으며, 건물의 원형은 인류를, 녹색 언덕은 지구를, 중앙의 빈 공간은 아직 알 수 없는 미래를 상징합니다." },

"17": { title: "베슬", titleEn: "Vessel", artist: "토머스 헤더윅 (Thomas Heatherwick)", comment: "미국 뉴욕 허드슨 야즈에 위치한 대형 공공 조형 구조물로, 벌집이나 거대한 바구니를 연상시키는 다층 계단 구조가 특징입니다. 154개의 계단과 80개의 전망대가 서로 연결되어 위로 갈수록 넓어지는 형태를 이루며, 구리빛 반사 금속 외장재가 주변 건물과 사람들의 모습을 비춰 독특한 시각적 효과를 만들어 냅니다." },

"18": { title: "훈데르트바서 하우스", titleEn: "Hundertwasserhaus", artist: "프리덴스라이히 훈데르트바서 (Friedensreich Hundertwasser) / 요제프 크라비나 (Josef Krawina) / 페터 펠리칸 (Peter Pelikan)", comment: "오스트리아 빈에 위치한 공동주택으로, 물결치는 듯한 바닥과 불규칙한 창문, 다양한 색상의 외벽이 특징입니다. 건물 곳곳에 나무와 식물을 배치하고 직선과 규칙적인 반복을 최소화하여 자연 속에서 자라난 듯한 주거 공간을 구현했습니다." },

"19": { title: "발트슈피랄레 ", titleEn: "Waldspirale", artist: "프리덴스라이히 훈데르트바서 (Friedensreich Hundertwasser)", comment: "독일 다름슈타트에 위치한 공동주택으로, 건물 전체가 숲처럼 경사진 나선형 구조를 이루는 것이 특징입니다. 다양한 색상의 불규칙한 외벽과 서로 다른 모양의 창문, 지붕 위에 조성된 정원이 어우러져 마치 언덕 위에 자연스럽게 자라난 건축물처럼 보입니다." },

"20": { title: "카사 두 페네두", titleEn: "Casa do Penedo", artist: "작가 미상 (Unknown)", comment: "포르투갈의 산악 지대에 위치한 주택으로, 거대한 자연 암석 네 개 사이에 건물을 끼워 넣은 듯한 형태가 특징입니다. 콘크리트와 돌을 자연 지형에 결합해 마치 바위 자체가 하나의 주거 공간으로 변형된 듯한 모습을 보여줍니다. 지붕과 벽의 경계가 주변 암석과 자연스럽게 이어지며, 외부에서는 건축물과 자연 암석을 구분하기 어려울 정도로 독특한 외관을 형성합니다." },

"21": { title: "오가닉 하우스", titleEn: "Organic House", artist: "하비에르 세노시아인 (Javier Senosiain)", comment: "동물의 굴이나 자연 동굴처럼 부드러운 곡선으로 이어지는 형태의 주택입니다. 직선과 각진 모서리를 최소화하고 둥근 벽과 천장을 하나로 연결해, 건축물 전체가 하나의 유기체처럼 느껴지도록 설계했습니다." },

"22": { title: "케찰코아틀의 둥지", titleEn: "Nest of Quetzalcoatl", artist: "하비에르 세노시아인 (Javier Senosiain)", comment: "멕시코의 협곡 지형을 따라 거대한 뱀이 몸을 틀고 있는 듯한 형태로 설계된 주거 단지입니다. 다채로운 색상의 모자이크와 길게 이어지는 곡선형 구조가 어우러져 건물 전체가 거대한 조각품처럼 보입니다." },

"23": { title: "빅 덕", titleEn: "Big Duck", artist: "작가 미상 (Unknown)", comment: "미국 뉴욕주 플랜더스에 위치한 오리 모양의 건축물로, 거대한 오리의 형상을 건물 전체에 그대로 적용한 것이 특징입니다. 1931년 가금류 판매점으로 지어졌으며, 몸통과 머리, 부리까지 실제 오리의 형태를 본떠 제작해 건축물과 거대한 입체 조형물의 경계를 허무는 사례로 알려져 있습니다." },

"24": { title: "스틸 하우스", titleEn: "Steel House", artist: "로버트 브루노 (Robert Bruno)", comment: "미국 텍사스주 랜섬 캐니언에 위치한 철제 주택으로, 거대한 금속 조각이 지면 위에 놓인 듯한 독특한 형태를 가지고 있습니다. 불규칙하게 휘어진 강철판을 이어 붙여 둥글고 비대칭적인 외관을 만들었으며, 내부에도 곡선형 벽과 독특한 창문이 이어져 일반적인 주택과는 전혀 다른 공간을 형성합니다." },

"25": { title: "왓 롱 쿤", titleEn: "Wat Rong Khun", artist: "찰름차이 코싯피팟 (Chalermchai Kositpipat)", comment: "태국 치앙라이에 위치한 백색 사원으로, 건물 전체가 흰색 조각과 거울 장식으로 뒤덮여 있습니다. 불꽃처럼 휘어지는 지붕 장식과 정교하게 뻗어 나온 첨탑, 신화 속 존재를 형상화한 조각들이 특징입니다. 전통적인 사원 건축의 형태를 초현실적인 조각 작품처럼 재해석한 건축물입니다." },

"26": { title: "낙수장", titleEn: "Fallingwater", artist: "프랭크 로이드 라이트 (Frank Lloyd Wright)", comment: "미국 펜실베이니아주의 폭포 위에 지어진 주택으로, 자연 지형과 건축물을 하나로 연결한 유기적 건축의 대표작입니다. 여러 층에서 바깥으로 길게 뻗어 나온 수평 테라스가 겹겹이 쌓여 독특한 조형미를 형성합니다. 건물 아래로 실제 폭포가 흐르며 주변의 바위와 숲까지 건축의 일부처럼 어우러지는 것이 특징입니다." },

"27": { title: "인터레이스", titleEn: "The Interlace", artist: "올레 스히렌 (Ole Scheeren)", comment: " 31개의 6층 규모 주거동을 육각형 형태로 교차·적층하여 8개의 대규모 중정 공간을 형성한 집합주거 단지이다. 수평적 건축 구조와 옥상 정원, 공중 테라스를 결합하여 자연환경과 공동체 공간이 유기적으로 연결되도록 설계하였습니다." },

"28": { title: "보스코 베르티칼레", titleEn: "Bosco Verticale", artist: "보에리 스튜디오 (Boeri Studio)", comment: "두 개의 주거용 고층 건물 외벽과 발코니에 약 800그루의 나무와 4,500그루의 관목, 2만여 개의 식물을 배치하여 수직적인 숲을 구현했습니다. 식생을 통해 도심의 생물 다양성을 높이고, 일사량 조절과 미세먼지 및 이산화탄소 흡수 등 환경적 기능을 건축에 결합했습니다." },

"29": { title: "킹 알프레드 타워", titleEn: "King Alfred's Tower", artist: "헨리 플릿크로프트 (Henry Flitcroft)", comment: "1772년에 완공된 약 49m 높이의 기념탑으로, 삼각형 평면과 세 모서리에 배치된 원형 탑이 특징입니다. 조지 3세의 즉위와 7년 전쟁의 종전을 기념하기 위해 설계되었으며, 내부에는 전망대로 이어지는 나선형 계단을 설치했습니다." },

"30": { title: "광저우 서클", titleEn: "Guangzhou Circle", artist: "조셉 디 파스콸레 (Joseph di Pasquale)", comment: " 2013년에 완공된 높이 약 138m, 지상 33층 규모의 상업용 건축물로, 중국의 전통 옥 장식품인 비취 원반(Bi Disk)에서 영감을 얻어 거대한 원형 구조로 설계했습니다. 건물 중앙에는 약 47m의 개방된 원형 공간이 있으며, 주강에 비친 건물의 모습이 숫자 8을 형성하도록 하여 중국 문화에서 부와 번영을 상징하는 의미를 담았습니다." },

"31": { title: "로터스 템플", titleEn: "Lotus Temple", artist: "파리보르즈 사바 (Fariborz Sahba)", comment: "인도 뉴델리에 위치한 바하이교 예배당으로, 연꽃이 피어나는 모습을 형상화한 독특한 외관이 특징입니다. 총 27개의 흰색 대리석 마감 꽃잎 구조를 9개씩 세 그룹으로 배치했으며, 건물 주변에는 연꽃잎이 물 위에 떠 있는 모습을 연상시키는 9개의 연못을 조성했습니다." },

"32": { title: "브라질리아 대성당", titleEn: "Cathedral of Brasília", artist: "오스카 니마이어 (Oscar Niemeyer)", comment: "브라질 브라질리아에 위치한 가톨릭 성당으로, 16개의 곡선형 콘크리트 기둥이 위쪽으로 뻗어 올라가는 독특한 구조가 특징입니다. 1970년에 완공되었으며, 기둥 사이에 설치된 유리 스테인드글라스를 통해 자연광이 내부로 들어오도록 설계했습니다." },

"33": { title: "니테로이 현대미술관", titleEn: "Niterói Contemporary Art Museum", artist: "오스카 니마이어 (Oscar Niemeyer)", comment: "브라질 리우데자네이루주 니테로이에 위치한 현대미술관으로, 1996년에 완공되었습니다. 바다 위에 떠 있는 듯한 원반형 구조와 약 98m 길이의 붉은색 나선형 진입로가 특징이며, 주변의 바다와 산악 경관을 감상할 수 있도록 원형 유리창을 배치했습니다." },

"34": { title: "캔자스시티 공공도서관", titleEn: "Kansas City Public Library", artist: " 디멘셔널 이노베이션스 (Dimensional Innovations)", comment: "미국 미주리주 캔자스시티에 위치한 중앙도서관으로, 주차장 외벽을 거대한 책등 모양으로 장식한 '커뮤니티 북셸프(Community Bookshelf)'가 대표적인 특징입니다. 약 7.9m 높이의 책 모형 22개를 배치하여 총 42권의 문학 작품을 표현했으며, 지역 주민들이 직접 도서 선정에 참여해 독서 문화와 지역 공동체의 정체성을 건축에 반영했습니다." },

"35": { title: "아비타 67", titleEn: "Habitat 67", artist: "모셰 사프디 (Moshe Safdie)", comment: "캐나다 몬트리올에 위치한 공동주택 단지로, 1967년 엑스포 67을 위해 건설되었습니다. 총 354개의 프리캐스트 콘크리트 모듈을 불규칙하게 쌓아 올려 158개의 주거 공간을 구성했으며, 각 주택에 개인 테라스와 정원을 제공하여 고밀도 도시 주거 환경에서도 단독주택과 같은 개방감을 구현했습니다." },

"36": { title: "알렉산드리아 도서관", titleEn: "The Alexandrina Library", artist: "스노헤타 (Snøhetta) / 함자 어소시에이츠 (Hamza Associates)", comment: "이집트 알렉산드리아의 지중해 연안에 위치한 대형 도서관으로, 고대 알렉산드리아 도서관의 역사와 지식의 부흥을 상징하도록 설계되었습니다. 태양을 형상화한 거대한 원형 구조와 비스듬히 기울어진 지붕이 특징이며, 외벽에는 세계 여러 문자와 기호가 새겨진 화강암을 사용했습니다." },

"37": { title: "할그림스키르캬 교회", titleEn: "Hallgrímskirkja", artist: "귀드욘 사뮈엘손 (Guðjón Samúelsson)", comment: "아이슬란드 레이캬비크에 위치한 루터교 교회로, 아이슬란드의 현무암 주상절리와 산악 지형, 빙하에서 영감을 얻어 설계되었습니다. 양옆으로 계단식으로 낮아지는 기둥 형태의 외벽과 중앙의 73m 높이 탑이 특징이며, 아이슬란드에서 가장 큰 교회이자 레이캬비크의 대표적인 랜드마크입니다." },

"38": { title: "에덴 프로젝트", titleEn: "The Eden Project", artist: "그림쇼 아키텍츠 (Grimshaw Architects)", comment: "영국 콘월의 폐쇄된 점토 채굴장 부지에 조성된 대규모 식물원으로, 거대한 비눗방울을 연상시키는 여러 개의 측지선 돔 구조가 특징입니다. 돔 내부는 열대우림과 지중해성 기후 등 서로 다른 자연환경을 재현하도록 설계되었으며, 가벼운 철골 구조와 투명한 ETFE 필름을 활용해 식물 생육에 필요한 빛을 확보했습니다." },

"39": { title: "몬트리올 바이오스페어", titleEn: "Montreal Biosphere", artist: "리처드 버크민스터 풀러 (Richard Buckminster Fuller) / 쇼지 사다오 (Shoji Sadao)", comment: "캐나다 몬트리올의 생트엘렌섬에 위치한 거대한 구형 건축물로, 1967년 엑스포 당시 미국관으로 건설되었습니다. 수많은 삼각형 철골 부재가 연결된 측지선 돔 구조가 특징이며, 가벼운 재료로 넓은 내부 공간을 확보하면서도 구조적 안정성을 갖추도록 설계했습니다." },

"40": { title: "라모트 폴린 주거단지", titleEn: "Ramot Polin Housing", artist: "즈비 헤커 (Zvi Hecker)", comment: "이스라엘 예루살렘의 라모트 지역에 위치한 대규모 공동주택 단지로, 벌집이나 둥지를 연상시키는 불규칙한 다면체 형태가 특징입니다. 오각형 면으로 이루어진 다면체 모듈을 반복적으로 결합해 독특한 입체 외관을 만들었으며, 각 세대의 창문과 발코니가 서로 다른 방향으로 배치되어 있습니다." },

"41": { title: "에어포스 아카데미 생도 예배당", titleEn: "United States Air Force Academy Cadet Chapel", artist: "월터 네치 (Walter A. Netsch Jr.) / 스키드모어 (Skidmore)", comment: "미국 콜로라도주 콜로라도스프링스의 미국 공군사관학교에 위치한 예배당으로, 하늘을 향해 솟아오른 17개의 뾰족한 첨탑과 기하학적인 삼각형 구조가 특징입니다. 알루미늄과 유리, 철강을 사용해 전투기의 날개와 산악 지형을 연상시키는 형태로 설계되었으며, 내부에는 다양한 색상의 스테인드글라스를 활용했습니다." },

"42": { title: "루브르 아부다비", titleEn: "Louvre Abu Dhabi", artist: "장 누벨 (Jean Nouvel)", comment: "아랍에미리트 아부다비 사디야트섬에 위치한 미술관으로, 여러 개의 건물을 거대한 은빛 돔이 덮고 있는 형태가 특징입니다. 돔에는 복잡한 기하학적 패턴이 겹겹이 적용되어 햇빛이 내부로 작은 빛의 조각처럼 쏟아지는 '빛의 비' 현상을 연출합니다." },

"43": { title: "밀워키 미술관", titleEn: "Milwaukee Art Museum", artist: "산티아고 칼라트라바 (Santiago Calatrava)", comment: "미국 위스콘신주 밀워키의 미시간호 주변에 위치한 미술관 건물로, 거대한 새의 날개처럼 펼쳐지는 흰색 이동식 차양 구조가 특징입니다. '버크 브리즈 솔레이(Burke Brise Soleil)'라고 불리는 날개 구조물은 햇빛을 조절할 뿐 아니라 실제로 펼쳐지고 접히며 건물 전체에 역동적인 움직임을 부여합니다." },

"44": { title: "남아메리카 바하이 예배당", titleEn: "Bahá’í Temple of South America", artist: "시아막 하리리 (Siamak Hariri)", comment: "칠레 산티아고 안데스산맥 기슭에 위치한 종교 건축물로, 아홉 개의 거대한 반투명 날개가 위쪽으로 휘어 올라가는 형태가 특징입니다. 외부에는 주조 유리를, 내부에는 반투명 대리석을 사용하여 햇빛이 건물 안으로 부드럽게 스며들도록 설계했으며, 시간과 햇빛의 방향에 따라 외관의 색조가 달라집니다." },

"45": { title: "테네리페 오디토리움", titleEn: "Auditorio de Tenerife", artist: "산티아고 칼라트라바 (Santiago Calatrava)", comment: "스페인 카나리아 제도의 테네리페섬에 위치한 공연장으로, 거대한 파도나 날개가 건물을 감싸는 듯한 곡선형 지붕이 특징입니다. 흰색 콘크리트 구조물이 중심부에서 솟아올라 양쪽으로 길게 휘어지며, 대서양을 배경으로 조각적인 실루엣을 형성합니다." },

"46": { title: "큐브 하우스", titleEn: "Cube Houses", artist: "피트 블롬 (Piet Blom)", comment: "네덜란드 로테르담에 위치한 독특한 공동주택 단지로, 정육면체 주택들을 약 45도 기울여 육각형 기둥 위에 올려놓은 구조가 특징입니다. 건축가는 각각의 집을 나무에 비유하고, 여러 채의 집이 모여 하나의 숲을 이루는 '추상적인 숲'이라는 개념으로 설계했습니다." },

"47": { title: "쿤스트하우스 빈", titleEn: "Kunst Haus Wien", artist: "프리덴스라이히 훈데르트바서 (Friedensreich Hundertwasser)", comment: " 오스트리아 빈에 위치한 현대미술관으로, 바둑판처럼 규칙적인 건축 형태를 벗어난 비대칭적인 외관과 다채로운 모자이크 장식이 특징입니다. 물결치는 바닥과 불규칙한 창문, 식물이 자라는 외벽을 활용했으며 내부 공간에도 직선과 직각을 최소화한 디자인을 적용했습니다." },

"48": { title: "데시마 미술관", titleEn: "Teshima Art Museum", artist: "니시자와 류에 (Ryue Nishizawa) / 나이토 레이 (Rei Naito)", comment: "물방울이 땅에 떨어져 퍼지는 순간을 형상화한 건축물입니다. 기둥 없이 하나의 얇은 콘크리트 곡면 지붕으로 공간을 덮었으며, 천장의 두 개 타원형 개구부를 통해 빛과 바람이 내부로 들어오도록 설계했습니다." },

"49": { title: "하얼빈 오페라 하우스", titleEn: "Harbin Opera House", artist: " MAD 아키텍츠 (MAD Architects)", comment: "중국 하얼빈의 습지와 자연 지형에서 영감을 얻어 설계된 건축물입니다. 눈에 덮인 언덕처럼 부드럽게 이어지는 외관과 굴곡진 곡면이 특징이며, 건물 외부를 따라 걸으며 지붕 위까지 올라갈 수 있도록 구성했습니다." },

"50": { title: "언더 레스토랑", titleEn: "Under Restaurant", artist: "스노헤타 (Snøhetta)", comment: "노르웨이 해안 절벽에서 바닷속으로 비스듬히 가라앉는 거대한 콘크리트 구조물입니다. 건물의 일부가 해수면 아래 약 5m까지 내려가며, 수중에 설치된 대형 창을 통해 바닷속 풍경을 감상할 수 있도록 설계했습니다." },

"51": { title: "카타르 국립박물관", titleEn: "National Museum of Qatar", artist: "장 누벨 (Jean Nouvel)", comment: "사막에서 발견되는 광물 결정체인 사막의 장미(Desert Rose)에서 영감을 얻은 건축물입니다. 크기와 방향이 서로 다른 원판 형태의 구조물들이 겹겹이 교차하며, 거대한 결정체가 지면 위로 솟아오른 듯한 입체적인 외관을 형성했습니다." },

"52": { title: "모르페우스 호텔", titleEn: "Morpheus Hotel", artist: "자하 하디드 (Zaha Hadid)", comment: "건물 외부를 감싸는 거대한 격자형 외골격 구조가 특징인 호텔입니다. 중앙부에는 세 개의 거대한 비정형 개구부가 뚫려 있으며, 구조체가 건물의 외벽과 골격 역할을 동시에 수행하도록 설계했습니다." },

"53": { title: "라 무라야 로하", titleEn: "La Muralla Roja", artist: "리카르도 보필 (Ricardo Bofill)", comment: "스페인 지중해 절벽 위에 세워진 주거 건축물로, 분홍색과 붉은색 외벽이 강렬한 인상을 줍니다. 큐브 형태의 공간과 계단, 다리, 중정이 복잡하게 얽혀 있으며, 미로처럼 연결되는 기하학적 동선이 특징입니다." },

"54": { title: "사나두", titleEn: "Xanadu", artist: "리카르도 보필 (Ricardo Bofill)", comment: "페인 칼페의 바위산 형태에서 영감을 얻은 실험적인 주거 건축물입니다. 여러 개의 큐브와 곡선형 지붕, 다양한 높이의 공간을 결합했으며, 내부는 경사로와 계단으로 연결되는 입체적인 구조를 갖추고 있습니다." },

"55": { title: "메스너 마운틴 뮤지엄 코로네스", titleEn: "MMM Corones", artist: "자하 하디드 (Zaha Hadid)", comment: "이탈리아 알프스 산맥의 크론플라츠산 정상에 위치한 산악 박물관으로, 건물 대부분이 산속에 매립된 형태로 설계되었습니다. 외부로 드러난 콘크리트 구조물은 거대한 바위가 갈라져 나온 듯한 비정형적인 곡면을 이루며, 돌출된 전망 공간을 통해 주변 산맥을 감상할 수 있습니다." },

"56": { title: "마리스프롤그 파빌리온", titleEn: "Marisfrolg Pavilion", artist: "아키텍처 반 브란덴부르크 (Architecture Van Brandenburg)", comment: "중국 선전의 패션 캠퍼스에 조성된 조형적 건축물로, 자연에서 발견할 수 있는 비정형적인 형태를 건축에 적용했습니다. 일반적인 건물의 수직·수평 구성을 벗어난 독특한 외관과 입체적인 표면이 특징입니다." },

"57": { title: "인텔 호텔 잔담", titleEn: "Inntel Hotel Zaandam", artist: "WAM 아키텍텐 (WAM Architecten)", comment: "네덜란드 잔담에 위치한 호텔로, 지역의 전통적인 목조 주택들을 여러 겹 쌓아 올린 듯한 외관이 특징입니다. 크기와 색상이 다른 집 형태를 입체적으로 중첩했으며, 녹색과 청색 계열의 외벽이 층마다 다르게 배치되어 마치 작은 마을 전체를 하나의 건물로 압축해 놓은 듯한 모습을 보여줍니다." },

"58": { title: "V&A 던디", titleEn: "V&A Dundee", artist: "구마 겐고 (Kengo Kuma)", comment: "스코틀랜드 던디의 해안가에 위치한 디자인 박물관으로, 절벽이나 배의 선체를 연상시키는 독특한 외관이 특징입니다. 수평으로 길게 뻗은 콘크리트 구조물이 여러 겹 겹쳐져 있으며, 건물의 상부와 하부가 서로 다른 방향으로 휘어지면서 역동적인 입체감을 형성합니다." },

"59": { title: "유럽 지중해 문명 박물관", titleEn: "European Mediterranean Civilization Museum", artist: "루디 리치오티 (Rudy Ricciotti)", comment: "프랑스 마르세유 해안가에 위치한 박물관으로, 정육면체 형태의 건물을 섬세한 콘크리트 격자 구조가 감싸고 있는 것이 특징입니다. 외벽의 복잡한 패턴은 빛과 그림자를 내부 공간에 드리우며, 바다를 가로지르는 보행교를 통해 인근의 생장 요새와 연결되어 있습니다." },

"60": { title: "더 브로드 미술관", titleEn: "The Broad", artist: "딜러 스코피디오 + 렌프로 (Diller Scofidio + Renfro)", comment: "미국 로스앤젤레스에 위치한 현대미술관으로, 건물 외부를 감싸는 벌집 형태의 흰색 외피가 특징입니다. 불규칙하게 겹쳐진 기하학적 구조 사이로 자연광이 들어오며, 중앙의 묵직한 전시·수장 공간과 대비를 이루어 현대적인 조형미를 만들어냅니다." },

"61": { title: "루이 비통 재단 미술관", titleEn: "Fondation Louis Vuitton", artist: "프랭크 게리 (Frank Gehry)", comment: "프랑스 파리에 위치한 미술관으로, 거대한 유리 돛 12개가 건물 전체를 감싸고 있는 듯한 형태가 특징입니다. 각각 다른 곡률을 가진 유리 패널과 흰색 콘크리트 덩어리가 어우러져, 현대적인 기술로 구현한 거대한 유리 조각품처럼 보입니다." },

"62": { title: "베르기젤 스키 점프대", titleEn: "Bergisel Ski Jump", artist: "자하 하디드 (Zaha Hadid)", comment: "오스트리아 인스브루크에 위치한 스키 점프 시설로, 높은 타워와 길게 뻗은 점프대가 하나의 유선형 구조로 연결되어 있습니다. 전망대와 카페까지 포함한 복합 시설이지만, 전체적인 형태는 마치 미래적인 조각 작품이나 거대한 금속 생명체처럼 보입니다." },

"63": { title: "리버사이드 박물관", titleEn: "Riverside Museum", artist: "자하 하디드 (Zaha Hadid)", comment: "스코틀랜드 글래스고에 위치한 교통 박물관으로, 물결처럼 꺾이고 이어지는 지붕 구조가 특징입니다. 건물 양쪽의 유리 외벽과 지그재그 형태의 금속 지붕이 이어지며, 강변의 파도와 도시의 산업적 이미지를 현대적인 기하학 형태로 표현했습니다." },

"64": { title: "8 하우스", titleEn: "8 House", artist: "비야케 잉겔스 그룹 (Bjarke Ingels Group)", comment: "덴마크 코펜하겐에 위치한 대규모 주거 복합 건축물로, 건물 전체가 숫자 8 또는 무한대 기호처럼 비틀린 형태를 이루고 있습니다. 주거 공간과 상업 시설, 옥외 정원이 하나의 연속적인 구조로 연결되며, 거대한 건축물 안에 입체적인 마을을 구현한 듯한 모습이 인상적입니다." },

"65": { title: "코펜힐", titleEn: "CopenHill", artist: "비야케 잉겔스 그룹 (Bjarke Ingels Group)", comment: "덴마크 코펜하겐에 위치한 폐기물 에너지 발전소로, 거대한 산업 시설의 지붕을 스키장과 산책로로 활용하도록 설계했습니다. 단순한 직육면체 발전소 대신 비스듬하게 솟아오르는 경사면과 녹지 공간을 결합해, 산업 시설을 도시의 거대한 인공 언덕처럼 재해석했습니다." },

"66": { title: "오큘러스", titleEn: "Oculus", artist: "산티아고 칼라트라바 (Santiago Calatrava)", comment: "미국 뉴욕 세계무역센터 부지에 위치한 교통 허브로, 양옆으로 펼쳐진 흰색 철골 구조가 날개를 펼친 새를 연상시키는 형태입니다. 반복되는 곡선형 철골 리브가 중앙의 거대한 채광창으로 모이며, 교통 시설이라는 기능적인 공간에 기념비적인 조형미를 더했습니다." },

"67": { title: "두바이 프레임", titleEn: "Dubai Frame", artist: "하이더 컨설팅 (Hyder Consulting)", comment: "아랍에미리트 두바이 자빌 공원에 위치한 높이 약 150m, 너비 약 93m의 대형 전망 시설로, 거대한 액자 형태의 직사각형 구조가 특징입니다. 상단에는 유리 바닥 전망대가 설치되어 있으며, 한쪽에서는 구시가지, 반대쪽에서는 현대적인 신도시의 전경을 감상할 수 있도록 설계했습니다." },

"68": { title: "류경호텔", titleEn: "Ryugyong Hotel", artist: "백두산건축연구원 (Baikdoosan Architects & Engineers)", comment: "1987년 착공된 높이 약 330m, 지상 105층 규모의 초고층 호텔로, 세 개의 경사진 외벽이 하나의 꼭짓점으로 모이는 피라미드 형태가 특징입니다. 1992년 자금난으로 공사가 중단되었다가 2008년 재개되어 외관은 완성되었지만 내부 공사는 마무리되지 않아 현재까지 호텔로 운영되지 않고 있습니다." },

"69": { title: "구겐하임 미술관 빌바오", titleEn: "Guggenheim Museum Bilbao", artist: "프랭크 게리 (Frank Gehry)", comment: "스페인 바스크 지방 빌바오에 위치한 현대미술관으로, 1997년에 개관했습니다. 약 33,000장의 티타늄 패널과 유리, 석회암을 활용했으며, 물결처럼 휘어진 비정형 외관과 거대한 중앙 아트리움이 특징으로 조각 작품과 같은 건축 형태를 구현했습니다." },

"70": { title: "몬트리올 올림픽 스타디움", titleEn: "Montreal Olympic Stadium", artist: "로제 타이베르 (Roger Taillibert)", comment: "캐나다 몬트리올에 위치한 경기장으로, 1976년 하계 올림픽을 개최하기 위해 설계되었습니다. 거대한 타원형 콘크리트 구조와 경기장 위로 높이 솟은 약 165m의 경사진 타워가 특징이며, 타워에서 케이블을 연결해 지붕을 지지하는 독창적인 구조를 적용했습니다." },

"71": { title: "벨라루스 국립도서관", titleEn: "National Library of Belarus", artist: "미하일 비노그라도프 (Mikhail Vinogradov) / 빅토르 크라마렌코 (Viktor Kramarenko)", comment: "벨라루스 민스크에 위치한 국립도서관으로, 2006년에 완공되었습니다. 다이아몬드를 연상시키는 마름모육팔면체 형태의 외관이 특징이며, 유리 패널로 덮인 외벽에는 LED 조명 시스템을 설치하여 밤에는 다양한 색상과 영상으로 빛나는 거대한 디지털 디스플레이를 연출했습니다." },

"72": { title: "중국 국가대극원", titleEn: "National Centre for the Performing Arts", artist: "폴 앙드뢰 (Paul Andreu)", comment: "중국 베이징 천안문 광장 인근에 위치한 종합 공연예술 시설로, 2007년에 개관했습니다. 거대한 반타원형 돔 형태의 외관이 특징이며, 18,000여 장의 티타늄 패널과 1,200여 장의 유리 패널을 사용했습니다. 인공호수로 건물 주변을 둘러싸 마치 물 위에 거대한 알이 떠 있는 듯한 모습을 구현했습니다." },

"73": { title: "더 거킨", titleEn: "The Gherkin", artist: "포스터 앤 파트너스 (Foster + Partners)", comment: " 영국 런던 금융지구에 위치한 41층 규모의 초고층 오피스 빌딩으로, 오이 또는 피클을 닮은 둥근 원뿔형 외관 때문에 ‘더 거킨(The Gherkin)’이라는 별명으로 불립니다. 건물 외벽의 대각선 격자 구조와 나선형 유리 외관이 특징이며, 자연 채광과 환기를 활용해 에너지 소비를 줄이도록 설계되었습니다." },

"74": { title: "시애틀 중앙 도서관", titleEn: "Seattle Central Library", artist: "렘 콜하스 (Rem Koolhaas) / 조슈아 프린스 라머스 (Joshua Prince-Ramus) / LMN 아키텍츠 (LMN Architects)", comment: "미국 워싱턴주 시애틀에 위치한 11층 규모의 공공도서관으로, 서로 다른 크기와 형태의 공간들이 겹쳐진 듯한 비대칭적인 외관이 특징입니다. 유리와 철골로 이루어진 다이아몬드 형태의 외벽을 사용했으며, 내부에는 비소설 도서를 연속적인 나선형 경사로에 배치한 ‘북 스파이럴(Book Spiral)’ 공간이 조성되어 있습니다." },

"75": { title: "베이징 국가체육장", titleEn: "Beijing National Stadium", artist: "자크 헤르초크 (Jacques Herzog) / 피에르 드 뫼롱 (Pierre de Meuron) / 리싱강 (Li Xinggang)", comment: "중국 베이징 올림픽공원에 위치한 대규모 경기장으로, 새 둥지를 연상시키는 복잡하게 얽힌 철골 외관이 특징입니다. 수많은 철골 부재가 불규칙하게 교차하는 격자 구조로 경기장 전체를 감싸고 있으며, 내부에는 약 8만 명을 수용할 수 있는 관람석이 마련되어 있습니다." },

"76": { title: "네덜란드 시청각 연구소", titleEn: "Netherlands Institute for Sound and Vision", artist: "빌럼 얀 노이텔링스 (Willem Jan Neutelings) / 미힐 레이데이크 (Michiel Riedijk) / 야프 드루프스틴 (Jaap Drupsteen)", comment: "네덜란드 힐베르쉼에 위치한 방송·영상 자료 보관소이자 박물관으로, 거대한 정육면체 형태와 화려한 컬러 유리 외벽이 특징입니다. 외벽에는 네덜란드 텔레비전 역사 속 장면들을 추상화한 색상과 이미지가 표현되어 있으며, 약 2,244개의 독특한 유리 패널이 건물 전체를 감싸고 있습니다." },

"77": { title: "헤이다르 알리예프 센터", titleEn: "Heydar Aliyev Center", artist: "자하 하디드 (Zaha Hadid)", comment: "아제르바이잔 바쿠에 위치한 문화 복합시설로, 건물과 주변 광장이 하나의 연속된 곡면으로 이어지는 듯한 유기적인 형태가 특징입니다. 직선과 직각을 최소화한 유려한 외관을 구현했으며, 내부에는 박물관과 전시관, 공연장 및 회의 공간이 마련되어 있습니다." },

"78": { title: "중국중앙텔레비전 본사", titleEn: "CCTV Headquarters", artist: "렘 콜하스 (Rem Koolhaas) / 올레 스헤렌 (Ole Scheeren) / OMA (Office for Metropolitan Architecture)", comment: " 중국 베이징의 중앙업무지구에 위치한 초고층 방송국 건물로, 두 개의 기울어진 타워가 상단에서 연결되어 하나의 거대한 고리 형태를 이루는 독특한 구조가 특징입니다. 상부에는 약 75m 길이의 돌출 구조가 형성되어 있으며, 기존의 수직형 초고층 빌딩과 다른 입체적인 건축 형태를 보여줍니다." },

"79": { title: "마리나 베이 샌즈", titleEn: "Marina Bay Sands", artist: "모셰 사프디 (Moshe Safdie) / 사프디 아키텍츠 (Safdie Architects)", comment: "싱가포르 마리나 베이에 위치한 대규모 복합 리조트로, 세 개의 고층 호텔 타워 위에 거대한 선박 모양의 스카이파크가 연결된 구조가 특징입니다. 지상에서 솟아오른 세 개의 타워와 이를 가로지르는 옥상 구조물이 독특한 실루엣을 형성하며, 상부에는 전망대와 인피니티 풀이 조성되어 있습니다." },

"80": { title: "터닝 토르소", titleEn: "Turning Torso", artist: "산티아고 칼라트라바 (Santiago Calatrava)", comment: "스웨덴 말뫼의 서부 항구 지역에 위치한 초고층 주거용 건물로, 사람의 몸통이 비틀리는 동작을 형상화한 나선형 외관이 특징입니다. 정육면체 형태의 아홉 개 모듈을 중심축을 따라 조금씩 회전시키는 방식으로 설계되었으며, 건물 전체가 아래에서 위로 약 90도 비틀어진 형태를 이루고 있습니다." },

"81": { title: " 엘프필하모니 함부르크", titleEn: "Elbphilharmonie Hamburg", artist: "헤르초크 앤 드 뫼롱 (Herzog & de Meuron)", comment: " 독일 함부르크의 엘베강 항구에 위치한 콘서트홀로, 오래된 붉은 벽돌 창고 건물 위에 물결 모양의 유리 건축물을 올린 독특한 형태가 특징입니다. 곡선형 유리 외벽과 파도처럼 굽이치는 지붕이 빛과 주변 풍경을 반사하며, 기존 창고와 현대적인 건축물이 대비를 이루고 있습니다." },

"82": { title: "오슬로 오페라하우스", titleEn: "Oslo Opera House", artist: "스뇌헤타 (Snøhetta)", comment: "노르웨이 오슬로의 해안가에 위치한 국립 오페라·발레 공연장으로, 빙산이 바다 위로 솟아오른 듯한 흰색 대리석 지붕이 특징입니다. 지붕이 건물 외부에서부터 경사로 이어져 시민들이 직접 걸어 올라가 피오르드와 도시 풍경을 감상할 수 있도록 설계되었습니다." },

"83": { title: "부르즈 할리파", titleEn: "Burj Khalifa", artist: "에이드리언 스미스 (Adrian Smith) / SOM (Skidmore, Owings & Merrill)", comment: "아랍에미리트 두바이에 위치한 초고층 빌딩으로, 아래에서 위로 갈수록 점차 가늘어지는 계단식 외관과 첨탑 형태의 상부 구조가 특징입니다. 이슬람 건축의 기하학적 형태에서 영감을 얻었으며, 바람의 영향을 줄이기 위해 층마다 건물의 형태와 방향을 변화시키는 구조로 설계되었습니다." },

"84": { title: "타이베이 101", titleEn: "Taipei 101", artist: "리쭈위안 앤드 파트너스 (C. Y. Lee & Partners)", comment: "대만 타이베이에 위치한 초고층 복합 빌딩으로, 대나무 마디처럼 여러 개의 층이 반복적으로 쌓인 독특한 외관이 특징입니다. 중국 전통 건축의 탑 형태에서 영감을 얻었으며, 강풍과 지진에 대응하기 위해 건물 내부에 거대한 추 모양의 제진 장치인 튜닝 매스 댐퍼를 설치했습니다." },

"85": { title: "더 샤드", titleEn: "The Shard", artist: "렌초 피아노 빌딩 워크숍 (Renzo Piano Building Workshop)", comment: " 영국 런던 템스강 남쪽에 위치한 초고층 복합 빌딩으로, 유리 조각들이 하늘을 향해 솟아오른 듯한 뾰족한 피라미드 형태가 특징입니다. 런던의 교회 첨탑과 범선의 돛에서 영감을 얻었으며, 유리 외벽을 통해 주변의 하늘과 도시 풍경이 건물 표면에 반사되도록 설계되었습니다." },

"86": { title: "월트 디즈니 콘서트홀 ", titleEn: "Walt Disney Concert Hall", artist: "프랭크 게리 (Frank Gehry)", comment: "미국 캘리포니아주 로스앤젤레스에 위치한 공연장으로, 거대한 금속판이 물결처럼 휘어지고 겹쳐진 조형적인 외관이 특징입니다. 스테인리스 스틸 패널을 활용해 돛이나 꽃잎을 연상시키는 곡선 형태를 구현했으며, 내부 공연장은 목재를 중심으로 구성해 뛰어난 음향과 시각적 개방감을 갖추었습니다." },

"87": { title: "막시 국립 21세기 미술관", titleEn: "MAXXI – National Museum of 21st Century Arts", artist: "자하 하디드 (Zaha Hadid)", comment: "이탈리아 로마에 위치한 현대미술관으로, 검은색 곡선 벽과 서로 교차하는 긴 구조물이 복잡하게 얽힌 형태가 특징입니다. 직선적인 전시실 대신 유동적인 동선과 여러 층의 공간을 연결하여 건물 내부까지 하나의 거대한 조각 작품처럼 구성했습니다." },

"88": { title: "광저우 오페라하우스", titleEn: "Guangzhou Opera House", artist: "자하 하디드 (Zaha Hadid)", comment: "중국 광저우 주강 인근에 위치한 공연장으로, 강물에 오랫동안 깎여 만들어진 두 개의 거대한 조약돌을 연상시키는 비정형 구조가 특징입니다. 검은색과 회색의 외벽이 부드러운 곡면으로 이어지며, 건물 외부뿐 아니라 내부의 천장과 벽, 계단에도 불규칙한 기하학적 형태가 적용되었습니다." },

"89": { title: "구름 도서관", titleEn: "The Cloudscape of Haikou", artist: " MAD 아키텍츠 (MAD Architects)", comment: "중국 하이커우 해안가에 위치한 도서관으로, 구름이나 바다 동굴을 연상시키는 유기적인 곡선 형태로 설계되었습니다. 흰색 노출 콘크리트가 벽과 천장, 바닥을 하나의 흐르는 형태로 연결하며, 불규칙한 타원형 구멍을 통해 바다와 하늘을 바라볼 수 있도록 했습니다." },

"90": { title: "오퍼스", titleEn: "The Opus", artist: "자하 하디드 (Zaha Hadid)", comment: "거대한 정육면체 중앙에 불규칙한 유기적 형태의 구멍을 뚫어 놓은 듯한 건축물입니다. 서로 마주 보는 두 개의 타워가 상부와 하부에서 연결되며, 중앙의 비정형 공간이 건물 전체의 조형적 중심이 되도록 설계했습니다." },

"91": { title: "롤렉스 러닝 센터", titleEn: "Rolex Learning Center", artist: "세지마 가즈요 (Kazuyo Sejima) / 니시자와 류에 (Ryue Nishizawa)", comment: " 스위스 로잔에 위치한 교육시설로, 건물 전체가 완만한 언덕처럼 물결치는 형태를 가지고 있습니다. 바닥과 천장이 함께 굴곡을 이루며 이어지고, 곳곳에 형성된 중정과 경사면이 기존의 직선적인 실내 공간과 다른 경험을 제공합니다. 내부에는 도서관과 학습 공간, 카페 등이 하나의 연속적인 공간으로 배치되어 있으며, 벽으로 공간을 분리하기보다 높낮이의 변화로 영역을 구분했습니다." },

"92": { title: "더 트위스트", titleEn: "The Twist", artist: " 비야케 잉겔스 (Bjarke Ingels)", comment: "노르웨이 키스테포스 조각공원에 위치한 미술관으로, 길게 뻗은 직육면체 건물이 중앙에서 90도 비틀리는 형태가 특징입니다. 강 양쪽을 연결하는 다리이자 전시 공간으로 기능하며, 비틀린 구조를 따라 내부의 바닥과 벽, 천장까지 연속적으로 변화하도록 설계했습니다." },

"93": { title: "동대문디자인플라자", titleEn: "Dongdaemun Design Plaza", artist: "자하 하디드 (Zaha Hadid)", comment: "대한민국 서울에 위치한 복합 문화공간으로, 거대한 우주선이나 유선형 조각품을 연상시키는 비정형 곡면이 특징입니다. 약 4만 5천 장의 알루미늄 패널이 서로 다른 형태로 외벽을 구성하며, 건물 전체가 끊김 없이 이어지는 듯한 유기적인 실루엣을 만들어냅니다." },

"94": { title: "상하이 타워", titleEn: "Shanghai Tower", artist: "겐슬러 (Gensler)", comment: "중국 상하이에 위치한 초고층 빌딩으로, 높이 약 632m에 달하는 세계적인 마천루입니다. 건물 외벽이 위로 올라갈수록 약 120도 비틀리는 나선형 형태를 이루며, 이중 외피 구조를 통해 바람의 영향을 줄이고 에너지 효율을 높이도록 설계되었습니다." },

"95": { title: "애플 파크", titleEn: "Apple Park", artist: "포스터 앤드 파트너스 (Foster + Partners)", comment: "미국 캘리포니아주 쿠퍼티노에 위치한 애플 본사로, 거대한 원형 고리 형태의 건축물이 특징입니다. 유리로 이루어진 곡선형 외벽이 건물 전체를 감싸고 있으며, 중앙에는 넓은 녹지와 나무가 조성되어 거대한 공원 속에 건물이 놓인 듯한 모습을 보여줍니다." },

"96": { title: "스피어", titleEn: "Sphere", artist: "파퓰러스 (Populous)", comment: "미국 라스베이거스에 위치한 초대형 공연장으로, 지름 약 157m에 달하는 거대한 구형 외관이 특징입니다. 외벽 전체에는 약 5만 4천㎡ 규모의 LED 디스플레이가 설치되어 다양한 영상과 그래픽을 표현하며, 내부에도 초고해상도 화면과 몰입형 음향 시스템을 갖추고 있습니다." },

"97": { title: "마르크탈", titleEn: "Markthal", artist: "MVRDV", comment: "네덜란드 로테르담에 위치한 실내 시장 및 주거 복합건축물로, 거대한 말굽형 아치 구조가 특징입니다. 양쪽 끝이 열린 아치형 건물 내부에는 시장이 들어서 있으며, 천장 전체를 뒤덮은 거대한 과일과 꽃 그림이 공간을 화려하게 장식합니다." },

"98": { title: "캘리포니아 과학 아카데미", titleEn: "California Academy of Sciences", artist: "렌초 피아노 (Renzo Piano)", comment: "미국 샌프란시스코에 위치한 자연사·과학 박물관으로, 지붕 전체가 완만하게 솟아오른 언덕처럼 설계되었습니다. 지붕 위에는 실제 식물과 야생 생물이 살아가는 생태 정원이 조성되어 있으며, 유기적인 곡선과 친환경 기술이 결합된 건축물입니다." },

"99": { title: "자이츠 현대미술관", titleEn: "Zaits Museum of Contemporary Art", artist: "토마스 헤더윅 (Thomas Heatherwick)", comment: "남아프리카공화국 케이프타운에 위치한 현대미술관으로, 과거 곡물 저장고로 사용되던 거대한 콘크리트 사일로를 개조해 만들었습니다. 원통형 구조물 내부를 깎아내듯 비워 거대한 타원형 아트리움을 만들었으며, 산업 시설의 흔적과 조각적인 공간 구성이 독특하게 어우러집니다." },

"100": { title: "오오디 중앙도서관", titleEn: "Central Library Oodi", artist: "알라 아키텍츠 (ALA Architects)", comment: "핀란드 헬싱키에 위치한 중앙도서관으로, 거대한 나무 외벽이 부드럽게 휘어지며 건물 전체를 감싸는 형태가 특징입니다. 유리와 철골로 이루어진 현대적인 하부 구조 위에 곡선형 목재 공간을 얹어, 기술적인 구조와 따뜻한 자연 소재가 조화를 이루고 있습니다." }
  },

 
};


// ========================================
// HTML 요소 연결
// ========================================

const galleryScroll = document.getElementById('galleryScroll');
const photoGrid = document.getElementById('photoGrid');
const currentCategory = document.getElementById('currentCategory');
const progressNumber = document.getElementById('progressNumber');
const progressFill = document.getElementById('progressFill');

let activeCategory = 'chair';
let activeSort = 'imagination';


// ========================================
// LIGHTBOX : 작품 상세 화면 생성
// ========================================

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';

lightbox.innerHTML = `
  <div class="lightbox-content">

    <button class="lightbox-close" aria-label="닫기">×</button>

    <div class="lightbox-image-wrap">
      <img class="lightbox-image" src="" alt="">
    </div>

    <div class="lightbox-info">

      <div class="lightbox-info-top">
        <span class="lightbox-category"></span>
        <span class="lightbox-number"></span>
      </div>

      <div class="lightbox-info-body">

        <span class="lightbox-label">TITLE</span>

      <div class="lightbox-title-wrap">
        <h2 class="lightbox-title"></h2>
        <span class="lightbox-title-en"></span>
      </div>

      <p class="lightbox-artist"></p>

        <div class="lightbox-divider"></div>

        <span class="lightbox-label">DESCRIPTION</span>
        <p class="lightbox-description"></p>

      </div>

    

    </div>

  </div>
`;

document.body.appendChild(lightbox);


// ========================================
// LIGHTBOX : 확대 화면 열기
// ========================================

function openLightbox(imageSrc, imageAlt, info, category, file) {

  lightbox.querySelector('.lightbox-image').src = imageSrc;
  lightbox.querySelector('.lightbox-image').alt = imageAlt;

  lightbox.querySelector('.lightbox-category').textContent =
    categories[category][1];

  lightbox.querySelector('.lightbox-number').textContent = file;

  lightbox.querySelector('.lightbox-title').textContent =
  info.title || "";

  lightbox.querySelector('.lightbox-title-en').textContent =
  info.titleEn || "";

  lightbox.querySelector('.lightbox-artist').textContent =
  info.artist || "";

  lightbox.querySelector('.lightbox-description').textContent =
    info.comment;

  lightbox.classList.add('active');
  document.body.classList.add('lightbox-open');
}


// ========================================
// LIGHTBOX : 확대 화면 닫기
// ========================================

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.classList.remove('lightbox-open');
}

lightbox.querySelector('.lightbox-close')
  .addEventListener('click', closeLightbox);


// 이미지와 정보 패널 바깥을 클릭하면 닫기
lightbox.addEventListener('click', e => {
  if (
    !e.target.closest('.lightbox-image-wrap') &&
    !e.target.closest('.lightbox-info') &&
    !e.target.closest('.lightbox-close')
  ) {
    closeLightbox();
  }
});


// ESC 키로 닫기
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});


// ========================================
// GALLERY : 이미지 아카이브 생성
// ========================================

function renderGallery() {

  photoGrid.innerHTML = '';

  let photos = Array.from({ length: 100 }, (_, i) => i + 1);

  // 실용순 정렬
  if (activeSort === 'practical') {
    photos.reverse();
  }

 photos.forEach((number, index) => {

    const file = String(number).padStart(2, '0');

    // 사진별 작가 및 설명 가져오기
    const info = descriptions[activeCategory][file] || {
  title: '작품명 미입력',
  titleEn: 'Title not entered',
  artist: 'ARTIST NAME',
  comment: '작품 설명을 입력하세요.'
};

    // 사진 카드 생성
    const card = document.createElement('article');
    card.className = 'photo-card';
    card.tabIndex = 0;

    // 이미지 생성
    const img = document.createElement('img');

    const imageBase = `images/${activeCategory}/${file}`;

img.src = `${imageBase}.png`;
img.alt = `${categories[activeCategory][0]} - ${info.artist}`;
img.loading = 'lazy';

let triedJpg = false;

img.onerror = () => {
  if (!triedJpg) {
    triedJpg = true;
    img.src = `${imageBase}.jpg`;
  }
};

    img.addEventListener('load', () => {
      card.classList.add('has-image');
    });

    // 이미지가 없을 때 표시되는 영역
    const placeholder = document.createElement('div');
    placeholder.className = 'photo-placeholder';

    placeholder.innerHTML = `
      <b>${file}</b>
      <span>IMAGE PLACEHOLDER</span>
    `;

    // 호버 오버레이
    const overlay = document.createElement('div');
    overlay.className = 'photo-overlay';

    const numberText = document.createElement('div');
numberText.className = 'photo-number';

const displayNumber = String(index + 1).padStart(2, '0');

const fontClasses = [
  'number-freesentation',
  'number-allimjang',
  'number-edge'
];

const fontClass = fontClasses[Math.floor(index / 4) % 3];

numberText.innerHTML = `
  <span class="${fontClass}">${displayNumber}</span>
`;

    const artistText = document.createElement('span');
    artistText.className = 'photo-artist';
    artistText.textContent = info.title || '작품명 미입력';

    overlay.append(numberText, artistText);

    // 카드에 요소 추가
    card.append(img, placeholder, overlay);

    // 사진 클릭 시 상세 화면 열기
    card.addEventListener('click', e => {
      e.stopPropagation();

      openLightbox(
        img.src,
        img.alt,
        info,
        activeCategory,
        file
      );
    });

    // 키보드 Enter 또는 Space로 열기
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();

        openLightbox(
          img.src,
          img.alt,
          info,
          activeCategory,
          file
        );
      }
    });

    photoGrid.appendChild(card);

  });

  // 페이지 제목을 현재 카테고리에 맞춰 변경
  const archiveHeading = document.querySelector('.title-row h2');
  if (archiveHeading) {
    archiveHeading.textContent = `${categories[activeCategory][0]}의 틈`;
  }

  // 상단에 중복으로 표시되던 작은 카테고리명은 숨김
  if (currentCategory) {
    currentCategory.style.display = 'none';
  }

  galleryScroll.scrollTop = 0;

  updateProgress();
}

// 카테고리별 색상 설정
const categoryColors = {
  chair: '#8298ae',
  clothes: '#c58d9a',
  bag: '#8ca995',
  table: '#c3a16e',
  architecture: '#9a8eaf'
};

// 선택된 카테고리 색상 적용
function updateCategoryColor() {
  const color = categoryColors[activeCategory] || '#8298ae';
  document.documentElement.style.setProperty('--category-color', color);
}

// 카테고리별 호버 색상 지정
document.querySelectorAll('.category-button').forEach(button => {
  const hoverColor = categoryColors[button.dataset.category];

  if (hoverColor) {
    button.style.setProperty('--button-category-color', hoverColor);
  }
});

// ========================================
// CATEGORY MENU : 햄버거 메뉴 호버 / 펼치기
// ========================================

const categoryPanel = document.querySelector('.category-panel');
const archiveShell = document.querySelector('.archive-shell');

if (categoryPanel && archiveShell) {
  const menuButton = document.createElement('button');
  menuButton.type = 'button';
  menuButton.className = 'category-menu-toggle';
  menuButton.setAttribute('aria-label', '카테고리 메뉴 열기');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.innerHTML = '<span></span><span></span><span></span>';

  categoryPanel.insertBefore(menuButton, categoryPanel.firstChild);

  const openCategoryMenu = () => {
    categoryPanel.classList.add('is-expanded');
    archiveShell.classList.add('menu-open');
    menuButton.setAttribute('aria-expanded', 'true');
  };

  const closeCategoryMenu = () => {
    categoryPanel.classList.remove('is-expanded');
    archiveShell.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  categoryPanel.addEventListener('mouseenter', openCategoryMenu);
  categoryPanel.addEventListener('mouseleave', closeCategoryMenu);

  menuButton.addEventListener('click', () => {
    if (categoryPanel.classList.contains('is-expanded')) {
      closeCategoryMenu();
    } else {
      openCategoryMenu();
    }
  });
}


// ========================================
// CATEGORY : 카테고리 전환
// ========================================

document.querySelectorAll('.category-button').forEach(button => {

  button.addEventListener('click', () => {

    document.querySelector('.category-button.active')?.classList.remove('active');

    button.classList.add('active');

    activeCategory = button.dataset.category;

updateCategoryColor();
renderGallery();

  });

});


// ========================================
// SORT : 상상순 / 실용순 정렬
// ========================================

document.querySelectorAll('.sort-button').forEach(button => {

  button.addEventListener('click', () => {

    document.querySelector('.sort-button.active')?.classList.remove('active');

    button.classList.add('active');

    activeSort = button.dataset.sort;

    renderGallery();

  });

});


// ========================================
// PROGRESS : 아카이브 스크롤 진행률
// ========================================

function updateProgress() {

  const max = galleryScroll.scrollHeight - galleryScroll.clientHeight;

  const value = max <= 0
    ? 0
    : Math.round(galleryScroll.scrollTop / max * 100);

  progressNumber.textContent = value;

  // 숫자 뒤에 별도 요소나 텍스트로 표시된 '%' 기호 제거
  const nextElement = progressNumber.nextElementSibling;
  if (nextElement && nextElement.textContent.trim() === '%') {
    nextElement.remove();
  }
  const nextNode = progressNumber.nextSibling;
  if (nextNode && nextNode.nodeType === Node.TEXT_NODE && nextNode.textContent.trim() === '%') {
    nextNode.remove();
  }

 progressFill.style.width = '100%';
progressFill.style.height = `${value}%`;
}

galleryScroll.addEventListener('scroll', updateProgress);
window.addEventListener('resize', updateProgress);

// 진행 막대를 마우스로 클릭하거나 드래그해 스크롤 이동
const progressTrack = document.querySelector('.progress-track');

if (progressTrack) {
  progressTrack.setAttribute('role', 'slider');
  progressTrack.setAttribute('aria-label', '아카이브 스크롤 위치');
  progressTrack.setAttribute('aria-orientation', 'vertical');
  progressTrack.setAttribute('tabindex', '0');

  const moveGalleryToPointer = event => {
    const rect = progressTrack.getBoundingClientRect();
    const position = (event.clientY - rect.top) / rect.height;
    const ratio = Math.max(0, Math.min(1, position));
    const maxScroll = galleryScroll.scrollHeight - galleryScroll.clientHeight;

    galleryScroll.scrollTop = maxScroll * ratio;
    updateProgress();
  };

  progressTrack.addEventListener('pointerdown', event => {
    event.preventDefault();
    progressTrack.setPointerCapture(event.pointerId);
    moveGalleryToPointer(event);
  });

  progressTrack.addEventListener('pointermove', event => {
    if (progressTrack.hasPointerCapture(event.pointerId)) {
      moveGalleryToPointer(event);
    }
  });

  progressTrack.addEventListener('keydown', event => {
    const step = Math.max(80, galleryScroll.clientHeight * 0.08);

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      galleryScroll.scrollTop -= step;
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      galleryScroll.scrollTop += step;
    } else if (event.key === 'Home') {
      event.preventDefault();
      galleryScroll.scrollTop = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      galleryScroll.scrollTop = galleryScroll.scrollHeight;
    }
  });
}


// ========================================
// INITIAL : 첫 화면 실행
// ========================================

updateCategoryColor();
renderGallery();
introTimer = setTimeout(finishIntro, INTRO_DURATION);

const intentionButton = document.getElementById('intentionButton');
const intentionModal = document.getElementById('intentionModal');
const intentionClose = document.getElementById('intentionClose');

intentionButton.addEventListener('click', () => {
  intentionModal.classList.add('active');
});

intentionClose.addEventListener('click', () => {
  intentionModal.classList.remove('active');
});

intentionModal.addEventListener('click', (e) => {
  if (e.target === intentionModal) {
    intentionModal.classList.remove('active');
  }
});