THE GAP — 자동 인트로 + 이미지 아카이브

실행: 압축 해제 후 VS Code에서 폴더를 열고 Live Server로 index.html 실행.

파일 역할
- index.html: 인트로 문구와 아카이브의 HTML 구조
- style.css: 색상, 레이아웃, 장면별 페이드 인/아웃
- script.js: 인트로 종료/건너뛰기/다시 보기, 카테고리, 정렬, 진행률 숫자

인트로는 5개 장면으로 구성되며 약 24초 후 아카이브가 나타납니다.
SKIP INTRO 버튼으로 바로 넘어갈 수 있고, 메인 상단 THE GAP을 누르면 다시 재생됩니다.

사진 넣기
images/chair/01.jpg ~ 100.jpg
images/clothes/01.jpg ~ 100.jpg
images/bag/01.jpg ~ 100.jpg
images/table/01.jpg ~ 100.jpg
images/vehicle/01.jpg ~ 100.jpg
images/architecture/01.jpg ~ 100.jpg

현재 상상순/실용순은 파일 번호를 기준으로 한 임시 정렬입니다.
실제 사진별 순서를 정할 때 script.js의 photos 배열과 정렬 부분을 수정하세요.
