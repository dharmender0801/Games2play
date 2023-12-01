export class UserAccountDetailREQUEStBODyPOST {
  jwtToken: string;
  userId: string;
  portalId: number;
  language:string;
}

export class VideoPlayLinkREQUEStBODyPOST {
  jwtToken: string;
  userId: string;
  ContentId: number;

}
export class MusicPlayLinkREQUEStBODyPOST {
  jwtToken: string;
  userId: string;
  ContentId: number;

}
export class UpdateUserAccountDetailREQUEStBODyPOST {
  userId: string;
  jwtToken: string;
  portalId: number;
  language: string;
  name: string;
}

// Requestbody class for my-preference tab
export class UserMyPreferenceRequestBodyPOST {
  jwtToken: string;
  userId: number;
  portalId: number;
  itemTypeId: number;
  language: string;
}

