/* eslint-disable */
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
