/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

/** 관리자 */
export type AdminModel = {
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 이메일 */
  email: Scalars['String'];
  /** 권한명 */
  role: Role;
};

/** 채팅 메세지 방향 */
export enum ChatMessageDirection {
  /** 다음 */
  Next = 'NEXT',
  /** 이전 */
  Prev = 'PREV'
}

/** 채팅 메세지 */
export type ChatMessageModel = {
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 메세지 */
  message: Scalars['String'];
  /** 보낸 회원 Identity */
  sender: Scalars['String'];
};

/** 채팅 메세지 목록 - 채팅 메세지 목록 조회 (회원) output */
export type ChatMessagesByFindManyChatMessageByUserOutput = {
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 읽음 여부 */
  isUnread: Scalars['Boolean'];
  /** 메세지 */
  message: Scalars['String'];
  /** 보낸 회원 Identity */
  sender: Scalars['String'];
};

/** 채팅방 */
export type ChatRoomModel = {
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
};

/** 채팅방 목록 - 참가한 채팅방 목록 조회 (회원) output */
export type ChatRoomsByFindManyChatRoomByUserOutput = {
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 새 채팅 메세지 여부 */
  isNewChatMessage: Scalars['Boolean'];
  /** 안읽은 메세지 여부 */
  isUnread: Scalars['Boolean'];
  /** 오퍼 ID */
  offerId: Scalars['Int'];
  /** 상대방 아이디 */
  otherIdentity: Scalars['String'];
};

/** 확인한 최근 채팅 메세지 */
export type CheckedCurrentChatMessageModel = {
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
};

/** 지역 */
export type CityModel = {
  /** ID */
  id: Scalars['Int'];
  /** 지역명 */
  name: Scalars['String'];
};

/** 암호화폐 종류 */
export enum CoinKind {
  /** 에이다 */
  Ada = 'ADA',
  /** 비트코인 캐시 */
  Bch = 'BCH',
  /** 비트코인 */
  Btc = 'BTC',
  /** 폴카닷 */
  Dot = 'DOT',
  /** 이더리움 */
  Eth = 'ETH',
  /** 체인링크 */
  Link = 'LINK',
  /** 트론 */
  Trx = 'TRX',
  /** 테더 */
  Usdt = 'USDT',
  /** 스텔라루멘 */
  Xlm = 'XLM',
  /** 리플 */
  Xrp = 'XRP'
}

/** 국가번호 */
export type CountryCodeModel = {
  /** 국가번호 */
  code: Scalars['String'];
  /** 나라이름 */
  country: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
};

/** OTP QR코드 생성 output */
export type CreateOtpQrOutput = {
  /** OTP Secret */
  otpSecret: Scalars['String'];
  /** URL */
  url: Scalars['String'];
};

/** 운전면허증 */
export type DriverLicenseModel = {
  /** 지역코드 또는 지역번호 */
  area: Scalars['String'];
  /** 생년월일 */
  birth: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 면허번호 */
  licenseNumber: Scalars['String'];
  /** 이름 */
  name: Scalars['String'];
  /** 일련번호 */
  serialNumber: Scalars['String'];
};

/** 이메일 인증 */
export type EmailAuthModel = {
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 이메일 */
  email: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
};

/** 피드백 종류 */
export enum FeedbackKind {
  /** 부정 */
  Negative = 'NEGATIVE',
  /** 긍정 */
  Positive = 'POSITIVE'
}

/** 피드백 */
export type FeedbackModel = {
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 피드백 종류 */
  feedbackKind: FeedbackKind;
  /** ID */
  id: Scalars['Int'];
};

/** 대시보드 그래프 조회 (관리자) output */
export type FindDashboardByAdminOutput = {
  /** 오퍼 생성 */
  offers: Array<ObjectByFindDashboardByAdminOutput>;
  /** 1:1문의 */
  userInquiries: Array<ObjectByFindDashboardByAdminOutput>;
  /** 회원 */
  users: Array<ObjectByFindDashboardByAdminOutput>;
};

