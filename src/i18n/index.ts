import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      kr: {
        translation: {
          about: {
            company: '회사소개',
            history: '연혁',
            vision: '비전'
          },
          artist: {
            enhypen: 'ENHYPEN',
            trainee: '연습생'
          },
          audition: {
            global: '글로벌 오디션',
            korea: '국내 오디션'
          },
          news: {
            notice: '공지사항',
            press: '보도자료'
          },
          footer: {
            address: '부산광역시 북구 만덕대로 21',
            owner: '대표이사: 김도현',
            links: {
              privacy: 'PRIVACY POLICY',
              terms: 'TERMS OF USE',
              youth: 'YOUTH PROTECTION'
            },
            contact: {
              email: '이메일: biz@mugp.kr',
              tel: '전화: 070-8095-2423'
            },
            copyright: '2025 MUGP. All rights reserved.'
          }
        }
      },
      en: {
        translation: {
          about: {
            company: 'COMPANY',
            history: 'HISTORY',
            vision: 'VISION'
          },
          artist: {
            enhypen: 'ENHYPEN',
            trainee: 'TRAINEE'
          },
          audition: {
            global: 'GLOBAL',
            korea: 'KOREA'
          },
          news: {
            notice: 'NOTICE',
            press: 'PRESS'
          },
          footer: {
            address: '21, Mandeok-daero, Buk-gu, Busan, Republic of Korea',
            owner: 'OWNER: KIM DO HYUN',
            links: {
              privacy: 'PRIVACY POLICY',
              terms: 'TERMS OF USE',
              youth: 'YOUTH PROTECTION'
            },
            contact: {
              email: 'Email: biz@mugp.kr',
              tel: 'Tel: 070-8095-2423'
            },
            copyright: '2025 MUGP. All rights reserved.'
          }
        }
      },
      zh: {
        translation: {
          about: {
            company: '公司',
            history: '历史',
            vision: '愿景'
          },
          artist: {
            enhypen: 'ENHYPEN',
            trainee: '练习生'
          },
          audition: {
            global: '全球试镜',
            korea: '韩国试镜'
          },
          news: {
            notice: '公告',
            press: '新闻'
          },
          footer: {
            address: '韩国釜山市北区万德大路21号',
            owner: '代表: 金到贤',
            links: {
              privacy: 'PRIVACY POLICY',
              terms: 'TERMS OF USE',
              youth: 'YOUTH PROTECTION'
            },
            contact: {
              email: '邮箱: biz@mugp.kr',
              tel: '电话: 070-8095-2423'
            },
            copyright: '2025 MUGP. 版权所有。'
          }
        }
      },
      ja: {
        translation: {
          about: {
            company: '会社',
            history: '沿革',
            vision: 'ビジョン'
          },
          artist: {
            enhypen: 'ENHYPEN',
            trainee: 'トレーニー'
          },
          audition: {
            global: 'グローバルオーディション',
            korea: '韓国オーディション'
          },
          news: {
            notice: 'お知らせ',
            press: 'プレス'
          },
          footer: {
            address: '韓国釜山市北区万徳大路21',
            owner: '代表: キム・ドヒョン',
            links: {
              privacy: 'PRIVACY POLICY',
              terms: 'TERMS OF USE',
              youth: 'YOUTH PROTECTION'
            },
            contact: {
              email: 'メール: biz@mugp.kr',
              tel: 'TEL: 070-8095-2423'
            },
            copyright: '2025 MUGP. All rights reserved.'
          }
        }
      }
    },
    fallbackLng: 'kr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
