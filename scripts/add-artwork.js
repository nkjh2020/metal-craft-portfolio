/**
 * add-artwork.js
 * 작품 추가 자동화 스크립트
 *
 * 사용법:
 *   npm run add-artwork
 *   npm run add-artwork -- --update   (기존 작품 덮어쓰기)
 *
 * _inbox/ 폴더 구조:
 *   _inbox/
 *   └── {작품-id}/
 *       ├── info.json
 *       ├── 01_main.jpg
 *       ├── 02_angle.jpg
 *       └── ...
 */

const fs = require('fs');
const path = require('path');

// ─── 설정 ───────────────────────────────────────────
const INBOX_DIR = path.join(process.cwd(), '_inbox');
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const DATA_DIR = path.join(process.cwd(), 'data');
const SILVER_JSON = path.join(DATA_DIR, 'silver-artworks.json');
const CHILBO_JSON = path.join(DATA_DIR, 'chilbo-artworks.json');

const VALID_CATEGORIES = ['silver', 'chilbo'];
const VALID_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const MAX_IMAGES = 10;
const isUpdate = process.argv.includes('--update');

// ─── 유틸 함수 ────────────────────────────────────────
function log(msg) { console.log(msg); }
function success(msg) { console.log(`  ✓ ${msg}`); }
function warn(msg) { console.log(`  ⚠️  ${msg}`); }
function error(msg) { console.error(`  ❌ ${msg}`); }

function getDataFile(category) {
  return category === 'silver' ? SILVER_JSON : CHILBO_JSON;
}

function readJsonFile(filePath) {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeJsonFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// ─── 이미지 파일 목록 가져오기 (알파벳순 정렬) ────────────
function getImageFiles(dir) {
  return fs.readdirSync(dir)
    .filter(f => VALID_IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()))
    .sort()  // 파일명 순 정렬 → 01_, 02_ 번호 활용
    .map(f => path.join(dir, f));
}