/** 채팅 메세지 목록 조회 (회원) output */
export type FindManyChatMessageByUserOutput = {
  /** 채팅 메세지 목록 */
  chatMessages: Array<ChatMessagesByFindManyChatMessageByUserOutput>;
  /** 마지막 메세지 여부 */
  isEnd: Scalars['Boolean'];
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 참가한 채팅방 목록 조회 (회원) output */
export type FindManyChatRoomByUserOutput = {
  /** 채팅방 목록 */
  chatRooms: Array<ChatRoomsByFindManyChatRoomByUserOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 마켓 시세 목록 조회 output */
export type FindManyMarketPriceOutput = {
  /** 바이낸스 시세 목록 */
  binance: Array<MarketPriceModel>;
  /** 김치 시세 목록 */
  kimchi: Array<MarketPriceModel>;
  /** 업비트 시세 목록 */
  upbit: Array<MarketPriceModel>;
};

/** 공지사항 목록 조회 output */
export type FindManyNoticeOutput = {
  /** 공지사항 목록 */
  notices: Array<NoticeModel>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 오퍼 목록 조회 (회원) output */
export type FindManyOfferOutput = {
  /** 오퍼 목록 */
  offers: Array<OfferByFindManyOfferOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 약관 목록 조회 output */
export type FindManyPolicyOutput = {
  /** 약관 목록 */
  policies: Array<PolicyModel>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 1:1 문의 목록 조회 (관리자) output */
export type FindManyUserInquiryByAdminOutput = {
  /** 총 개수 */
  totalCount: Scalars['Int'];
  /** 문의 목록 */
  userInquiries: Array<UserInquiryInFindManyUserInquiryByAdminOutput>;
};

/** 1:1 문의 목록 조회 (회원) output */
export type FindManyUserInquiryByUserOutput = {
  /** 총 개수 */
  totalCount: Scalars['Int'];
  /** 문의 목록 */
  userInquiries: Array<UserInquiryModel>;
};

/** 회원 목록 조회 output */
export type FindManyUserOutput = {
  /** 총 개수 */
  totalCount: Scalars['Int'];
  /** 회원 목록 */
  users: Array<UserModel>;
};

/** 내정보 조회 */
export type FindMyInfoOutput = {
  /** 접속일 */
  connectionDate?: Maybe<Scalars['Date']>;
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 운전면허증 인증 */
  driverLicense?: Maybe<DriverLicenseModel>;
  /** 이메일 인증 */
  emailAuth?: Maybe<EmailAuthModel>;
  /** 주민등록증 인증 */
  idCard?: Maybe<IdCardModel>;
  /** 아이디 */
  identity: Scalars['String'];
  /** 레벨 */
  level: Scalars['Int'];
  /** 부정적 피드백 개수 */
  negativeFeedbackCount: Scalars['Int'];
  /** 여권 인증 */
  passport?: Maybe<PassportModel>;
  /** 휴대폰 */
  phone?: Maybe<Scalars['String']>;
  /** 긍정적 피드백 개수 */
  positiveFeedbackCount: Scalars['Int'];
};

/** 오퍼 상세 조회 (회원, 비회원) output */
export type FindOneOfferOutput = {
  /** 지역 */
  city: CityModel;
  /** 암호화폐 종류 */
  coinKind: CoinKind;
  /** 오퍼 조건 */
  content: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 아이디 */
  identity: Scalars['String'];
  /** 새 채팅 메세지 여부 */
  isNewChatMessage?: Maybe<Scalars['Boolean']>;
  /** 최대 거래량 */
  maxAmount: Scalars['Int'];
  /** 최소 거래량 */
  minAmount: Scalars['Int'];
  /** 오퍼액션 */
  offerAction: OfferAction;
  /** 가격 */
  price: Scalars['Int'];
  /** 예약상태 */
  reservationStatus: ReservationStatus;
  /** 평균 응답 속도 */
  responseSpeed: Scalars['Int'];
  /** 거래방법 */
  transactionMethod: TransactionMethod;
  /** 거래상태 */
  transactionStatus: TransactionStatus;
};

/** 회원 정보 조회 (회원) */
export type FindUserInfoByUserOutput = {
  /** 접속일 */
  connectionDate?: Maybe<Scalars['Date']>;
  /** 아이디 */
  identity: Scalars['String'];
  /** 레벨 */
  level: Scalars['Int'];
  /** 부정적 피드백 개수 */
  negativeFeedbackCount: Scalars['Int'];
  /** 긍정적 피드백 개수 */
  positiveFeedbackCount: Scalars['Int'];
};

/** 주민등록증 */
export type IdCardModel = {
  /** ID */
  id: Scalars['Int'];
  /** 발급일 */
  issueDate: Scalars['String'];
  /** 이름 */
  name: Scalars['String'];
  /** 주민등록번호 */
  registrationNumber: Scalars['String'];
};

/** 로그인 종류 */
export enum LoginKind {
  /** 이메일 */
  Email = 'EMAIL',
  /** 카카오 */
  Kakao = 'KAKAO'
}

/** 마켓 시세 */
export type MarketPriceModel = {
  /** 전일 종가 대비 변화 금액 */
  changePrice: Scalars['Float'];
  /** 전일 종가 대비 변화량 */
  changeRate: Scalars['Float'];
  /** 종가 */
  closePrice: Scalars['Float'];
  /** 코인 코드 */
  code: Scalars['String'];
  /** 고가 */
  highPrice: Scalars['Float'];
  /** 저가 */
  lowPrice: Scalars['Float'];
  /** 시가 */
  openPrice: Scalars['Float'];
  /** 타임스탬프 */
  timestamp: Scalars['String'];
  /** 해당 캔들에서 마지막 틱이 저장된 시각 */
  tradeTime: Scalars['Float'];
};

export type Mutation = {
  /** 이메일 인증번호 확인 (회원) */
  confirmEmailAuthNumber: EmailAuthModel;
  /** 채팅 메세지 발송 (회원) */
  createChatMessage: SubscribeChatMessageOutput;
  /** 운전면허증 인증 (회원) */
  createDriverLicense: DriverLicenseModel;
  /** 주민등록증 인증 (회원) */
  createIdCard: IdCardModel;
  /** 공지사항 생성 (관리자) */
  createNotice: NoticeModel;
  /** 오퍼 생성 (회원) */
  createOfferByUser: OfferModel;
  /** OTP QR코드 생성 */
  createOtpQr: CreateOtpQrOutput;
  /** 여권 인증 (회원) */
  createPassport: PassportModel;
  /** 문의 생성 (회원) */
  createUserInquiryByUser: UserInquiryModel;
  /** 공지사항 삭제 (관리자) */
  deleteNotice: NoticeModel;
  /** 오퍼 삭제 (회원) */
  deleteOfferByUser: OfferModel;
  /** 1:1 문의 삭제 (회원) */
  deleteUserInquiry: Scalars['Boolean'];
  /** 채팅방 참가 (회원) */
  enterChatRoom: ChatRoomModel;
  /** Token 재발급 (관리자) */
  refreshByAdmin: TokenOutput;
  /** Token 재발급 (회원) */
  refreshByUser: TokenOutput;
  /** 1:1 문의 답변 작성 (관리자) */
  replyUserInquiryByAdmin: UserInquiryModel;
  /** 로그아웃 (관리자) */
  signOutByAdmin: Scalars['Boolean'];
  /** 로그아웃 (회원) */
  signOutByUser: Scalars['Boolean'];
  /** 회원가입 (관리자) */
  signUpByAdmin: AdminModel;
  /** 회원가입 (회원) */
  signUpByUser: UserModel;
  /** 피드백 토글 (회원) */
  toggleFeedbackByUser: FeedbackModel;
  /** 확인한 최근 메세지 업데이트 (회원) */
  updateCheckedCurrentChatMessageByUser: CheckedCurrentChatMessageModel;
  /** 공지사항 수정 (관리자) */
  updateNotice: FindManyNoticeOutput;
  /** 오퍼 예약상태 or 거래상태 변경 (회원) */
  updateOfferStatusByUser: OfferModel;
  /** 비밀번호 변경 (회원) */
  updatePasswordByUser: UserModel;
  /** 휴대폰 번호 변경 */
  updatePhoneNumberByUser: UserModel;
  /** 약관 수정 (관리자) */
  updatePolicy: Scalars['Boolean'];
  /** 1:1 문의 수정 (회원) */
  updateUserInquiry: Scalars['Boolean'];
  /** 약관 첨부파일 업로드 (관리자) */
  uploadPolicyFile: Scalars['String'];
  /** 회원탈퇴 */
  withdrawalUser: Scalars['Boolean'];
};


export type MutationConfirmEmailAuthNumberArgs = {
  authNumber: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateChatMessageArgs = {
  chatRoomId: Scalars['Int'];
  message: Scalars['String'];
};


export type MutationCreateDriverLicenseArgs = {
  area: Scalars['String'];
  birth: Scalars['String'];
  licenseNumber: Scalars['String'];
  name: Scalars['String'];
  serialNumber: Scalars['String'];
};


export type MutationCreateIdCardArgs = {
  issueDate: Scalars['String'];
  name: Scalars['String'];
  registrationNumber: Scalars['String'];
};


export type MutationCreateNoticeArgs = {
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateOfferByUserArgs = {
  cityId: Scalars['Int'];
  coinKind: CoinKind;
  content: Scalars['String'];
  maxAmount: Scalars['Int'];
  minAmount: Scalars['Int'];
  offerAction: OfferAction;
  price: Scalars['Int'];
  responseSpeed: Scalars['Int'];
  transactionMethod: TransactionMethod;
};


export type MutationCreateOtpQrArgs = {
  email: Scalars['String'];
};


export type MutationCreatePassportArgs = {
  expirationDate: Scalars['String'];
  issueDate: Scalars['String'];
  passportNumber: Scalars['String'];
};


export type MutationCreateUserInquiryByUserArgs = {
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteNoticeArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteOfferByUserArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserInquiryArgs = {
  id: Scalars['Int'];
};


export type MutationEnterChatRoomArgs = {
  offerId: Scalars['Int'];
};


export type MutationReplyUserInquiryByAdminArgs = {
  id: Scalars['Int'];
  reply: Scalars['String'];
};


export type MutationSignUpByAdminArgs = {
  email: Scalars['String'];
  otpSecret: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignUpByUserArgs = {
  hash: Scalars['String'];
  identity: Scalars['String'];
  loginKind?: LoginKind;
  password: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationToggleFeedbackByUserArgs = {
  feedbackKind: FeedbackKind;
  receiverIdentity: Scalars['String'];
};


export type MutationUpdateCheckedCurrentChatMessageByUserArgs = {
  chatMessageId: Scalars['Int'];
  chatRoomId: Scalars['Int'];
};


export type MutationUpdateNoticeArgs = {
  content: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationUpdateOfferStatusByUserArgs = {
  id: Scalars['Int'];
};


export type MutationUpdatePasswordByUserArgs = {
  newPassword: Scalars['String'];
  originPassword: Scalars['String'];
};


export type MutationUpdatePhoneNumberByUserArgs = {
  hash: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationUpdatePolicyArgs = {
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  policyKind?: InputMaybe<PolicyKind>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserInquiryArgs = {
  content: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationUploadPolicyFileArgs = {
  file: Scalars['Upload'];
};

/** 공지사항 */
export type NoticeModel = {
  /** 내용 */
  content: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 조회수 */
  hits: Scalars['Int'];
  /** ID */
  id: Scalars['Int'];
  /** 제목 */
  title: Scalars['String'];
};

/** 검색 종류 */
export enum NoticeSearchKind {
  /** 내용 */
  Content = 'content',
  /** 제목 */
  Title = 'title'
}

/** 대시보드 그래프 조회 (관리자) output */
export type ObjectByFindDashboardByAdminOutput = {
  /** 수 */
  count: Scalars['Int'];
  /** 날짜 */
  date: Scalars['Date'];
};

/** 오퍼액션 */
export enum OfferAction {
  /** 구매 */
  Buy = 'BUY',
  /** 판매 */
  Sell = 'SELL'
}

/** 오퍼 - 오퍼 목록 조회 (회원) output */
export type OfferByFindManyOfferOutput = {
  /** 지역 */
  city: CityModel;
  /** 암호화폐 종류 */
  coinKind: CoinKind;
  /** 접속일 */
  connectionDate?: Maybe<Scalars['Date']>;
  /** 오퍼 조건 */
  content: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 아이디 */
  identity: Scalars['String'];
  /** 새 채팅 메세지 여부 */
  isNewChatMessage: Scalars['Boolean'];
  /** 최대 거래량 */
  maxAmount: Scalars['Int'];
  /** 최소 거래량 */
  minAmount: Scalars['Int'];
  /** 오퍼액션 */
  offerAction: OfferAction;
  /** 긍정 피드백 수 */
  positiveCount: Scalars['Int'];
  /** 가격 */
  price: Scalars['Int'];
  /** 예약상태 */
  reservationStatus: ReservationStatus;
  /** 평균 응답 속도 */
  responseSpeed: Scalars['Int'];
  /** 거래방법 */
  transactionMethod: TransactionMethod;
  /** 거래상태 */
  transactionStatus: TransactionStatus;
};

/** 오퍼 */
export type OfferModel = {
  /** 암호화폐 종류 */
  coinKind: CoinKind;
  /** 오퍼 조건 */
  content: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 최대 거래량 */
  maxAmount: Scalars['Int'];
  /** 최소 거래량 */
  minAmount: Scalars['Int'];
  /** 오퍼액션 */
  offerAction: OfferAction;
  /** 가격 */
  price: Scalars['Int'];
  /** 예약상태 */
  reservationStatus: ReservationStatus;
  /** 평균 응답 속도 */
  responseSpeed: Scalars['Int'];
  /** 거래방법 */
  transactionMethod: TransactionMethod;
  /** 거래상태 */
  transactionStatus: TransactionStatus;
};

/** 여권 */
export type PassportModel = {
  /** 만료일 */
  expirationDate: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 발급일 */
  issueDate: Scalars['String'];
  /** 여권번호 */
  passportNumber: Scalars['String'];
};

/** 약관 종류 */
export enum PolicyKind {
  /** 개인정보처리방침 */
  PersonalInformationProcessingPolicy = 'PERSONAL_INFORMATION_PROCESSING_POLICY',
  /** 이용약관 */
  TermsAndConditions = 'TERMS_AND_CONDITIONS'
}

/** 약관 */
export type PolicyModel = {
  /** 내용 */
  content: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 약관 종류 */
  policyKind: PolicyKind;
  /** 제목 */
  title: Scalars['String'];
  /** 수정일 */
  updatedAt: Scalars['Date'];
};

export type Query = {
  /** 아이디 중복검사 */
  checkDuplicateIdentity: Scalars['Boolean'];
  /** 휴대폰 인증번호 잔여시간 확인 */
  checkRemainTimePhoneAuthNumber: Scalars['Int'];
  /** 휴대폰 인증번호 확인 */
  confirmPhoneAuthNumber: Scalars['String'];
  /** 대시보드 그래프 조회 (관리자) */
  findDashboardByAdmin: FindDashboardByAdminOutput;
  /** 아이디 찾기 */
  findIdentity: Scalars['String'];
  /** 채팅 메세지 목록 조회 (회원) */
  findManyChatMessageByUser: FindManyChatMessageByUserOutput;
  /** 참가한 채팅방 목록 조회 (회원) */
  findManyChatRoomByUser: FindManyChatRoomByUserOutput;
  /** 도시 목록 조회 */
  findManyCity: Array<CityModel>;
  /** 국가번호 목록 조회 */
  findManyCountryCode: Array<CountryCodeModel>;
  /** 마켓 시세 목록 조회 */
  findManyMarketPrice: FindManyMarketPriceOutput;
  /** 공지사항 목록 조회 */
  findManyNotice: FindManyNoticeOutput;
  /** 오퍼 목록 조회 (회원, 비회원) */
  findManyOffer: FindManyOfferOutput;
  /** 약관 목록 조회 */
  findManyPolicy: FindManyPolicyOutput;
  /** 회원 목록 조회 (관리자) */
  findManyUser: FindManyUserOutput;
  /** 문의 목록 조회 (관리자) */
  findManyUserInquiryByAdmin: FindManyUserInquiryByAdminOutput;
  /** 문의 목록 조회 (회원) */
  findManyUserInquiryByUser: FindManyUserInquiryByUserOutput;
  /** 내정보 조회 (관리자) */
  findMyInfoByAdmin: AdminModel;
  /** 내정보 조회 (회원) */
  findMyInfoByUser: FindMyInfoOutput;
  /** 공지사항 상세 조회 */
  findOneNotice: NoticeModel;
  /** 오퍼 상세 조회 (회원, 비회원) */
  findOneOffer: FindOneOfferOutput;
  /** 약관 상세 조회 */
  findOnePolicy: Scalars['Boolean'];
  /** 문의 상세 조회 (회원) */
  findOneUserInquiryByUser: UserInquiryModel;
  /** 비밀번호 찾기 */
  findPassword: Scalars['String'];
  /** 회원 정보 조회 (회원) */
  findUserInfoByUser: FindUserInfoByUserOutput;
  /** 이메일 인증번호 발송 (회원) */
  sendMailAuthNumber: Scalars['Boolean'];
  /** 휴대폰 인증번호 발송 (180초) */
  sendPhoneAuthNumber: Scalars['Boolean'];
  /** 로그인 (관리자) */
  signInByAdmin: TokenOutput;
  /** 로그인 (회원) */
  signInByUser: TokenOutput;
  /** 기존 비밀번호 유효성 검사 (회원) */
  verifyOriginPasswordByUser: Scalars['Boolean'];
};


export type QueryCheckDuplicateIdentityArgs = {
  identity: Scalars['String'];
};


export type QueryCheckRemainTimePhoneAuthNumberArgs = {
  phone: Scalars['String'];
};


export type QueryConfirmPhoneAuthNumberArgs = {
  authNumber: Scalars['String'];
  identity?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
};


export type QueryFindIdentityArgs = {
  hash: Scalars['String'];
  phone: Scalars['String'];
};


export type QueryFindManyChatMessageByUserArgs = {
  chatRoomId: Scalars['Int'];
  cursorId?: InputMaybe<Scalars['Int']>;
  direction?: ChatMessageDirection;
  take: Scalars['Int'];
};


export type QueryFindManyChatRoomByUserArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  offerId?: InputMaybe<Scalars['Int']>;
  take: Scalars['Int'];
};


export type QueryFindManyNoticeArgs = {
  searchKind?: InputMaybe<NoticeSearchKind>;
  searchText: Scalars['String'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindManyOfferArgs = {
  coinKind?: InputMaybe<CoinKind>;
  identity?: InputMaybe<Scalars['String']>;
  isChat?: InputMaybe<Scalars['Boolean']>;
  offerAction?: InputMaybe<OfferAction>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindManyPolicyArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  take: Scalars['Int'];
};


export type QueryFindManyUserArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  take: Scalars['Int'];
};


export type QueryFindManyUserInquiryByAdminArgs = {
  cursorId?: InputMaybe<Scalars['Int']>;
  searchText: Scalars['String'];
  take: Scalars['Int'];
};


export type QueryFindManyUserInquiryByUserArgs = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindOneNoticeArgs = {
  id: Scalars['Int'];
};


export type QueryFindOneOfferArgs = {
  id: Scalars['Int'];
};


export type QueryFindOnePolicyArgs = {
  id?: InputMaybe<Scalars['Int']>;
  policyKind?: InputMaybe<PolicyKind>;
};


export type QueryFindOneUserInquiryByUserArgs = {
  id: Scalars['Float'];
};


export type QueryFindPasswordArgs = {
  hash: Scalars['String'];
  identity: Scalars['String'];
  newPassword: Scalars['String'];
  phone: Scalars['String'];
};


export type QueryFindUserInfoByUserArgs = {
  identity: Scalars['String'];
};


export type QuerySendMailAuthNumberArgs = {
  email: Scalars['String'];
};


export type QuerySendPhoneAuthNumberArgs = {
  phone: Scalars['String'];
};


export type QuerySignInByAdminArgs = {
  code: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QuerySignInByUserArgs = {
  identity: Scalars['String'];
  password: Scalars['String'];
};


export type QueryVerifyOriginPasswordByUserArgs = {
  password: Scalars['String'];
};

/** 예약상태 */
export enum ReservationStatus {
  /** 기본값 */
  None = 'NONE',
  /** 진행중 */
  Progress = 'PROGRESS'
}

/** 권한명 */
export enum Role {
  /** 관리자 */
  Admin = 'ADMIN',
  /** 회원 */
  User = 'USER'
}

/** 채팅 메세지 구독/발행 (회원) output */
export type SubscribeChatMessageOutput = {
  /** 채팅 메세지 */
  chatMessage: ChatMessageModel;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

export type Subscription = {
  /** 채팅 메세지 구독 (회원) */
  subscribeChatMessage: SubscribeChatMessageOutput;
  /** 1:1문의 개수 구독 (관리자) */
  subscribeCountOfUserInquiry: Scalars['Int'];
};


export type SubscriptionSubscribeChatMessageArgs = {
  chatRoomId: Scalars['Int'];
};

/** 인증 토큰 output */
export type TokenOutput = {
  /** Access Token */
  accessToken: Scalars['String'];
  /** Refresh Token */
  refreshToken: Scalars['String'];
};

/** 거래방법 */
export enum TransactionMethod {
  /** 직접 */
  Direct = 'DIRECT'
}

/** 거래상태 */
export enum TransactionStatus {
  /** 완료 */
  Complete = 'COMPLETE',
  /** 진행중 */
  Progress = 'PROGRESS'
}

/** 1:1 문의 목록 조회 (관리자) output - 1:1 문의 */
export type UserInquiryInFindManyUserInquiryByAdminOutput = {
  /** 답변한 관리자 */
  admin?: Maybe<AdminModel>;
  /** 내용 */
  content: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 답변일 */
  repliedAt?: Maybe<Scalars['Date']>;
  /** 답변 */
  reply?: Maybe<Scalars['String']>;
  /** 제목 */
  title: Scalars['String'];
};

/** 1:1문의 */
export type UserInquiryModel = {
  /** 내용 */
  content: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** ID */
  id: Scalars['Int'];
  /** 답변일 */
  repliedAt?: Maybe<Scalars['Date']>;
  /** 답변 */
  reply?: Maybe<Scalars['String']>;
  /** 제목 */
  title: Scalars['String'];
};

/** 회원 */
export type UserModel = {
  /** 접속일 */
  connectionDate?: Maybe<Scalars['Date']>;
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 아이디 */
  identity: Scalars['String'];
  /** 레벨 */
  level: Scalars['Int'];
  /** 휴대폰 */
  phone?: Maybe<Scalars['String']>;
};

export type ConfirmEmailAuthNumberMutationVariables = Exact<{
  email: Scalars['String'];
  authNumber: Scalars['String'];
}>;


export type ConfirmEmailAuthNumberMutation = { confirmEmailAuthNumber: { id: number, email: string, createdAt: any } };

export type CreateChatMessageMutationVariables = Exact<{
  chatRoomId: Scalars['Int'];
  message: Scalars['String'];
}>;


export type CreateChatMessageMutation = { createChatMessage: { totalCount: number, chatMessage: { id: number, message: string, createdAt: any, sender: string } } };

export type CreateDriverLicenseMutationVariables = Exact<{
  name: Scalars['String'];
  birth: Scalars['String'];
  area: Scalars['String'];
  licenseNumber: Scalars['String'];
  serialNumber: Scalars['String'];
}>;


export type CreateDriverLicenseMutation = { createDriverLicense: { id: number, name: string, birth: string, area: string, licenseNumber: string, serialNumber: string } };

export type CreateIdCardMutationVariables = Exact<{
  name: Scalars['String'];
  registrationNumber: Scalars['String'];
  issueDate: Scalars['String'];
}>;


export type CreateIdCardMutation = { createIdCard: { id: number, name: string, registrationNumber: string, issueDate: string } };

export type CreateOfferByUserMutationVariables = Exact<{
  coinKind: CoinKind;
  offerAction: OfferAction;
  transactionMethod: TransactionMethod;
  cityId: Scalars['Int'];
  price: Scalars['Int'];
  minAmount: Scalars['Int'];
  maxAmount: Scalars['Int'];
  responseSpeed: Scalars['Int'];
  content: Scalars['String'];
}>;


export type CreateOfferByUserMutation = { createOfferByUser: { id: number, coinKind: CoinKind, offerAction: OfferAction, transactionMethod: TransactionMethod, price: number, minAmount: number, maxAmount: number, responseSpeed: number, content: string, createdAt: any, reservationStatus: ReservationStatus, transactionStatus: TransactionStatus } };

export type CreatePassportMutationVariables = Exact<{
  passportNumber: Scalars['String'];
  issueDate: Scalars['String'];
  expirationDate: Scalars['String'];
}>;


export type CreatePassportMutation = { createPassport: { id: number, passportNumber: string, issueDate: string, expirationDate: string } };

export type CreateUserInquiryByUserMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
}>;


export type CreateUserInquiryByUserMutation = { createUserInquiryByUser: { id: number, title: string, content: string, reply?: string | null, repliedAt?: any | null, createdAt: any } };

export type DeleteOfferByUserMutationVariables = Exact<{
  deleteOfferByUserId: Scalars['Int'];
}>;


export type DeleteOfferByUserMutation = { deleteOfferByUser: { id: number, coinKind: CoinKind, offerAction: OfferAction, transactionMethod: TransactionMethod, price: number, minAmount: number, maxAmount: number, responseSpeed: number, content: string, createdAt: any, reservationStatus: ReservationStatus, transactionStatus: TransactionStatus } };

export type DeleteUserInquiryMutationVariables = Exact<{
  deleteUserInquiryId: Scalars['Int'];
}>;


export type DeleteUserInquiryMutation = { deleteUserInquiry: boolean };

export type EnterChatRoomMutationVariables = Exact<{
  offerId: Scalars['Int'];
}>;


export type EnterChatRoomMutation = { enterChatRoom: { id: number, createdAt: any } };

export type RefreshByUserMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshByUserMutation = { refreshByUser: { accessToken: string, refreshToken: string } };

export type SignOutByUserMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutByUserMutation = { signOutByUser: boolean };

export type SignUpByUserMutationVariables = Exact<{
  identity: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  hash: Scalars['String'];
  loginKind: LoginKind;
}>;


export type SignUpByUserMutation = { signUpByUser: { identity: string, createdAt: any, level: number, connectionDate?: any | null, phone?: string | null } };

export type ToggleFeedbackByUserMutationVariables = Exact<{
  feedbackKind: FeedbackKind;
  receiverIdentity: Scalars['String'];
}>;


export type ToggleFeedbackByUserMutation = { toggleFeedbackByUser: { id: number, feedbackKind: FeedbackKind, createdAt: any } };

export type UpdateCheckedCurrentChatMessageByUserMutationVariables = Exact<{
  chatRoomId: Scalars['Int'];
  chatMessageId: Scalars['Int'];
}>;


export type UpdateCheckedCurrentChatMessageByUserMutation = { updateCheckedCurrentChatMessageByUser: { id: number, createdAt: any } };

export type UpdateOfferStatusByUserMutationVariables = Exact<{
  updateOfferStatusByUserId: Scalars['Int'];
}>;


export type UpdateOfferStatusByUserMutation = { updateOfferStatusByUser: { id: number, coinKind: CoinKind, offerAction: OfferAction, transactionMethod: TransactionMethod, price: number, minAmount: number, maxAmount: number, responseSpeed: number, content: string, createdAt: any, reservationStatus: ReservationStatus, transactionStatus: TransactionStatus } };

export type UpdatePasswordByUserMutationVariables = Exact<{
  originPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type UpdatePasswordByUserMutation = { updatePasswordByUser: { identity: string, createdAt: any, level: number, connectionDate?: any | null, phone?: string | null } };

export type UpdatePhoneNumberByUserMutationVariables = Exact<{
  hash: Scalars['String'];
  phone: Scalars['String'];
}>;


export type UpdatePhoneNumberByUserMutation = { updatePhoneNumberByUser: { identity: string, createdAt: any, level: number, connectionDate?: any | null, phone?: string | null } };

export type UpdateUserInquiryMutationVariables = Exact<{
  updateUserInquiryId: Scalars['Int'];
  title: Scalars['String'];
  content: Scalars['String'];
}>;


export type UpdateUserInquiryMutation = { updateUserInquiry: boolean };

export type WithdrawalUserMutationVariables = Exact<{ [key: string]: never; }>;


export type WithdrawalUserMutation = { withdrawalUser: boolean };

export type CheckDuplicateIdentityQueryVariables = Exact<{
  identity: Scalars['String'];
}>;


export type CheckDuplicateIdentityQuery = { checkDuplicateIdentity: boolean };

export type ConfirmPhoneAuthNumberQueryVariables = Exact<{
  phone: Scalars['String'];
  authNumber: Scalars['String'];
  identity?: InputMaybe<Scalars['String']>;
}>;


export type ConfirmPhoneAuthNumberQuery = { confirmPhoneAuthNumber: string };

export type FindIdentityQueryVariables = Exact<{
  hash: Scalars['String'];
  phone: Scalars['String'];
}>;


export type FindIdentityQuery = { findIdentity: string };

export type FindManyChatMessageByUserQueryVariables = Exact<{
  take: Scalars['Int'];
  chatRoomId: Scalars['Int'];
  cursorId?: InputMaybe<Scalars['Int']>;
  direction?: InputMaybe<ChatMessageDirection>;
}>;


export type FindManyChatMessageByUserQuery = { findManyChatMessageByUser: { totalCount: number, isEnd: boolean, chatMessages: Array<{ id: number, message: string, createdAt: any, sender: string, isUnread: boolean }> } };

export type FindManyChatRoomByUserQueryVariables = Exact<{
  take: Scalars['Int'];
}>;


export type FindManyChatRoomByUserQuery = { findManyChatRoomByUser: { totalCount: number, chatRooms: Array<{ id: number, createdAt: any, otherIdentity: string, offerId: number, isNewChatMessage: boolean, isUnread: boolean }> } };

export type FindManyCityQueryVariables = Exact<{ [key: string]: never; }>;


export type FindManyCityQuery = { findManyCity: Array<{ id: number, name: string }> };

export type FindManyMarketPriceQueryVariables = Exact<{ [key: string]: never; }>;


export type FindManyMarketPriceQuery = { findManyMarketPrice: { binance: Array<{ code: string, timestamp: string, openPrice: number, highPrice: number, lowPrice: number, closePrice: number, tradeTime: number, changePrice: number, changeRate: number }>, kimchi: Array<{ code: string, timestamp: string, openPrice: number, highPrice: number, lowPrice: number, closePrice: number, tradeTime: number, changePrice: number, changeRate: number }>, upbit: Array<{ code: string, timestamp: string, openPrice: number, highPrice: number, lowPrice: number, closePrice: number, tradeTime: number, changePrice: number, changeRate: number }> } };

export type FindManyNoticeQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
  searchText: Scalars['String'];
  searchKind?: InputMaybe<NoticeSearchKind>;
}>;


export type FindManyNoticeQuery = { findManyNotice: { totalCount: number, notices: Array<{ id: number, title: string, content: string, createdAt: any, hits: number }> } };

export type FindManyOfferQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
  coinKind?: InputMaybe<CoinKind>;
  offerAction?: InputMaybe<OfferAction>;
  identity?: InputMaybe<Scalars['String']>;
  isChat?: InputMaybe<Scalars['Boolean']>;
}>;


export type FindManyOfferQuery = { findManyOffer: { totalCount: number, offers: Array<{ id: number, coinKind: CoinKind, offerAction: OfferAction, transactionMethod: TransactionMethod, price: number, minAmount: number, maxAmount: number, responseSpeed: number, content: string, createdAt: any, reservationStatus: ReservationStatus, transactionStatus: TransactionStatus, identity: string, positiveCount: number, isNewChatMessage: boolean, connectionDate?: any | null, city: { id: number, name: string } }> } };

export type FindManyPolicyQueryVariables = Exact<{
  take: Scalars['Int'];
}>;


export type FindManyPolicyQuery = { findManyPolicy: { totalCount: number, policies: Array<{ id: number, policyKind: PolicyKind, title: string, content: string, createdAt: any, updatedAt: any }> } };

export type FindManyUserInquiryByUserQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type FindManyUserInquiryByUserQuery = { findManyUserInquiryByUser: { totalCount: number, userInquiries: Array<{ id: number, title: string, content: string, reply?: string | null, repliedAt?: any | null, createdAt: any }> } };

export type FindMyInfoByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindMyInfoByUserQuery = { findMyInfoByUser: { identity: string, createdAt: any, level: number, connectionDate?: any | null, phone?: string | null, positiveFeedbackCount: number, negativeFeedbackCount: number, emailAuth?: { id: number, email: string, createdAt: any } | null, idCard?: { id: number, name: string, registrationNumber: string, issueDate: string } | null, driverLicense?: { id: number, name: string, birth: string, area: string, licenseNumber: string, serialNumber: string } | null, passport?: { id: number, passportNumber: string, issueDate: string, expirationDate: string } | null } };

export type FindOneNoticeQueryVariables = Exact<{
  findOneNoticeId: Scalars['Int'];
}>;


export type FindOneNoticeQuery = { findOneNotice: { id: number, title: string, content: string, createdAt: any, hits: number } };

export type FindOneOfferQueryVariables = Exact<{
  findOneOfferId: Scalars['Int'];
}>;


export type FindOneOfferQuery = { findOneOffer: { id: number, coinKind: CoinKind, offerAction: OfferAction, transactionMethod: TransactionMethod, price: number, minAmount: number, maxAmount: number, responseSpeed: number, content: string, createdAt: any, reservationStatus: ReservationStatus, transactionStatus: TransactionStatus, identity: string, isNewChatMessage?: boolean | null, city: { id: number, name: string } } };

export type FindOnePolicyQueryVariables = Exact<{
  findOnePolicyId?: InputMaybe<Scalars['Int']>;
  policyKind?: InputMaybe<PolicyKind>;
}>;


export type FindOnePolicyQuery = { findOnePolicy: boolean };

export type FindOneUserInquiryByUserQueryVariables = Exact<{
  findOneUserInquiryByUserId: Scalars['Float'];
}>;


export type FindOneUserInquiryByUserQuery = { findOneUserInquiryByUser: { id: number, title: string, content: string, reply?: string | null, repliedAt?: any | null, createdAt: any } };

export type FindPasswordQueryVariables = Exact<{
  identity: Scalars['String'];
  hash: Scalars['String'];
  phone: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type FindPasswordQuery = { findPassword: string };

export type FindUserInfoByUserQueryVariables = Exact<{
  identity: Scalars['String'];
}>;


export type FindUserInfoByUserQuery = { findUserInfoByUser: { identity: string, level: number, connectionDate?: any | null, positiveFeedbackCount: number, negativeFeedbackCount: number } };

export type SendMailAuthNumberQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendMailAuthNumberQuery = { sendMailAuthNumber: boolean };

export type SendPhoneAuthNumberQueryVariables = Exact<{
  phone: Scalars['String'];
}>;


export type SendPhoneAuthNumberQuery = { sendPhoneAuthNumber: boolean };

export type SignInByUserQueryVariables = Exact<{
  identity: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInByUserQuery = { signInByUser: { accessToken: string, refreshToken: string } };

export type VerifyOriginPasswordByUserQueryVariables = Exact<{
  password: Scalars['String'];
}>;


export type VerifyOriginPasswordByUserQuery = { verifyOriginPasswordByUser: boolean };

export type SubscriptionSubscriptionVariables = Exact<{
  chatRoomId: Scalars['Int'];
}>;


export type SubscriptionSubscription = { subscribeChatMessage: { totalCount: number, chatMessage: { id: number, message: string, createdAt: any, sender: string } } };


export const ConfirmEmailAuthNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"confirmEmailAuthNumber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmEmailAuthNumber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"authNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ConfirmEmailAuthNumberMutation, ConfirmEmailAuthNumberMutationVariables>;
export const CreateChatMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createChatMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatRoomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChatMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatRoomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatRoomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<CreateChatMessageMutation, CreateChatMessageMutationVariables>;
export const CreateDriverLicenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createDriverLicense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"birth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"area"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"licenseNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serialNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDriverLicense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"birth"},"value":{"kind":"Variable","name":{"kind":"Name","value":"birth"}}},{"kind":"Argument","name":{"kind":"Name","value":"area"},"value":{"kind":"Variable","name":{"kind":"Name","value":"area"}}},{"kind":"Argument","name":{"kind":"Name","value":"licenseNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"licenseNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"serialNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serialNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"birth"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"licenseNumber"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}}]}}]}}]} as unknown as DocumentNode<CreateDriverLicenseMutation, CreateDriverLicenseMutationVariables>;
export const CreateIdCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createIdCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registrationNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"issueDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createIdCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"registrationNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registrationNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"issueDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"issueDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"registrationNumber"}},{"kind":"Field","name":{"kind":"Name","value":"issueDate"}}]}}]}}]} as unknown as DocumentNode<CreateIdCardMutation, CreateIdCardMutationVariables>;
export const CreateOfferByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createOfferByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"coinKind"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CoinKind"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offerAction"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfferAction"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transactionMethod"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionMethod"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cityId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"price"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minAmount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxAmount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"responseSpeed"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOfferByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"coinKind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"coinKind"}}},{"kind":"Argument","name":{"kind":"Name","value":"offerAction"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offerAction"}}},{"kind":"Argument","name":{"kind":"Name","value":"transactionMethod"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transactionMethod"}}},{"kind":"Argument","name":{"kind":"Name","value":"cityId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cityId"}}},{"kind":"Argument","name":{"kind":"Name","value":"price"},"value":{"kind":"Variable","name":{"kind":"Name","value":"price"}}},{"kind":"Argument","name":{"kind":"Name","value":"minAmount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minAmount"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxAmount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxAmount"}}},{"kind":"Argument","name":{"kind":"Name","value":"responseSpeed"},"value":{"kind":"Variable","name":{"kind":"Name","value":"responseSpeed"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coinKind"}},{"kind":"Field","name":{"kind":"Name","value":"offerAction"}},{"kind":"Field","name":{"kind":"Name","value":"transactionMethod"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"minAmount"}},{"kind":"Field","name":{"kind":"Name","value":"maxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"responseSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"reservationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"transactionStatus"}}]}}]}}]} as unknown as DocumentNode<CreateOfferByUserMutation, CreateOfferByUserMutationVariables>;
export const CreatePassportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPassport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passportNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"issueDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expirationDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPassport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"passportNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passportNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"issueDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"issueDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"expirationDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expirationDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"passportNumber"}},{"kind":"Field","name":{"kind":"Name","value":"issueDate"}},{"kind":"Field","name":{"kind":"Name","value":"expirationDate"}}]}}]}}]} as unknown as DocumentNode<CreatePassportMutation, CreatePassportMutationVariables>;
export const CreateUserInquiryByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUserInquiryByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserInquiryByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"reply"}},{"kind":"Field","name":{"kind":"Name","value":"repliedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateUserInquiryByUserMutation, CreateUserInquiryByUserMutationVariables>;
export const DeleteOfferByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteOfferByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteOfferByUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOfferByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteOfferByUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coinKind"}},{"kind":"Field","name":{"kind":"Name","value":"offerAction"}},{"kind":"Field","name":{"kind":"Name","value":"transactionMethod"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"minAmount"}},{"kind":"Field","name":{"kind":"Name","value":"maxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"responseSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"reservationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"transactionStatus"}}]}}]}}]} as unknown as DocumentNode<DeleteOfferByUserMutation, DeleteOfferByUserMutationVariables>;
export const DeleteUserInquiryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteUserInquiry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteUserInquiryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUserInquiry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteUserInquiryId"}}}]}]}}]} as unknown as DocumentNode<DeleteUserInquiryMutation, DeleteUserInquiryMutationVariables>;
export const EnterChatRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"enterChatRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enterChatRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<EnterChatRoomMutation, EnterChatRoomMutationVariables>;
export const RefreshByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshByUserMutation, RefreshByUserMutationVariables>;
export const SignOutByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signOutByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signOutByUser"}}]}}]} as unknown as DocumentNode<SignOutByUserMutation, SignOutByUserMutationVariables>;
export const SignUpByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signUpByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginKind"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginKind"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUpByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identity"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"hash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}},{"kind":"Argument","name":{"kind":"Name","value":"loginKind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginKind"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDate"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<SignUpByUserMutation, SignUpByUserMutationVariables>;
export const ToggleFeedbackByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"toggleFeedbackByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"feedbackKind"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FeedbackKind"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverIdentity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleFeedbackByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"feedbackKind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"feedbackKind"}}},{"kind":"Argument","name":{"kind":"Name","value":"receiverIdentity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverIdentity"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"feedbackKind"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ToggleFeedbackByUserMutation, ToggleFeedbackByUserMutationVariables>;
export const UpdateCheckedCurrentChatMessageByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCheckedCurrentChatMessageByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatRoomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatMessageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCheckedCurrentChatMessageByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatRoomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatRoomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"chatMessageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatMessageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCheckedCurrentChatMessageByUserMutation, UpdateCheckedCurrentChatMessageByUserMutationVariables>;
export const UpdateOfferStatusByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateOfferStatusByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateOfferStatusByUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOfferStatusByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateOfferStatusByUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coinKind"}},{"kind":"Field","name":{"kind":"Name","value":"offerAction"}},{"kind":"Field","name":{"kind":"Name","value":"transactionMethod"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"minAmount"}},{"kind":"Field","name":{"kind":"Name","value":"maxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"responseSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"reservationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"transactionStatus"}}]}}]}}]} as unknown as DocumentNode<UpdateOfferStatusByUserMutation, UpdateOfferStatusByUserMutationVariables>;
export const UpdatePasswordByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePasswordByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"originPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePasswordByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"originPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"originPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDate"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<UpdatePasswordByUserMutation, UpdatePasswordByUserMutationVariables>;
export const UpdatePhoneNumberByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePhoneNumberByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePhoneNumberByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDate"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<UpdatePhoneNumberByUserMutation, UpdatePhoneNumberByUserMutationVariables>;
export const UpdateUserInquiryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUserInquiry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInquiryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserInquiry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInquiryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]} as unknown as DocumentNode<UpdateUserInquiryMutation, UpdateUserInquiryMutationVariables>;
export const WithdrawalUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawalUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawalUser"}}]}}]} as unknown as DocumentNode<WithdrawalUserMutation, WithdrawalUserMutationVariables>;
export const CheckDuplicateIdentityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"checkDuplicateIdentity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkDuplicateIdentity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identity"}}}]}]}}]} as unknown as DocumentNode<CheckDuplicateIdentityQuery, CheckDuplicateIdentityQueryVariables>;
export const ConfirmPhoneAuthNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"confirmPhoneAuthNumber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identity"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmPhoneAuthNumber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"authNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"identity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identity"}}}]}]}}]} as unknown as DocumentNode<ConfirmPhoneAuthNumberQuery, ConfirmPhoneAuthNumberQueryVariables>;
export const FindIdentityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findIdentity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findIdentity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}]}]}}]} as unknown as DocumentNode<FindIdentityQuery, FindIdentityQueryVariables>;
export const FindManyChatMessageByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyChatMessageByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatRoomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"direction"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMessageDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyChatMessageByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"chatRoomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatRoomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"direction"},"value":{"kind":"Variable","name":{"kind":"Name","value":"direction"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"chatMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"isUnread"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isEnd"}}]}}]}}]} as unknown as DocumentNode<FindManyChatMessageByUserQuery, FindManyChatMessageByUserQueryVariables>;
export const FindManyChatRoomByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyChatRoomByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyChatRoomByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"chatRooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"otherIdentity"}},{"kind":"Field","name":{"kind":"Name","value":"offerId"}},{"kind":"Field","name":{"kind":"Name","value":"isNewChatMessage"}},{"kind":"Field","name":{"kind":"Name","value":"isUnread"}}]}}]}}]}}]} as unknown as DocumentNode<FindManyChatRoomByUserQuery, FindManyChatRoomByUserQueryVariables>;
export const FindManyCityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyCity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyCity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<FindManyCityQuery, FindManyCityQueryVariables>;
export const FindManyMarketPriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyMarketPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyMarketPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"binance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"openPrice"}},{"kind":"Field","name":{"kind":"Name","value":"highPrice"}},{"kind":"Field","name":{"kind":"Name","value":"lowPrice"}},{"kind":"Field","name":{"kind":"Name","value":"closePrice"}},{"kind":"Field","name":{"kind":"Name","value":"tradeTime"}},{"kind":"Field","name":{"kind":"Name","value":"changePrice"}},{"kind":"Field","name":{"kind":"Name","value":"changeRate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kimchi"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"openPrice"}},{"kind":"Field","name":{"kind":"Name","value":"highPrice"}},{"kind":"Field","name":{"kind":"Name","value":"lowPrice"}},{"kind":"Field","name":{"kind":"Name","value":"closePrice"}},{"kind":"Field","name":{"kind":"Name","value":"tradeTime"}},{"kind":"Field","name":{"kind":"Name","value":"changePrice"}},{"kind":"Field","name":{"kind":"Name","value":"changeRate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"upbit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"openPrice"}},{"kind":"Field","name":{"kind":"Name","value":"highPrice"}},{"kind":"Field","name":{"kind":"Name","value":"lowPrice"}},{"kind":"Field","name":{"kind":"Name","value":"closePrice"}},{"kind":"Field","name":{"kind":"Name","value":"tradeTime"}},{"kind":"Field","name":{"kind":"Name","value":"changePrice"}},{"kind":"Field","name":{"kind":"Name","value":"changeRate"}}]}}]}}]}}]} as unknown as DocumentNode<FindManyMarketPriceQuery, FindManyMarketPriceQueryVariables>;
export const FindManyNoticeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyNotice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchKind"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NoticeSearchKind"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyNotice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchKind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchKind"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"notices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}}]}}]}}]}}]} as unknown as DocumentNode<FindManyNoticeQuery, FindManyNoticeQueryVariables>;
export const FindManyOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"coinKind"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CoinKind"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offerAction"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OfferAction"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identity"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isChat"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"coinKind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"coinKind"}}},{"kind":"Argument","name":{"kind":"Name","value":"offerAction"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offerAction"}}},{"kind":"Argument","name":{"kind":"Name","value":"identity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identity"}}},{"kind":"Argument","name":{"kind":"Name","value":"isChat"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isChat"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coinKind"}},{"kind":"Field","name":{"kind":"Name","value":"offerAction"}},{"kind":"Field","name":{"kind":"Name","value":"transactionMethod"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"minAmount"}},{"kind":"Field","name":{"kind":"Name","value":"maxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"responseSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"reservationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"transactionStatus"}},{"kind":"Field","name":{"kind":"Name","value":"city"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"identity"}},{"kind":"Field","name":{"kind":"Name","value":"positiveCount"}},{"kind":"Field","name":{"kind":"Name","value":"isNewChatMessage"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<FindManyOfferQuery, FindManyOfferQueryVariables>;
export const FindManyPolicyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyPolicy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyPolicy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"policies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"policyKind"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<FindManyPolicyQuery, FindManyPolicyQueryVariables>;
export const FindManyUserInquiryByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyUserInquiryByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyUserInquiryByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"userInquiries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"reply"}},{"kind":"Field","name":{"kind":"Name","value":"repliedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<FindManyUserInquiryByUserQuery, FindManyUserInquiryByUserQueryVariables>;
export const FindMyInfoByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findMyInfoByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findMyInfoByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDate"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"emailAuth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"idCard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"registrationNumber"}},{"kind":"Field","name":{"kind":"Name","value":"issueDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"driverLicense"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"birth"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"licenseNumber"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"passportNumber"}},{"kind":"Field","name":{"kind":"Name","value":"issueDate"}},{"kind":"Field","name":{"kind":"Name","value":"expirationDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positiveFeedbackCount"}},{"kind":"Field","name":{"kind":"Name","value":"negativeFeedbackCount"}}]}}]}}]} as unknown as DocumentNode<FindMyInfoByUserQuery, FindMyInfoByUserQueryVariables>;
export const FindOneNoticeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findOneNotice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findOneNoticeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneNotice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findOneNoticeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}}]}}]}}]} as unknown as DocumentNode<FindOneNoticeQuery, FindOneNoticeQueryVariables>;
export const FindOneOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findOneOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findOneOfferId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findOneOfferId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coinKind"}},{"kind":"Field","name":{"kind":"Name","value":"offerAction"}},{"kind":"Field","name":{"kind":"Name","value":"transactionMethod"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"minAmount"}},{"kind":"Field","name":{"kind":"Name","value":"maxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"responseSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"reservationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"transactionStatus"}},{"kind":"Field","name":{"kind":"Name","value":"city"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"identity"}},{"kind":"Field","name":{"kind":"Name","value":"isNewChatMessage"}}]}}]}}]} as unknown as DocumentNode<FindOneOfferQuery, FindOneOfferQueryVariables>;
export const FindOnePolicyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findOnePolicy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findOnePolicyId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"policyKind"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PolicyKind"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOnePolicy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findOnePolicyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"policyKind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"policyKind"}}}]}]}}]} as unknown as DocumentNode<FindOnePolicyQuery, FindOnePolicyQueryVariables>;
export const FindOneUserInquiryByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findOneUserInquiryByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findOneUserInquiryByUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneUserInquiryByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findOneUserInquiryByUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"reply"}},{"kind":"Field","name":{"kind":"Name","value":"repliedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<FindOneUserInquiryByUserQuery, FindOneUserInquiryByUserQueryVariables>;
export const FindPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identity"}}},{"kind":"Argument","name":{"kind":"Name","value":"hash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}]}}]} as unknown as DocumentNode<FindPasswordQuery, FindPasswordQueryVariables>;
export const FindUserInfoByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findUserInfoByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUserInfoByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identity"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identity"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDate"}},{"kind":"Field","name":{"kind":"Name","value":"positiveFeedbackCount"}},{"kind":"Field","name":{"kind":"Name","value":"negativeFeedbackCount"}}]}}]}}]} as unknown as DocumentNode<FindUserInfoByUserQuery, FindUserInfoByUserQueryVariables>;
export const SendMailAuthNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"sendMailAuthNumber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMailAuthNumber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<SendMailAuthNumberQuery, SendMailAuthNumberQueryVariables>;
export const SendPhoneAuthNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"sendPhoneAuthNumber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendPhoneAuthNumber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}]}]}}]} as unknown as DocumentNode<SendPhoneAuthNumberQuery, SendPhoneAuthNumberQueryVariables>;
export const SignInByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"signInByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signInByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identity"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<SignInByUserQuery, SignInByUserQueryVariables>;
export const VerifyOriginPasswordByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"verifyOriginPasswordByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOriginPasswordByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<VerifyOriginPasswordByUserQuery, VerifyOriginPasswordByUserQueryVariables>;
export const SubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"Subscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatRoomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscribeChatMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatRoomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatRoomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<SubscriptionSubscription, SubscriptionSubscriptionVariables>;