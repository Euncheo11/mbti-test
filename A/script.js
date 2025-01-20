// 카카오 API 초기화 (발급받은 앱 키 사용)
Kakao.init('YOUR_KAKAO_APP_KEY');  // 여기에 카카오 앱 키를 입력하세요

const questions = [
    { question: "당신은 새로운 사람을 만나는 걸 좋아하나요?", type: "E" },
    { question: "당신은 혼자 있는 시간이 필요한가요?", type: "I" },
    { question: "당신은 계획적으로 행동하나요?", type: "J" },
    { question: "당신은 즉흥적인 결정을 잘하나요?", type: "P" },
    { question: "당신은 논리적으로 문제를 해결하나요?", type: "T" },
    { question: "당신은 감정적으로 결정을 내리나요?", type: "F" },
    { question: "당신은 세부사항에 집중하나요?", type: "S" },
    { question: "당신은 큰 그림을 먼저 보나요?", type: "N" }
];

let currentQuestionIndex = 0;
let mbtiScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

// 다음 질문 표시
function showNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        document.getElementById('question').innerText = questions[currentQuestionIndex].question;
    } else {
        document.getElementById('question-container').style.display = 'none';  // 질문창 숨기기
        calculateMBTI();
    }
}

// 사용자의 응답 처리
function answerQuestion(choice) {
    const currentType = questions[currentQuestionIndex].type;
    if (choice === 'A') {
        mbtiScores[currentType]++;
    }
    currentQuestionIndex++;
    showNextQuestion();
}

// MBTI 결과 계산
function calculateMBTI() {
    let mbti = '';
    mbti += mbtiScores['E'] > mbtiScores['I'] ? 'E' : 'I';
    mbti += mbtiScores['S'] > mbtiScores['N'] ? 'S' : 'N';
    mbti += mbtiScores['T'] > mbtiScores['F'] ? 'T' : 'F';
    mbti += mbtiScores['J'] > mbtiScores['P'] ? 'J' : 'P';

    showResult(mbti);
}

// MBTI 유형별 추천 직업 및 이미지
const careerSuggestions = {
    ISTJ: "회계사, 변호사, 공무원, 데이터 분석가, 품질 관리 전문가",
    ISFJ: "간호사, 교사, 사회복지사, 사서, 고객 서비스 관리자",
    INFJ: "심리상담사, 인권 변호사, 작가, 연구원, 예술가",
    INTJ: "전략 컨설턴트, 기업 경영자, 엔지니어, 데이터 과학자",
    ISTP: "기계공학자, 응급 구조원, 파일럿, 프로그래머, 스포츠 트레이너",
    ISFP: "디자이너, 사진작가, 음악가, 조경사, 보석 디자이너",
    INFP: "작가, 예술가, 심리치료사, 사회 운동가, 편집자",
    INTP: "연구원, 컴퓨터 프로그래머, 빅데이터 분석가, 수학자",
    ESTP: "기업가, 마케팅 전문가, 영업사원, 스포츠 선수, 파일럿",
    ESFP: "배우, 이벤트 플래너, 패션 디자이너, 여행 가이드",
    ENFP: "마케터, 작가, 여행 가이드, 홍보 전문가, 엔터테이너",
    ENTP: "창업가, 광고 기획자, 변호사, 컨설턴트, 기자",
    ESTJ: "관리자, 군인, 법률 전문가, 프로젝트 매니저, 은행원",
    ESFJ: "사회복지사, 교사, 간호사, 호텔 매니저, 인사 담당자",
    ENFJ: "교사, 인사 관리자, 상담가, 연설가, 사회 운동가",
    ENTJ: "CEO, 정치가, 투자 분석가, 변호사, 경영 컨설턴트"
};

// MBTI 유형별 이미지 경로
const mbtiImages = {
    ISTJ: "images/istj.png",
    ISFJ: "images/isfj.png",
    INFJ: "images/infj.png",
    INTJ: "images/intj.png",
    ISTP: "images/istp.png",
    ISFP: "images/isfp.png",
    INFP: "images/infp.png",
    INTP: "images/intp.png",
    ESTP: "images/estp.png",
    ESFP: "images/esfp.png",
    ENFP: "images/enfp.png",
    ENTP: "images/entp.png",
    ESTJ: "images/estj.png",
    ESFJ: "images/esfj.png",
    ENFJ: "images/enfj.png",
    ENTJ: "images/entj.png"
};

// MBTI 결과 표시
function showResult(mbti) {
    document.getElementById('prediction').innerHTML = 
    `당신의 MBTI 유형은 <span style="font-weight: bold; font-size: 1.5em;">${mbti}</span>입니다.`;
    
    document.getElementById('career-suggestion').innerText = `추천 직업: ${careerSuggestions[mbti] || "관련 직업 정보 없음"}`;
    document.getElementById('mbti-image').src = mbtiImages[mbti] || "images/default.png";
    document.getElementById('result').style.display = "block";
}

// SNS 공유 기능
function shareOnFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank');
}

function shareOnTwitter() {
    window.open(`https://twitter.com/intent/tweet?text=${document.getElementById('prediction').innerText}`, '_blank');
}

function shareOnTikTok() {
    alert("틱톡에서는 직접 공유해야 합니다. 결과를 캡처 후 올려보세요!");
}

function shareOnInstagram() {
    alert("인스타그램에서는 직접 공유해야 합니다. 결과를 캡처 후 올려보세요!");
}

// 카카오톡 공유 기능
document.getElementById('kakao-share').addEventListener('click', function() {
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: 'MBTI 미래 예언 테스트',
            description: document.getElementById('prediction').innerText,
            imageUrl: document.getElementById('mbti-image').src,
            link: { webUrl: window.location.href }
        }
    });
});

// 초기 질문 표시
showNextQuestion();