// ─── 단일 작품 처리 ────────────────────────────────────
function processArtwork(artworkId) {
  const artworkDir = path.join(INBOX_DIR, artworkId);
  log(`\n처리 중: ${artworkId}`);

  // 1. info.json 읽기
  const infoPath = path.join(artworkDir, 'info.json');
  if (!fs.existsSync(infoPath)) {
    error('info.json 파일이 없습니다. 건너뜁니다.');
    return false;
  }

  let info;
  try {
    info = JSON.parse(fs.readFileSync(infoPath, 'utf-8'));
  } catch (e) {
    error(`info.json 파싱 실패: ${e.message}`);
    return false;
  }

  // 2. 유효성 검사
  if (!VALID_CATEGORIES.includes(info.category)) {
    error(`category는 'silver' 또는 'chilbo'여야 합니다. (현재: ${info.category})`);
    return false;
  }

  const requiredFields = ['title', 'concept', 'material', 'technique', 'collection', 'exhibition', 'year'];
  const missingFields = requiredFields.filter(f => !info[f]);
  if (missingFields.length > 0) {
    error(`info.json에 필수 항목이 없습니다: ${missingFields.join(', ')}`);
    return false;
  }
  success('info.json 읽기 완료');

  // 3. 이미지 파일 감지
  const imageFiles = getImageFiles(artworkDir);
  if (imageFiles.length === 0) {
    error('이미지 파일이 없습니다 (jpg/jpeg/png/webp)');
    return false;
  }
  if (imageFiles.length < 3) {
    warn(`이미지가 ${imageFiles.length}장입니다. 3장 이상 권장합니다.`);
  }
  if (imageFiles.length > MAX_IMAGES) {
    warn(`이미지가 ${imageFiles.length}장입니다. 처음 ${MAX_IMAGES}장만 사용합니다.`);
    imageFiles.splice(MAX_IMAGES);
  }
  success(`이미지 ${imageFiles.length}장 감지`);

  // 4. 기존 작품 ID 중복 확인
  const dataFile = getDataFile(info.category);
  const artworks = readJsonFile(dataFile);
  const existingIndex = artworks.findIndex(a => a.id === artworkId);

  if (existingIndex !== -1 && !isUpdate) {
    error(`이미 등록된 작품 ID입니다: "${artworkId}"`);
    error(`수정하려면 npm run add-artwork -- --update 를 사용하세요.`);
    return false;
  }

  // 5. 이미지 폴더 생성 및 복사
  const destDir = path.join(PUBLIC_IMAGES_DIR, info.category, artworkId);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  success(`public/images/${info.category}/${artworkId}/ 생성`);

  const [mainSrc, ...angleSrcs] = imageFiles;
  const mainExt = path.extname(mainSrc).toLowerCase();
  const mainDest = path.join(destDir, `main${mainExt}`);
  fs.copyFileSync(mainSrc, mainDest);
  success(`main${mainExt} 복사 (${path.basename(mainSrc)})`);

  const angleImagePaths = [];
  angleSrcs.forEach((src, i) => {
    const ext = path.extname(src).toLowerCase();
    const dest = path.join(destDir, `angle-${i + 1}${ext}`);
    fs.copyFileSync(src, dest);
    angleImagePaths.push(`/images/${info.category}/${artworkId}/angle-${i + 1}${ext}`);
  });
  if (angleSrcs.length > 0) {
    success(`angle-1.jpg ~ angle-${angleSrcs.length}.jpg 복사`);
  }

  // 6. JSON 데이터 업데이트
  const newArtwork = {
    id: artworkId,
    category: info.category,
    title: info.title,
    concept: info.concept,
    material: info.material,
    technique: info.technique,
    collection: info.collection,
    exhibition: info.exhibition,
    images: {
      main: `/images/${info.category}/${artworkId}/main${mainExt}`,
      angles: angleImagePaths,
    },
    year: info.year,
    featured: info.featured || false,
  };

  if (existingIndex !== -1) {
    artworks[existingIndex] = newArtwork;
    success(`data/${info.category}-artworks.json 업데이트 (기존 항목 덮어쓰기)`);
  } else {
    artworks.push(newArtwork);
    success(`data/${info.category}-artworks.json 업데이트 (새 항목 추가)`);
  }
  writeJsonFile(dataFile, artworks);

  // 7. _inbox 정리
  fs.rmSync(artworkDir, { recursive: true });
  success(`_inbox/${artworkId}/ 정리 완료`);

  // 8. 완료 메시지
  console.log(`\n✅ "${info.title}" 추가 완료!`);
  console.log(`   → 갤러리:     /collection/${info.category}`);
  console.log(`   → 상세 페이지: /collection/${info.category}/${artworkId}`);
  if (info.featured) {
    console.log(`   → 홈 페이지:   대표 작품으로 표시됩니다 ⭐`);
  }
  return true;
}

// ─── 메인 ────────────────────────────────────────────
function main() {
  console.log('\n🎨 작품 추가 스크립트 시작\n');

  if (!fs.existsSync(INBOX_DIR)) {
    console.log('_inbox/ 폴더가 없습니다. 생성합니다...');
    fs.mkdirSync(INBOX_DIR, { recursive: true });
    console.log('_inbox/ 폴더를 생성했습니다.');
    console.log('_inbox/{작품-id}/ 폴더를 만들고 info.json과 사진을 넣어주세요.\n');
    return;
  }

  // _inbox/ 안의 폴더 목록 (info.json이 있는 것만)
  const artworkIds = fs.readdirSync(INBOX_DIR)
    .filter(name => {
      const fullPath = path.join(INBOX_DIR, name);
      return fs.statSync(fullPath).isDirectory();
    });

  if (artworkIds.length === 0) {
    console.log('_inbox/ 폴더에 처리할 작품이 없습니다.');
    console.log('_inbox/{작품-id}/ 폴더를 만들고 info.json과 사진을 넣어주세요.\n');
    return;
  }

  console.log(`발견된 작품: ${artworkIds.length}개 → ${artworkIds.join(', ')}`);

  let successCount = 0;
  let failCount = 0;

  artworkIds.forEach(id => {
    const ok = processArtwork(id);
    if (ok) successCount++;
    else failCount++;
  });

  console.log('\n─────────────────────────────────────────');
  console.log(`완료: ${successCount}개 성공 / ${failCount}개 실패`);
  if (successCount > 0) {
    console.log('\n다음 단계:');
    console.log('  git add .');
    console.log('  git commit -m "Add artwork: {작품명}"');
    console.log('  git push');
    console.log('  → Vercel이 자동으로 재배포합니다 (약 1~2분)\n');
  }
}

main();
