# 작품 추가 방법

## 1단계: 이 폴더 안에 작품 폴더 생성

```
_inbox/
└── 작품-id/              ← 영문 소문자 + 하이픈 (예: moonlight-ring)
    ├── info.json         ← info.template.json 복사 후 내용 채우기
    ├── 01_대표사진.jpg    ← 첫 번째 파일 = 대표 사진 (콜라주에 표시)
    ├── 02_측면.jpg
    ├── 03_디테일.jpg
    └── 04_착용샷.jpg
```

## 2단계: info.json 작성

`info.template.json`을 복사해서 내용을 채워주세요.

```json
{
  "category": "silver",     ← "silver" 또는 "chilbo"
  "title": "작품명",
  "concept": "기획 의도",
  "material": "소재",
  "technique": "기법",
  "collection": "시리즈명",
  "exhibition": "전시 이력",
  "year": 2025,
  "featured": false         ← true이면 홈 페이지에 표시
}
```

## 3단계: 스크립트 실행 (터미널)

```bash
npm run add-artwork
```

## 4단계: GitHub에 올리기

```bash
git add .
git commit -m "Add artwork: 작품명"
git push
```

→ Vercel이 약 1~2분 내에 자동 재배포합니다!
