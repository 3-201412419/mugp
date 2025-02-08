import React from 'react';

/**
 * HTML 태그를 제거하고 줄바꿈을 유지하는 함수
 */
function stripHtmlTags(html: string): string {
  // <br>을 줄바꿈 문자(\n)로 변환
  const withLineBreaks = html.replace(/<br\s*\/?>/gi, '\n');
  // 나머지 HTML 태그 제거
  return withLineBreaks.replace(/<\/?[^>]+(>|$)/g, '');
}

// 개인정보 처리방침 전체 내용 (HTML 태그 포함)
const htmlContent = `
<strong>제1조 (개인정보의 처리목적)</strong><br>
1. 홈페이지 회원 가입 및 관리<br>
2. 재화 또는 서비스 제공<br>
3. 고충 처리<br>
<br>
<strong>제2조 (개인정보의 처리 및 보유기간)</strong><br>
1. 홈페이지 회원 가입 및 관리 : 탈퇴 시까지<br>
2. 법령이 정한 기간 동안 보유<br>
<br>
<strong>제3조 (정보주체 및 법정대리인의 권리와 그 행사 방법)</strong><br>
1. 개인정보 열람 요구<br>
2. 오류 정정 요구<br>
3. 삭제 요구<br>
<br>
<strong>제4조 (처리하는 개인정보 항목)</strong><br>
1. 이메일, 비밀번호, 성명<br>
2. 결제 정보, 배송 주소<br>
<br>
<strong>제5조 (개인정보의 파기)</strong><br>
1. 보유 기간 경과 시 파기<br>
2. 종이 문서는 분쇄 또는 소각<br>
3. 전자 파일은 기술적 방법을 사용하여 삭제<br>
<br>
<strong>제6조 (개인정보 보호책임자)</strong><br>
- 성명: 홍길동<br>
- 연락처: privacy@company.com<br>
<br>
<strong>제7조 (개인정보 처리방침 변경)</strong><br>
1. 본 개인정보 처리방침은 2025년 2월 8일부터 적용됩니다.<br>
`;

const plainText = stripHtmlTags(htmlContent);

function PrivacyPolicy() {
  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '24px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        lineHeight: 1.8,
      }}
    >
      {/* 제목 스타일 */}
      <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        개인정보 처리방침
      </h1>

      {/* 본문 스타일 */}
      <p style={{ fontSize: '16px', fontWeight: '500', whiteSpace: 'pre-line', marginBottom: '20px' }}>
        {plainText}
      </p>
    </div>
  );
}

export default PrivacyPolicy;
