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
  /** BigInt custom scalar type */
  BigInt: any;
  /** Date custom scalar type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

/** 관리자 목록 조회 (관리자) output - 관리자 */
export type AdminByFindManyAdminOutput = {
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 이메일 */
  email: Scalars['String'];
  /** QR 등록 여부 */
  isQr: Scalars['Boolean'];
  /** 권한명 */
  role: Role;
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

/** 배너 */
export type BannerModel = {
  /** 화살표 색상 */
  arrowColor: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 점 색상 */
  dotColor: Scalars['String'];
  /** 파일명 */
  fileName: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 순서 */
  index: Scalars['Int'];
};

/** 바이낸스 마켓 */
export type BinanceMarketModel = {
  /** 코인 코드 */
  code: Scalars['String'];
  /** 원화 가격 */
  krwPrice: Scalars['Float'];
  /** 타임스탬프 */
  timestamp: Scalars['String'];
  /** 달러 가격 */
  usdPrice: Scalars['Float'];
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
  /** 국기 */
  emoji: Scalars['String'];
  /** 국가 이름 */
  name: Scalars['String'];
  /** 국가 네이티브 이름 */
  native: Scalars['String'];
  /** 국가번호 */
  phone: Scalars['String'];
};

/** OTP QR코드 생성 output */
export type CreateOtpQrOutput = {
  /** OTP Secret */
  otpSecret: Scalars['String'];
  /** URL */
  url: Scalars['String'];
};

/** 행정구 */
export type DistrictModel = {
  /** ID */
  id: Scalars['Int'];
  /** 행정구명 */
  name: Scalars['String'];
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

/** 관리자 목록 조회 (관리자) output */
export type FindManyAdminOutput = {
  /** 문의 목록 */
  admins: Array<AdminByFindManyAdminOutput>;
  /** 총 개수 */
  totalCount: Scalars['Int'];
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

/** 지역 목록 조회 output */
export type FindManyCityOutput = {
  /** 행정구 */
  districts: Array<DistrictModel>;
  /** ID */
  id: Scalars['Int'];
  /** 지역명 */
  name: Scalars['String'];
};

/** 공지사항 목록 조회 output */
export type FindManyNoticeOutput = {
  /** 공지사항 목록 */
  notices: Array<NoticeInFindManyNoticeOutput>;
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
  users: Array<UserByFindManyUserOutput>;
};

/** 내정보 조회 */
export type FindMyInfoOutput = {
  /** 접속일 */
  connectionDate?: Maybe<Scalars['Date']>;
  /** 국가코드 */
  countryCode: Scalars['String'];
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
  /** 거래 성사량 개수 */
  offerCompleteCount: Scalars['Int'];
  /** 여권 인증 */
  passport?: Maybe<PassportModel>;
  /** 휴대폰 */
  phone: Scalars['String'];
  /** 긍정적 피드백 개수 */
  positiveFeedbackCount: Scalars['Int'];
  /** 지갑주소 */
  walletAddress?: Maybe<Scalars['String']>;
  /** 지갑주소 종류 */
  walletAddressKind?: Maybe<WalletAddressKind>;
};

/** 오퍼 상세 조회 (회원, 비회원) output */
export type FindOneOfferOutput = {
  /** 지역 */
  city: CityModel;
  /** 암호화폐 종류 */
  coinKind: CoinKind;
  /** 접속일 */
  connectionDate?: Maybe<Scalars['Date']>;
  /** 오퍼 조건 */
  content?: Maybe<Scalars['String']>;
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 행정구 */
  district?: Maybe<DistrictModel>;
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
  /** 거래 성사량 개수 */
  offerCompleteCount: Scalars['Int'];
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
  /** 지갑주소 */
  walletAddress: Scalars['String'];
  /** 지갑주소 종류 */
  walletAddressKind: WalletAddressKind;
};

/** 회원 정보 조회 (회원) */
export type FindUserInfoByUserOutput = {
  /** 접속일 */
  connectionDate?: Maybe<Scalars['Date']>;
  /** 국가코드 */
  countryCode: Scalars['String'];
  /** 아이디 */
  identity: Scalars['String'];
  /** 레벨 */
  level: Scalars['Int'];
  /** 부정적 피드백 개수 */
  negativeFeedbackCount: Scalars['Int'];
  /** 거래 성사량 개수 */
  offerCompleteCount: Scalars['Int'];
  /** 긍정적 피드백 개수 */
  positiveFeedbackCount: Scalars['Int'];
  /** 지갑주소 */
  walletAddress?: Maybe<Scalars['String']>;
  /** 지갑주소 종류 */
  walletAddressKind?: Maybe<WalletAddressKind>;
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

/** 김치 프리미엄 마켓 */
export type KimchiMarketModel = {
  /** 변화 금액 */
  changePrice: Scalars['Float'];
  /** 변화율 */
  changeRate: Scalars['Float'];
  /** 코인 코드 */
  code: Scalars['String'];
  /** 타임스탬프 */
  timestamp: Scalars['String'];
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
  /** 바이낸스 마켓 */
  binanceMarkets: Array<BinanceMarketModel>;
  /** 김치 프리미엄 마켓 */
  kimchiMarkets: Array<KimchiMarketModel>;
  /** 업비트 마켓 */
  upbitMarkets: Array<UpbitMarketModel>;
  /** 1 USD 가격 */
  usd: UsdModel;
  /** 1 USDT 가격 */
  usdt: UsdtModel;
};

export type Mutation = {
  /** 이메일 인증번호 확인 (회원) */
  confirmEmailAuthNumber: EmailAuthModel;
  /** 배너 생성 (관리자) */
  createBanner: BannerModel;
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
  /** 약관 생성 (관리자) */
  createPolicy: Scalars['Boolean'];
  /** 문의 생성 (회원) */
  createUserInquiryByUser: UserInquiryModel;
  /** 관리자 삭제 (관리자) */
  deleteAdmin: AdminModel;
  /** 배너 삭제 (관리자) */
  deleteBanner: BannerModel;
  /** 공지사항 삭제 (관리자) */
  deleteNotice: NoticeModel;
  /** 오퍼 삭제 (회원) */
  deleteOfferByUser: OfferModel;
  /** 약관 삭제 (관리자) */
  deletePolicy: PolicyModel;
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
  /** 배너 수정 (관리자) */
  updateBanner: BannerModel;
  /** 확인한 최근 메세지 업데이트 (회원) */
  updateCheckedCurrentChatMessageByUser: CheckedCurrentChatMessageModel;
  /** 공지사항 수정 (관리자) */
  updateNotice: NoticeModel;
  /** 비밀번호 변경 (회원) */
  updatePasswordByUser: UserModel;
  /** 휴대폰 번호 변경 */
  updatePhoneNumberByUser: UserModel;
  /** 약관 수정 (관리자) */
  updatePolicy: Scalars['Boolean'];
  /** 오퍼 예약상태 변경 (회원) */
  updateReservationStatusByUser: OfferModel;
  /** 오퍼 거래상태 변경 (회원) */
  updateTransactionStatusByUser: OfferModel;
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


export type MutationCreateBannerArgs = {
  arrowColor: Scalars['String'];
  dotColor: Scalars['String'];
  file: Scalars['Upload'];
  index: Scalars['Int'];
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
  content?: InputMaybe<Scalars['String']>;
  districtId?: InputMaybe<Scalars['Int']>;
  isUseNextTime: Scalars['Boolean'];
  maxAmount: Scalars['Int'];
  minAmount: Scalars['Int'];
  offerAction: OfferAction;
  price: Scalars['Int'];
  responseSpeed: Scalars['Int'];
  transactionMethod: TransactionMethod;
  walletAddress: Scalars['String'];
  walletAddressKind: WalletAddressKind;
};


export type MutationCreateOtpQrArgs = {
  email: Scalars['String'];
};


export type MutationCreatePassportArgs = {
  birth: Scalars['String'];
  expirationDate: Scalars['String'];
  issueDate: Scalars['String'];
  name: Scalars['String'];
  passportNumber: Scalars['String'];
};


export type MutationCreatePolicyArgs = {
  content: Scalars['String'];
  policyKind: PolicyKind;
  title: Scalars['String'];
};


export type MutationCreateUserInquiryByUserArgs = {
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteAdminArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteBannerArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteNoticeArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteOfferByUserArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePolicyArgs = {
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
  countryCode: Scalars['String'];
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


export type MutationUpdateBannerArgs = {
  arrowColor?: InputMaybe<Scalars['String']>;
  dotColor?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  index?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateCheckedCurrentChatMessageByUserArgs = {
  chatMessageId: Scalars['Int'];
  chatRoomId: Scalars['Int'];
};


export type MutationUpdateNoticeArgs = {
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdatePasswordByUserArgs = {
  newPassword: Scalars['String'];
  originPassword: Scalars['String'];
};


export type MutationUpdatePhoneNumberByUserArgs = {
  countryCode: Scalars['String'];
  hash: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationUpdatePolicyArgs = {
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateReservationStatusByUserArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateTransactionStatusByUserArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateUserInquiryArgs = {
  content: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationUploadPolicyFileArgs = {
  file: Scalars['Upload'];
};

/** 공지사항 목록 조회 output - 공지사항 */
export type NoticeInFindManyNoticeOutput = {
  /** 작성한 관리자 */
  admin?: Maybe<AdminModel>;
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
  content?: Maybe<Scalars['String']>;
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 행정구 */
  district?: Maybe<DistrictModel>;
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
  /** 거래 성사량 개수 */
  offerCompleteCount: Scalars['Int'];
  /** 긍정 피드백 수 */
  positiveFeedbackCount: Scalars['Int'];
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
  /** 지갑주소 */
  walletAddress: Scalars['String'];
  /** 지갑주소 종류 */
  walletAddressKind: WalletAddressKind;
};

/** 오퍼 */
export type OfferModel = {
  /** 암호화폐 종류 */
  coinKind: CoinKind;
  /** 오퍼 조건 */
  content?: Maybe<Scalars['String']>;
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
  /** 지갑주소 */
  walletAddress: Scalars['String'];
  /** 지갑주소 종류 */
  walletAddressKind: WalletAddressKind;
};

/** 여권 */
export type PassportModel = {
  /** 생년월일 */
  birth: Scalars['String'];
  /** 만료일 */
  expirationDate: Scalars['String'];
  /** ID */
  id: Scalars['Int'];
  /** 발급일 */
  issueDate: Scalars['String'];
  /** 이름 */
  name: Scalars['String'];
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
  /** 관리자 목록 조회 (관리자) */
  findManyAdmin: FindManyAdminOutput;
  /** 배너 목록 조회 */
  findManyBanner: Array<BannerModel>;
  /** 채팅 메세지 목록 조회 (회원) */
  findManyChatMessageByUser: FindManyChatMessageByUserOutput;
  /** 참가한 채팅방 목록 조회 (회원) */
  findManyChatRoomByUser: FindManyChatRoomByUserOutput;
  /** 도시 목록 조회 */
  findManyCity: Array<FindManyCityOutput>;
  /** 국가번호 목록 조회 */
  findManyCountryCode: Array<CountryCodeModel>;
  /** 마켓 시세 목록 조회 */
  findManyMarketPrice: MarketPriceModel;
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
  findOnePolicy: PolicyModel;
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
  countryCode: Scalars['String'];
  phone: Scalars['String'];
};


export type QueryConfirmPhoneAuthNumberArgs = {
  authNumber: Scalars['String'];
  countryCode: Scalars['String'];
  identity?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
};


export type QueryFindIdentityArgs = {
  countryCode: Scalars['String'];
  hash: Scalars['String'];
  phone: Scalars['String'];
};


export type QueryFindManyAdminArgs = {
  searchText: Scalars['String'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
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
  searchText?: InputMaybe<Scalars['String']>;
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
  searchText: Scalars['String'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindManyUserArgs = {
  searchText: Scalars['String'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryFindManyUserInquiryByAdminArgs = {
  searchText: Scalars['String'];
  skip: Scalars['Int'];
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
  countryCode: Scalars['String'];
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

/** 업비트 마켓 */
export type UpbitMarketModel = {
  /** 코인 코드 */
  code: Scalars['String'];
  /** 원화 가격 */
  krwPrice: Scalars['Float'];
  /** 타임스탬프 */
  timestamp: Scalars['String'];
  /** 달러 가격 */
  usdPrice: Scalars['Float'];
};

/** 1 USD 가격 */
export type UsdModel = {
  /** 변화율 */
  changeRate: Scalars['Float'];
  /** 원화 가격 */
  krwPrice: Scalars['Float'];
  /** 타임스탬프 */
  timestamp: Scalars['String'];
  /** 달러 가격 */
  usdPrice: Scalars['Float'];
};

/** 1 USDT 가격 */
export type UsdtModel = {
  /** 변화율 */
  changeRate: Scalars['Float'];
  /** 원화 가격 */
  krwPrice: Scalars['Float'];
  /** 타임스탬프 */
  timestamp: Scalars['String'];
  /** 달러 가격 */
  usdPrice: Scalars['Float'];
};

/** 회원 목록 조회 output - 회원 */
export type UserByFindManyUserOutput = {
  /** 접속일 */
  connectionDate?: Maybe<Scalars['Date']>;
  /** 국가코드 */
  countryCode: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 이메일 인증 */
  emailAuth?: Maybe<EmailAuthModel>;
  /** 아이디 */
  identity: Scalars['String'];
  /** 레벨 */
  level: Scalars['Int'];
  /** 휴대폰 */
  phone: Scalars['String'];
  /** 지갑주소 */
  walletAddress?: Maybe<Scalars['String']>;
  /** 지갑주소 종류 */
  walletAddressKind?: Maybe<WalletAddressKind>;
};

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
  /** 회원 아이디 */
  userIdentity: Scalars['String'];
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
  /** 국가코드 */
  countryCode: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['Date'];
  /** 아이디 */
  identity: Scalars['String'];
  /** 레벨 */
  level: Scalars['Int'];
  /** 휴대폰 */
  phone: Scalars['String'];
  /** 지갑주소 */
  walletAddress?: Maybe<Scalars['String']>;
  /** 지갑주소 종류 */
  walletAddressKind?: Maybe<WalletAddressKind>;
};

/** 지갑주소 종류 */
export enum WalletAddressKind {
  /** 아임토큰 */
  ImToken = 'IM_TOKEN',
  /** 메타마스크 */
  MetaMask = 'META_MASK'
}

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

export type MutationMutationVariables = Exact<{
  coinKind: CoinKind;
  offerAction: OfferAction;
  transactionMethod: TransactionMethod;
  cityId: Scalars['Int'];
  price: Scalars['Int'];
  minAmount: Scalars['Int'];
  maxAmount: Scalars['Int'];
  responseSpeed: Scalars['Int'];
  isUseNextTime: Scalars['Boolean'];
  walletAddressKind: WalletAddressKind;
  walletAddress: Scalars['String'];
  districtId?: InputMaybe<Scalars['Int']>;
  content?: InputMaybe<Scalars['String']>;
}>;


export type MutationMutation = { createOfferByUser: { id: number, coinKind: CoinKind, offerAction: OfferAction, transactionMethod: TransactionMethod, price: number, minAmount: number, maxAmount: number, responseSpeed: number, content?: string | null, createdAt: any, walletAddressKind: WalletAddressKind, walletAddress: string, reservationStatus: ReservationStatus, transactionStatus: TransactionStatus } };

export type CreatePassportMutationVariables = Exact<{
  name: Scalars['String'];
  passportNumber: Scalars['String'];
  issueDate: Scalars['String'];
  expirationDate: Scalars['String'];
  birth: Scalars['String'];
}>;


export type CreatePassportMutation = { createPassport: { id: number, name: string, passportNumber: string, issueDate: string, expirationDate: string, birth: string } };

export type CreateUserInquiryByUserMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
}>;


export type CreateUserInquiryByUserMutation = { createUserInquiryByUser: { id: number, title: string, content: string, reply?: string | null, repliedAt?: any | null, createdAt: any } };

export type DeleteOfferByUserMutationVariables = Exact<{
  deleteOfferByUserId: Scalars['Int'];
}>;


export type DeleteOfferByUserMutation = { deleteOfferByUser: { id: number, coinKind: CoinKind, offerAction: OfferAction, transactionMethod: TransactionMethod, price: number, minAmount: number, maxAmount: number, responseSpeed: number, content?: string | null, createdAt: any, walletAddressKind: WalletAddressKind, walletAddress: string, reservationStatus: ReservationStatus, transactionStatus: TransactionStatus } };

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
  countryCode: Scalars['String'];
  loginKind: LoginKind;
}>;


export type SignUpByUserMutation = { signUpByUser: { identity: string, createdAt: any, walletAddress?: string | null, level: number, connectionDate?: any | null, countryCode: string, phone: string } };

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

export type UpdatePasswordByUserMutationVariables = Exact<{
  originPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type UpdatePasswordByUserMutation = { updatePasswordByUser: { identity: string, createdAt: any, level: number, connectionDate?: any | null, phone: string } };

export type UpdatePhoneNumberByUserMutationVariables = Exact<{
  hash: Scalars['String'];
  countryCode: Scalars['String'];
  phone: Scalars['String'];
}>;


export type UpdatePhoneNumberByUserMutation = { updatePhoneNumberByUser: { identity: string, createdAt: any, walletAddress?: string | null, level: number, connectionDate?: any | null, countryCode: string, phone: string } };

export type UpdateReservationStatusByUserMutationVariables = Exact<{
  updateReservationStatusByUserId: Scalars['Int'];
}>;


export type UpdateReservationStatusByUserMutation = { updateReservationStatusByUser: { id: number, coinKind: CoinKind, offerAction: OfferAction, transactionMethod: TransactionMethod, price: number, minAmount: number, maxAmount: number, responseSpeed: number, content?: string | null, createdAt: any, reservationStatus: ReservationStatus, transactionStatus: TransactionStatus } };

export type UpdateTransactionStatusByUserMutationVariables = Exact<{
  updateTransactionStatusByUserId: Scalars['Int'];
}>;


export type UpdateTransactionStatusByUserMutation = { updateTransactionStatusByUser: { id: number, coinKind: CoinKind, offerAction: OfferAction, transactionMethod: TransactionMethod, price: number, minAmount: number, maxAmount: number, responseSpeed: number, content?: string | null, createdAt: any, reservationStatus: ReservationStatus, transactionStatus: TransactionStatus } };

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
  countryCode: Scalars['String'];
  phone: Scalars['String'];
  authNumber: Scalars['String'];
  identity?: InputMaybe<Scalars['String']>;
}>;


export type ConfirmPhoneAuthNumberQuery = { confirmPhoneAuthNumber: string };

export type FindIdentityQueryVariables = Exact<{
  hash: Scalars['String'];
  countryCode: Scalars['String'];
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
  cursorId?: InputMaybe<Scalars['Int']>;
  offerId?: InputMaybe<Scalars['Int']>;
}>;


export type FindManyChatRoomByUserQuery = { findManyChatRoomByUser: { totalCount: number, chatRooms: Array<{ id: number, createdAt: any, otherIdentity: string, offerId: number, isNewChatMessage: boolean, isUnread: boolean }> } };

export type FindManyCityQueryVariables = Exact<{ [key: string]: never; }>;


export type FindManyCityQuery = { findManyCity: Array<{ id: number, name: string, districts: Array<{ id: number, name: string }> }> };

export type FindManyCountryCodeQueryVariables = Exact<{ [key: string]: never; }>;


export type FindManyCountryCodeQuery = { findManyCountryCode: Array<{ name: string, native: string, phone: string, emoji: string }> };

export type FindManyMarketPriceQueryVariables = Exact<{ [key: string]: never; }>;


export type FindManyMarketPriceQuery = { findManyMarketPrice: { usdt: { timestamp: string, krwPrice: number, usdPrice: number, changeRate: number }, usd: { timestamp: string, krwPrice: number, usdPrice: number, changeRate: number }, upbitMarkets: Array<{ code: string, timestamp: string, krwPrice: number, usdPrice: number }>, binanceMarkets: Array<{ code: string, timestamp: string, krwPrice: number, usdPrice: number }>, kimchiMarkets: Array<{ code: string, timestamp: string, changePrice: number, changeRate: number }> } };

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


export type FindManyOfferQuery = { findManyOffer: { totalCount: number, offers: Array<{ id: number, coinKind: CoinKind, offerAction: OfferAction, transactionMethod: TransactionMethod, price: number, minAmount: number, maxAmount: number, responseSpeed: number, content?: string | null, createdAt: any, walletAddressKind: WalletAddressKind, walletAddress: string, reservationStatus: ReservationStatus, transactionStatus: TransactionStatus, identity: string, positiveFeedbackCount: number, offerCompleteCount: number, isNewChatMessage: boolean, connectionDate?: any | null, city: { id: number, name: string }, district?: { id: number, name: string } | null }> } };

export type FindManyPolicyQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
  searchText: Scalars['String'];
}>;


export type FindManyPolicyQuery = { findManyPolicy: { totalCount: number, policies: Array<{ id: number, policyKind: PolicyKind, title: string, content: string, createdAt: any, updatedAt: any }> } };

export type FindManyUserInquiryByUserQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type FindManyUserInquiryByUserQuery = { findManyUserInquiryByUser: { totalCount: number, userInquiries: Array<{ id: number, title: string, content: string, reply?: string | null, repliedAt?: any | null, createdAt: any }> } };

export type FindMyInfoByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindMyInfoByUserQuery = { findMyInfoByUser: { identity: string, createdAt: any, walletAddressKind?: WalletAddressKind | null, walletAddress?: string | null, level: number, connectionDate?: any | null, countryCode: string, phone: string, positiveFeedbackCount: number, negativeFeedbackCount: number, offerCompleteCount: number, emailAuth?: { id: number, email: string, createdAt: any } | null, idCard?: { id: number, name: string, registrationNumber: string, issueDate: string } | null, driverLicense?: { id: number, name: string, birth: string, area: string, licenseNumber: string, serialNumber: string } | null, passport?: { id: number, name: string, passportNumber: string, issueDate: string, expirationDate: string, birth: string } | null } };

export type FindOneNoticeQueryVariables = Exact<{
  findOneNoticeId: Scalars['Int'];
}>;


export type FindOneNoticeQuery = { findOneNotice: { id: number, title: string, content: string, createdAt: any, hits: number } };

export type FindOneOfferQueryVariables = Exact<{
  findOneOfferId: Scalars['Int'];
}>;


export type FindOneOfferQuery = { findOneOffer: { id: number, coinKind: CoinKind, offerAction: OfferAction, transactionMethod: TransactionMethod, price: number, minAmount: number, maxAmount: number, responseSpeed: number, content?: string | null, createdAt: any, walletAddressKind: WalletAddressKind, walletAddress: string, reservationStatus: ReservationStatus, transactionStatus: TransactionStatus, identity: string, isNewChatMessage?: boolean | null, offerCompleteCount: number, connectionDate?: any | null, city: { id: number, name: string }, district?: { id: number, name: string } | null } };

export type FindOnePolicyQueryVariables = Exact<{
  findOnePolicyId?: InputMaybe<Scalars['Int']>;
  policyKind?: InputMaybe<PolicyKind>;
}>;


export type FindOnePolicyQuery = { findOnePolicy: { id: number, policyKind: PolicyKind, title: string, content: string, createdAt: any, updatedAt: any } };

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


export type FindUserInfoByUserQuery = { findUserInfoByUser: { identity: string, walletAddressKind?: WalletAddressKind | null, walletAddress?: string | null, level: number, connectionDate?: any | null, countryCode: string, positiveFeedbackCount: number, negativeFeedbackCount: number, offerCompleteCount: number } };

export type SendMailAuthNumberQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendMailAuthNumberQuery = { sendMailAuthNumber: boolean };

export type SendPhoneAuthNumberQueryVariables = Exact<{
  countryCode: Scalars['String'];
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
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"coinKind"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CoinKind"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offerAction"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfferAction"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transactionMethod"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionMethod"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cityId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"price"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minAmount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxAmount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"responseSpeed"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isUseNextTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletAddressKind"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WalletAddressKind"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"districtId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOfferByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"coinKind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"coinKind"}}},{"kind":"Argument","name":{"kind":"Name","value":"offerAction"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offerAction"}}},{"kind":"Argument","name":{"kind":"Name","value":"transactionMethod"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transactionMethod"}}},{"kind":"Argument","name":{"kind":"Name","value":"cityId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cityId"}}},{"kind":"Argument","name":{"kind":"Name","value":"price"},"value":{"kind":"Variable","name":{"kind":"Name","value":"price"}}},{"kind":"Argument","name":{"kind":"Name","value":"minAmount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minAmount"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxAmount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxAmount"}}},{"kind":"Argument","name":{"kind":"Name","value":"responseSpeed"},"value":{"kind":"Variable","name":{"kind":"Name","value":"responseSpeed"}}},{"kind":"Argument","name":{"kind":"Name","value":"isUseNextTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isUseNextTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"walletAddressKind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletAddressKind"}}},{"kind":"Argument","name":{"kind":"Name","value":"walletAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"districtId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"districtId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coinKind"}},{"kind":"Field","name":{"kind":"Name","value":"offerAction"}},{"kind":"Field","name":{"kind":"Name","value":"transactionMethod"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"minAmount"}},{"kind":"Field","name":{"kind":"Name","value":"maxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"responseSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddressKind"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"reservationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"transactionStatus"}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const CreatePassportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPassport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passportNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"issueDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expirationDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"birth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPassport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"passportNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passportNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"issueDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"issueDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"expirationDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expirationDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"birth"},"value":{"kind":"Variable","name":{"kind":"Name","value":"birth"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"passportNumber"}},{"kind":"Field","name":{"kind":"Name","value":"issueDate"}},{"kind":"Field","name":{"kind":"Name","value":"expirationDate"}},{"kind":"Field","name":{"kind":"Name","value":"birth"}}]}}]}}]} as unknown as DocumentNode<CreatePassportMutation, CreatePassportMutationVariables>;
export const CreateUserInquiryByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUserInquiryByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserInquiryByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"reply"}},{"kind":"Field","name":{"kind":"Name","value":"repliedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateUserInquiryByUserMutation, CreateUserInquiryByUserMutationVariables>;
export const DeleteOfferByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteOfferByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteOfferByUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOfferByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteOfferByUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coinKind"}},{"kind":"Field","name":{"kind":"Name","value":"offerAction"}},{"kind":"Field","name":{"kind":"Name","value":"transactionMethod"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"minAmount"}},{"kind":"Field","name":{"kind":"Name","value":"maxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"responseSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddressKind"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"reservationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"transactionStatus"}}]}}]}}]} as unknown as DocumentNode<DeleteOfferByUserMutation, DeleteOfferByUserMutationVariables>;
export const DeleteUserInquiryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteUserInquiry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteUserInquiryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUserInquiry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteUserInquiryId"}}}]}]}}]} as unknown as DocumentNode<DeleteUserInquiryMutation, DeleteUserInquiryMutationVariables>;
export const EnterChatRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"enterChatRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enterChatRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<EnterChatRoomMutation, EnterChatRoomMutationVariables>;
export const RefreshByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshByUserMutation, RefreshByUserMutationVariables>;
export const SignOutByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signOutByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signOutByUser"}}]}}]} as unknown as DocumentNode<SignOutByUserMutation, SignOutByUserMutationVariables>;
export const SignUpByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signUpByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"countryCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginKind"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginKind"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUpByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identity"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"hash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}},{"kind":"Argument","name":{"kind":"Name","value":"countryCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"countryCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"loginKind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginKind"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDate"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<SignUpByUserMutation, SignUpByUserMutationVariables>;
export const ToggleFeedbackByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"toggleFeedbackByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"feedbackKind"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FeedbackKind"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverIdentity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleFeedbackByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"feedbackKind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"feedbackKind"}}},{"kind":"Argument","name":{"kind":"Name","value":"receiverIdentity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverIdentity"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"feedbackKind"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ToggleFeedbackByUserMutation, ToggleFeedbackByUserMutationVariables>;
export const UpdateCheckedCurrentChatMessageByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCheckedCurrentChatMessageByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatRoomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatMessageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCheckedCurrentChatMessageByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatRoomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatRoomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"chatMessageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatMessageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCheckedCurrentChatMessageByUserMutation, UpdateCheckedCurrentChatMessageByUserMutationVariables>;
export const UpdatePasswordByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePasswordByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"originPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePasswordByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"originPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"originPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDate"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<UpdatePasswordByUserMutation, UpdatePasswordByUserMutationVariables>;
export const UpdatePhoneNumberByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePhoneNumberByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"countryCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePhoneNumberByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}},{"kind":"Argument","name":{"kind":"Name","value":"countryCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"countryCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDate"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<UpdatePhoneNumberByUserMutation, UpdatePhoneNumberByUserMutationVariables>;
export const UpdateReservationStatusByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateReservationStatusByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateReservationStatusByUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateReservationStatusByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateReservationStatusByUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coinKind"}},{"kind":"Field","name":{"kind":"Name","value":"offerAction"}},{"kind":"Field","name":{"kind":"Name","value":"transactionMethod"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"minAmount"}},{"kind":"Field","name":{"kind":"Name","value":"maxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"responseSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"reservationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"transactionStatus"}}]}}]}}]} as unknown as DocumentNode<UpdateReservationStatusByUserMutation, UpdateReservationStatusByUserMutationVariables>;
export const UpdateTransactionStatusByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTransactionStatusByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateTransactionStatusByUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTransactionStatusByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateTransactionStatusByUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coinKind"}},{"kind":"Field","name":{"kind":"Name","value":"offerAction"}},{"kind":"Field","name":{"kind":"Name","value":"transactionMethod"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"minAmount"}},{"kind":"Field","name":{"kind":"Name","value":"maxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"responseSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"reservationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"transactionStatus"}}]}}]}}]} as unknown as DocumentNode<UpdateTransactionStatusByUserMutation, UpdateTransactionStatusByUserMutationVariables>;
export const UpdateUserInquiryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUserInquiry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInquiryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserInquiry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInquiryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]} as unknown as DocumentNode<UpdateUserInquiryMutation, UpdateUserInquiryMutationVariables>;
export const WithdrawalUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawalUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawalUser"}}]}}]} as unknown as DocumentNode<WithdrawalUserMutation, WithdrawalUserMutationVariables>;
export const CheckDuplicateIdentityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"checkDuplicateIdentity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkDuplicateIdentity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identity"}}}]}]}}]} as unknown as DocumentNode<CheckDuplicateIdentityQuery, CheckDuplicateIdentityQueryVariables>;
export const ConfirmPhoneAuthNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"confirmPhoneAuthNumber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"countryCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identity"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmPhoneAuthNumber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"countryCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"countryCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"authNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"identity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identity"}}}]}]}}]} as unknown as DocumentNode<ConfirmPhoneAuthNumberQuery, ConfirmPhoneAuthNumberQueryVariables>;
export const FindIdentityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findIdentity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"countryCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findIdentity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}},{"kind":"Argument","name":{"kind":"Name","value":"countryCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"countryCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}]}]}}]} as unknown as DocumentNode<FindIdentityQuery, FindIdentityQueryVariables>;
export const FindManyChatMessageByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyChatMessageByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatRoomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"direction"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMessageDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyChatMessageByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"chatRoomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatRoomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"direction"},"value":{"kind":"Variable","name":{"kind":"Name","value":"direction"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"chatMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"isUnread"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isEnd"}}]}}]}}]} as unknown as DocumentNode<FindManyChatMessageByUserQuery, FindManyChatMessageByUserQueryVariables>;
export const FindManyChatRoomByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindManyChatRoomByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyChatRoomByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"offerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"chatRooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"otherIdentity"}},{"kind":"Field","name":{"kind":"Name","value":"offerId"}},{"kind":"Field","name":{"kind":"Name","value":"isNewChatMessage"}},{"kind":"Field","name":{"kind":"Name","value":"isUnread"}}]}}]}}]}}]} as unknown as DocumentNode<FindManyChatRoomByUserQuery, FindManyChatRoomByUserQueryVariables>;
export const FindManyCityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyCity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyCity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"districts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<FindManyCityQuery, FindManyCityQueryVariables>;
export const FindManyCountryCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyCountryCode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyCountryCode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"native"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}}]}}]}}]} as unknown as DocumentNode<FindManyCountryCodeQuery, FindManyCountryCodeQueryVariables>;
export const FindManyMarketPriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyMarketPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyMarketPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usdt"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"krwPrice"}},{"kind":"Field","name":{"kind":"Name","value":"usdPrice"}},{"kind":"Field","name":{"kind":"Name","value":"changeRate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usd"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"krwPrice"}},{"kind":"Field","name":{"kind":"Name","value":"usdPrice"}},{"kind":"Field","name":{"kind":"Name","value":"changeRate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"upbitMarkets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"krwPrice"}},{"kind":"Field","name":{"kind":"Name","value":"usdPrice"}}]}},{"kind":"Field","name":{"kind":"Name","value":"binanceMarkets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"krwPrice"}},{"kind":"Field","name":{"kind":"Name","value":"usdPrice"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kimchiMarkets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"changePrice"}},{"kind":"Field","name":{"kind":"Name","value":"changeRate"}}]}}]}}]}}]} as unknown as DocumentNode<FindManyMarketPriceQuery, FindManyMarketPriceQueryVariables>;
export const FindManyNoticeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyNotice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchKind"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NoticeSearchKind"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyNotice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchKind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchKind"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"notices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}}]}}]}}]}}]} as unknown as DocumentNode<FindManyNoticeQuery, FindManyNoticeQueryVariables>;
export const FindManyOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"coinKind"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CoinKind"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offerAction"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OfferAction"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identity"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isChat"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"coinKind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"coinKind"}}},{"kind":"Argument","name":{"kind":"Name","value":"offerAction"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offerAction"}}},{"kind":"Argument","name":{"kind":"Name","value":"identity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identity"}}},{"kind":"Argument","name":{"kind":"Name","value":"isChat"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isChat"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coinKind"}},{"kind":"Field","name":{"kind":"Name","value":"offerAction"}},{"kind":"Field","name":{"kind":"Name","value":"transactionMethod"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"minAmount"}},{"kind":"Field","name":{"kind":"Name","value":"maxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"responseSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddressKind"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"reservationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"transactionStatus"}},{"kind":"Field","name":{"kind":"Name","value":"city"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"district"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"identity"}},{"kind":"Field","name":{"kind":"Name","value":"positiveFeedbackCount"}},{"kind":"Field","name":{"kind":"Name","value":"offerCompleteCount"}},{"kind":"Field","name":{"kind":"Name","value":"isNewChatMessage"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<FindManyOfferQuery, FindManyOfferQueryVariables>;
export const FindManyPolicyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyPolicy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyPolicy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"policies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"policyKind"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<FindManyPolicyQuery, FindManyPolicyQueryVariables>;
export const FindManyUserInquiryByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyUserInquiryByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyUserInquiryByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"userInquiries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"reply"}},{"kind":"Field","name":{"kind":"Name","value":"repliedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<FindManyUserInquiryByUserQuery, FindManyUserInquiryByUserQueryVariables>;
export const FindMyInfoByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findMyInfoByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findMyInfoByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddressKind"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDate"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"emailAuth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"idCard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"registrationNumber"}},{"kind":"Field","name":{"kind":"Name","value":"issueDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"driverLicense"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"birth"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"licenseNumber"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"passportNumber"}},{"kind":"Field","name":{"kind":"Name","value":"issueDate"}},{"kind":"Field","name":{"kind":"Name","value":"expirationDate"}},{"kind":"Field","name":{"kind":"Name","value":"birth"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positiveFeedbackCount"}},{"kind":"Field","name":{"kind":"Name","value":"negativeFeedbackCount"}},{"kind":"Field","name":{"kind":"Name","value":"offerCompleteCount"}}]}}]}}]} as unknown as DocumentNode<FindMyInfoByUserQuery, FindMyInfoByUserQueryVariables>;
export const FindOneNoticeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findOneNotice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findOneNoticeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneNotice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findOneNoticeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hits"}}]}}]}}]} as unknown as DocumentNode<FindOneNoticeQuery, FindOneNoticeQueryVariables>;
export const FindOneOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findOneOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findOneOfferId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findOneOfferId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"coinKind"}},{"kind":"Field","name":{"kind":"Name","value":"offerAction"}},{"kind":"Field","name":{"kind":"Name","value":"transactionMethod"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"minAmount"}},{"kind":"Field","name":{"kind":"Name","value":"maxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"responseSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddressKind"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"reservationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"transactionStatus"}},{"kind":"Field","name":{"kind":"Name","value":"city"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"district"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"identity"}},{"kind":"Field","name":{"kind":"Name","value":"isNewChatMessage"}},{"kind":"Field","name":{"kind":"Name","value":"offerCompleteCount"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDate"}}]}}]}}]} as unknown as DocumentNode<FindOneOfferQuery, FindOneOfferQueryVariables>;
export const FindOnePolicyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findOnePolicy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findOnePolicyId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"policyKind"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PolicyKind"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOnePolicy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findOnePolicyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"policyKind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"policyKind"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"policyKind"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<FindOnePolicyQuery, FindOnePolicyQueryVariables>;
export const FindOneUserInquiryByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findOneUserInquiryByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findOneUserInquiryByUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneUserInquiryByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findOneUserInquiryByUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"reply"}},{"kind":"Field","name":{"kind":"Name","value":"repliedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<FindOneUserInquiryByUserQuery, FindOneUserInquiryByUserQueryVariables>;
export const FindPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identity"}}},{"kind":"Argument","name":{"kind":"Name","value":"hash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}]}}]} as unknown as DocumentNode<FindPasswordQuery, FindPasswordQueryVariables>;
export const FindUserInfoByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findUserInfoByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUserInfoByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identity"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identity"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddressKind"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDate"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}},{"kind":"Field","name":{"kind":"Name","value":"positiveFeedbackCount"}},{"kind":"Field","name":{"kind":"Name","value":"negativeFeedbackCount"}},{"kind":"Field","name":{"kind":"Name","value":"offerCompleteCount"}}]}}]}}]} as unknown as DocumentNode<FindUserInfoByUserQuery, FindUserInfoByUserQueryVariables>;
export const SendMailAuthNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"sendMailAuthNumber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMailAuthNumber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<SendMailAuthNumberQuery, SendMailAuthNumberQueryVariables>;
export const SendPhoneAuthNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"sendPhoneAuthNumber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"countryCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendPhoneAuthNumber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"countryCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"countryCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}]}]}}]} as unknown as DocumentNode<SendPhoneAuthNumberQuery, SendPhoneAuthNumberQueryVariables>;
export const SignInByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"signInByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signInByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identity"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<SignInByUserQuery, SignInByUserQueryVariables>;
export const VerifyOriginPasswordByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"verifyOriginPasswordByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOriginPasswordByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<VerifyOriginPasswordByUserQuery, VerifyOriginPasswordByUserQueryVariables>;
export const SubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"Subscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatRoomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscribeChatMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatRoomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatRoomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<SubscriptionSubscription, SubscriptionSubscriptionVariables>;